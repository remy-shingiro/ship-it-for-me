import "server-only";
import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

const serverEnvSchema = z.object({
  FIREBASE_PROJECT_ID: optionalString,
  FIREBASE_CLIENT_EMAIL: optionalString,
  FIREBASE_PRIVATE_KEY: optionalString,
  FIREBASE_STORAGE_BUCKET: optionalString,
  INTERNAL_NOTIFICATION_EMAIL: z.string().email().optional(),
  NOTIFICATION_SENDER_EMAIL: z.string().email().optional(),
  WHATSAPP_BUSINESS_NUMBER: optionalString,
});

const parsedPublicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

const parsedServerEnv = serverEnvSchema.parse({
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  INTERNAL_NOTIFICATION_EMAIL: process.env.INTERNAL_NOTIFICATION_EMAIL || undefined,
  NOTIFICATION_SENDER_EMAIL: process.env.NOTIFICATION_SENDER_EMAIL || undefined,
  WHATSAPP_BUSINESS_NUMBER: process.env.WHATSAPP_BUSINESS_NUMBER,
});

export const publicEnv = {
  siteUrl: parsedPublicEnv.NEXT_PUBLIC_SITE_URL,
};

export const serverEnv = {
  firebaseProjectId: parsedServerEnv.FIREBASE_PROJECT_ID,
  firebaseClientEmail: parsedServerEnv.FIREBASE_CLIENT_EMAIL,
  firebasePrivateKey: parsedServerEnv.FIREBASE_PRIVATE_KEY,
  firebaseStorageBucket: parsedServerEnv.FIREBASE_STORAGE_BUCKET,
  internalNotificationEmail: parsedServerEnv.INTERNAL_NOTIFICATION_EMAIL,
  notificationSenderEmail: parsedServerEnv.NOTIFICATION_SENDER_EMAIL,
  whatsappBusinessNumber: parsedServerEnv.WHATSAPP_BUSINESS_NUMBER,
};