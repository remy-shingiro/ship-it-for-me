"use server";

import "server-only";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { serverEnv } from "@/lib/env";
import { getAdminFirestore, getAdminStorage } from "@/lib/firebase/admin";
import { quoteRequestDraftSchema, type QuoteRequestDraftInput } from "../schemas/quote-request";

const maxAttachmentCount = 5;
const maxAttachmentBytes = 5 * 1024 * 1024;
const referenceAlphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const idempotencyKeyPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const genericSubmissionError = "Something went wrong while submitting your request. Please try again.";
const invalidSubmissionError = "Please check your request details and selected images.";
const uploadSubmissionError = "We couldn't upload one or more images. Your request hasn't been submitted. Please try again.";
const idempotencyConflictError = "Your request details changed after a previous submission attempt. Submit again to send the updated details.";

type SupportedImageType = "image/jpeg" | "image/png" | "image/webp";

type ValidatedAttachment = {
  id: string;
  extension: "jpg" | "jpeg" | "png" | "webp";
  contentType: SupportedImageType;
  contents: Buffer;
};

export type SubmitQuoteRequestResult =
  | { success: true; reference: string }
  | {
      success: false;
      code: "VALIDATION_ERROR" | "UPLOAD_ERROR" | "PERSISTENCE_ERROR" | "IDEMPOTENCY_CONFLICT";
      message: string;
    };

const validationFailure: SubmitQuoteRequestResult = {
  success: false,
  code: "VALIDATION_ERROR",
  message: invalidSubmissionError,
};

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return value.trim().startsWith("+") ? `+${digits}` : digits;
}

function createReference(date: Date) {
  const suffix = Array.from(randomBytes(10), (byte) => referenceAlphabet[byte & 31]).join("");
  return `RQ-${date.getUTCFullYear()}-${suffix}`;
}

function fingerprintRequest(data: ReturnType<typeof requestData>, attachments: readonly ValidatedAttachment[]) {
  const hash = createHash("sha256")
    .update(JSON.stringify(data))
    .update("\0attachments:")
    .update(String(attachments.length));
  for (const attachment of attachments) {
    hash
      .update("\0")
      .update(attachment.contentType)
      .update("\0")
      .update(String(attachment.contents.byteLength))
      .update("\0")
      .update(attachment.contents);
  }
  return hash.digest("hex");
}

function existingSubmissionResult(
  record: FirebaseFirestore.DocumentData | undefined,
  fingerprint: string,
): SubmitQuoteRequestResult | undefined {
  if (!record) return undefined;
  if (record.requestHash !== fingerprint) {
    return { success: false, code: "IDEMPOTENCY_CONFLICT", message: idempotencyConflictError };
  }
  if (typeof record.reference !== "string") {
    return { success: false, code: "PERSISTENCE_ERROR", message: genericSubmissionError };
  }
  return { success: true, reference: record.reference };
}

function diagnosticCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" || typeof code === "number") return String(code).slice(0, 64);
  }

  return error instanceof Error ? error.name.slice(0, 64) : "unknown_error";
}

function logSubmissionFailure(stage: string, error: unknown, requestId?: string) {
  console.error("[quote-request] Submission failed", {
    stage,
    errorCode: diagnosticCode(error),
    ...(requestId ? { requestId } : {}),
  });
}

