# Kigali-Dubai

Next.js App Router foundation for the Kigali-Dubai sourcing website.

## Development

Use Node.js 20.9 or newer, then install dependencies and start the local server:

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when configuring the project. The site URL defaults to `http://localhost:3000`. Firebase Admin is initialized lazily by trusted server code; configure `FIREBASE_PROJECT_ID` and either a service-account email/private key pair or Application Default Credentials before submitting quote requests. Set `FIREBASE_STORAGE_BUCKET` to the Firebase Storage bucket name to accept product images. Never prefix Firebase Admin credentials with `NEXT_PUBLIC_`.

## Architecture

- App Router pages and server components live under `src/app/`.
- Quote request types and the shared Zod draft schema are under `src/features/quote-request/`. The quote Server Action validates the draft and images, stores customer/request/event records in Firestore, and uploads images to Firebase Storage.
- Firebase Admin access is server-only and exposed from `src/lib/firebase/admin.ts`.
- Client components must not import server environment or Firebase Admin modules.
- Firebase client reads and writes are denied by `firestore.rules` and `storage.rules`; deploy those rules with `firebase deploy --only firestore:rules,storage` when setting up a Firebase project. Admin SDK writes use server credentials and bypass client security rules.
- Server Action uploads allow up to 26 MB to carry the existing maximum of five 5 MB images plus form data. Each file is checked again on the server for size, count, MIME type, extension, and image signature.
- The upload and Firestore commit are separate services. On failures, uploaded objects are deleted before the action reports an error; as with any cross-service flow, an abrupt process termination during that interval can leave an unreferenced Storage object.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

The health endpoint is available at `/api/health`.
