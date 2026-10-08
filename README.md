# PrimeLink

Next.js App Router website for PrimeLink Sourcing Ltd.

## Development

Use Node.js 20.9 or newer, then install dependencies and start the local server:

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when configuring the project. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin before deployment. The PrimeLink brand, legal company name and WhatsApp contact are centralized in `src/lib/site.ts`. Firebase Admin is initialized lazily by trusted server code; configure `FIREBASE_PROJECT_ID` and either a service-account email/private key pair or Application Default Credentials before submitting quote requests. Set `FIREBASE_STORAGE_BUCKET` to the Firebase Storage bucket name to accept product images. Never prefix Firebase Admin credentials with `NEXT_PUBLIC_`.

## Architecture

- App Router pages and server components live under `src/app/`.
- Quote request types and the shared Zod draft schema are under `src/features/quote-request/`. The quote Server Action validates the draft and images, stores customer/request/event records in Firestore, and uploads images to Firebase Storage.
- Firebase Admin access is server-only and exposed from `src/lib/firebase/admin.ts`.
- Client components must not import server environment or Firebase Admin modules.
- Firebase client reads and writes are denied by `firestore.rules` and `storage.rules`; deploy those rules with `firebase deploy --only firestore:rules,storage` when setting up a Firebase project. Admin SDK writes use server credentials and bypass client security rules.
- Server Action uploads allow up to 26 MB to carry the existing maximum of five 5 MB images plus form data. Each file is checked again on the server for size, count, MIME type, extension, and image signature.
- A per-submit random idempotency key is hashed server-side into a separate Firestore idempotency record. Quote document IDs and Storage paths remain server-generated. Retries of the same wizard submission return the first committed reference instead of creating another request.
- The upload and Firestore commit are separate services. Definite failures trigger best-effort Storage cleanup; if the Firestore commit outcome is ambiguous, the action checks the idempotency record before deleting files. If that recovery lookup also fails, uploaded files are left in place to avoid deleting attachments that may belong to a committed request. Abrupt process termination can still leave unreferenced Storage objects.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

The health endpoint is available at `/api/health`.