function fileSignatureMatches(contentType: SupportedImageType, contents: Buffer) {
  if (contentType === "image/jpeg") {
    return contents.length >= 3 && contents[0] === 0xff && contents[1] === 0xd8 && contents[2] === 0xff;
  }

  if (contentType === "image/png") {
    return contents.length >= 8 && contents.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  return contents.length >= 12 && contents.toString("ascii", 0, 4) === "RIFF" && contents.toString("ascii", 8, 12) === "WEBP";
}

function extensionMatches(contentType: string, extension: string): contentType is SupportedImageType {
  if (contentType === "image/jpeg") return extension === "jpg" || extension === "jpeg";
  if (contentType === "image/png") return extension === "png";
  if (contentType === "image/webp") return extension === "webp";
  return false;
}

async function validateAttachments(entries: FormDataEntryValue[]): Promise<ValidatedAttachment[] | null> {
  if (entries.length > maxAttachmentCount) return null;

  const attachments: ValidatedAttachment[] = [];
  for (const entry of entries) {
    if (!(entry instanceof File) || entry.size === 0 || entry.size > maxAttachmentBytes) return null;

    const extension = entry.name.split(".").pop()?.toLowerCase() ?? "";
    const contentType = entry.type.toLowerCase();
    if (!extensionMatches(contentType, extension)) return null;

    const contents = Buffer.from(await entry.arrayBuffer());
    if (contents.byteLength !== entry.size || !fileSignatureMatches(contentType, contents)) return null;

    attachments.push({
      id: randomUUID(),
      extension: extension as ValidatedAttachment["extension"],
      contentType,
      contents,
    });
  }

  return attachments;
}

async function deleteUploadedFiles(
  bucket: ReturnType<ReturnType<typeof getAdminStorage>["bucket"]> | undefined,
  paths: readonly string[],
  requestId: string,
) {
  if (!bucket || paths.length === 0) return;

  for (const path of paths) {
    try {
      await bucket.file(path).delete({ ignoreNotFound: true });
    } catch (error) {
      logSubmissionFailure("storage_cleanup", error, requestId);
    }
  }
}

function optionalValue(value: string | undefined) {
  const normalized = value?.trim();
  return normalized || undefined;
}

function requestData(draft: QuoteRequestDraftInput) {
  const productUrl = optionalValue(draft.product.url);
  const productDescription = optionalValue(draft.product.description);
  const additionalRequirements = optionalValue(draft.requirements.additionalRequirements);
  const email = optionalValue(draft.contact.email)?.toLowerCase();

  return {
    product: {
      name: draft.product.name.trim(),
      ...(productUrl ? { url: productUrl } : {}),
      quantity: draft.product.quantity,
      ...(productDescription ? { description: productDescription } : {}),
    },
    requirements: {
      ...(draft.requirements.sourceCountry ? { sourceCountry: draft.requirements.sourceCountry } : {}),
      ...(draft.requirements.budget !== undefined ? { budget: draft.requirements.budget } : {}),
      ...(draft.requirements.timeline ? { timeline: draft.requirements.timeline } : {}),
      ...(additionalRequirements ? { additionalRequirements } : {}),
    },
    contact: { preferredContactMethod: draft.contact.preferredContactMethod },
    customer: {
      name: draft.contact.name.trim(),
      phone: normalizePhone(draft.contact.phone),
      ...(email ? { email } : {}),
      preferredContactMethod: draft.contact.preferredContactMethod,
    },
  };
}

export async function submitQuoteRequest(formData: FormData): Promise<SubmitQuoteRequestResult> {
  if (!(formData instanceof FormData)) return validationFailure;

  const idempotencyKey = formData.get("idempotencyKey");
  if (typeof idempotencyKey !== "string" || !idempotencyKeyPattern.test(idempotencyKey)) return validationFailure;

  const draftValue = formData.get("draft");
  if (typeof draftValue !== "string") return validationFailure;

  let draftInput: unknown;
  try {
    draftInput = JSON.parse(draftValue) as unknown;
  } catch {
    return validationFailure;
  }

  const parsedDraft = quoteRequestDraftSchema.safeParse(draftInput);
  if (!parsedDraft.success) return validationFailure;

  let attachments: ValidatedAttachment[] | null;
  try {
    attachments = await validateAttachments(formData.getAll("images"));
  } catch (error) {
    logSubmissionFailure("attachment_validation", error);
    return validationFailure;
  }
  if (attachments === null) return validationFailure;

  const data = requestData(parsedDraft.data);
  if (data.customer.phone.replace(/\D/g, "").length < 5) return validationFailure;
  const requestHash = fingerprintRequest(data, attachments);

  let firestore: ReturnType<typeof getAdminFirestore>;
  try {
    firestore = getAdminFirestore();
  } catch (error) {
    logSubmissionFailure("firebase_initialization", error);
    return { success: false, code: "PERSISTENCE_ERROR", message: genericSubmissionError };
  }

  const idempotencyKeyHash = createHash("sha256").update(idempotencyKey.toLowerCase()).digest("hex");
  const idempotencyRef = firestore.collection("quoteRequestIdempotencyKeys").doc(idempotencyKeyHash);

  try {
    const existingSnapshot = await idempotencyRef.get();
    if (existingSnapshot.exists) {
      return existingSubmissionResult(existingSnapshot.data(), requestHash) ?? {
        success: false,
        code: "PERSISTENCE_ERROR",
        message: genericSubmissionError,
      };
    }
  } catch (error) {
    logSubmissionFailure("idempotency_lookup", error);
    return { success: false, code: "PERSISTENCE_ERROR", message: genericSubmissionError };
  }

  const requestRef = firestore.collection("quoteRequests").doc();
  const requestId = requestRef.id;
  const referenceDate = new Date();
  const reference = createReference(referenceDate);
  const createdAt = Timestamp.fromDate(referenceDate);
  const customerId = createHash("sha256").update(data.customer.phone.replace(/\D/g, "")).digest("hex");
  const customerRef = firestore.collection("customers").doc(customerId);
  const eventRef = requestRef.collection("events").doc();
  const uploadedPaths: string[] = [];
  let storageBucket: ReturnType<ReturnType<typeof getAdminStorage>["bucket"]> | undefined;

  try {
    if (attachments.length > 0) {
      if (!serverEnv.firebaseStorageBucket) throw new Error("Firebase Storage bucket is not configured.");
      storageBucket = getAdminStorage().bucket(serverEnv.firebaseStorageBucket);

      for (const attachment of attachments) {
        const storagePath = `quote-requests/${requestId}/${attachment.id}.${attachment.extension}`;
        uploadedPaths.push(storagePath);
        await storageBucket.file(storagePath).save(attachment.contents, {
          resumable: false,
          metadata: {
            contentType: attachment.contentType,
            cacheControl: "private, no-store",
          },
        });
      }
    }
  } catch (error) {
    await deleteUploadedFiles(storageBucket, uploadedPaths, requestId);
    logSubmissionFailure("storage_upload", error, requestId);
    return { success: false, code: "UPLOAD_ERROR", message: uploadSubmissionError };
  }

  try {
    const transactionResult = await firestore.runTransaction(async (transaction) => {
      const existingKey = await transaction.get(idempotencyRef);
      if (existingKey.exists) {
        const existingRequestId = existingKey.get("requestId");
        return {
          result: existingSubmissionResult(existingKey.data(), requestHash) ?? {
            success: false as const,
            code: "PERSISTENCE_ERROR" as const,
            message: genericSubmissionError,
          },
          requestId: typeof existingRequestId === "string" ? existingRequestId : undefined,
        };
      }

      const customerSnapshot = await transaction.get(customerRef);
      const customerData = {
        name: data.customer.name,
        phone: data.customer.phone,
        ...(data.customer.email ? { email: data.customer.email } : {}),
        preferredContactMethod: data.customer.preferredContactMethod,
        updatedAt: createdAt,
      };

      if (customerSnapshot.exists) {
        transaction.set(customerRef, customerData, { merge: true });
      } else {
        transaction.create(customerRef, { ...customerData, createdAt });
      }

      transaction.create(requestRef, {
        reference,
        customerId,
        status: "PENDING",
        product: data.product,
        requirements: data.requirements,
        contact: data.contact,
        createdAt,
        updatedAt: createdAt,
      });

      transaction.create(idempotencyRef, {
        requestHash,
        requestId,
        reference,
        createdAt,
      });

      transaction.create(eventRef, { type: "REQUEST_CREATED", createdAt });

      for (const attachment of attachments) {
        const storagePath = `quote-requests/${requestId}/${attachment.id}.${attachment.extension}`;
        const attachmentRef = requestRef.collection("attachments").doc(attachment.id);
        transaction.create(attachmentRef, {
          storagePath,
          contentType: attachment.contentType,
          size: attachment.contents.byteLength,
          createdAt,
        });
      }

      return { result: { success: true as const, reference }, requestId };
    });

    if (!transactionResult.result.success) {
      await deleteUploadedFiles(storageBucket, uploadedPaths, requestId);
      return transactionResult.result;
    }

    if (transactionResult.requestId !== requestId) {
      await deleteUploadedFiles(storageBucket, uploadedPaths, requestId);
    }
    return transactionResult.result;
  } catch (error) {
    // A transaction can commit even if its response is lost. Check before deleting
    // uploads so a committed request never points at files removed by a retry path.
    try {
      const committedSnapshot = await idempotencyRef.get();
      const committedResult = existingSubmissionResult(committedSnapshot.data(), requestHash);
      if (committedResult) {
        if (committedSnapshot.get("requestId") !== requestId) {
          await deleteUploadedFiles(storageBucket, uploadedPaths, requestId);
        }
        return committedResult;
      }
    } catch (recoveryError) {
      logSubmissionFailure("transaction_recovery_lookup", recoveryError, requestId);
      return { success: false, code: "PERSISTENCE_ERROR", message: genericSubmissionError };
    }

    await deleteUploadedFiles(storageBucket, uploadedPaths, requestId);
    logSubmissionFailure("firestore_transaction", error, requestId);
    return { success: false, code: "PERSISTENCE_ERROR", message: genericSubmissionError };
  }

}
