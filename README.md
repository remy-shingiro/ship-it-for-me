# Kigali-Dubai

Next.js App Router foundation for the Kigali-Dubai sourcing website.

## Development

Use Node.js 20.9 or newer, then install dependencies and start the local server:

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when configuring the project. The site URL defaults to `http://localhost:3000`. Firebase Admin is initialized lazily by trusted server code; configure a Firebase project ID and either a service-account email/private key pair or Application Default Credentials before requesting Firestore or Storage access. Never prefix Firebase Admin credentials with `NEXT_PUBLIC_`.

## Architecture

- App Router pages and server components live under `src/app/`.
- Quote request types and Zod schemas are under `src/features/quote-request/`. Quote submission and persistence are not implemented.
- Firebase Admin access is server-only and exposed from `src/lib/firebase/admin.ts`.
- Client components must not import server environment or Firebase Admin modules.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

The health endpoint is available at `/api/health`.
