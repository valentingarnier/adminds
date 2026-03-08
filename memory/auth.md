# Authentication — Clerk

## Decision
Clerk for auth (speed + DX for MVP). Doctor email/name stored on Clerk's US infrastructure. Patient data stays 100% in Azure Switzerland. If compliance audit requires fully Swiss auth later, migrate to Azure AD B2C.

## Frontend Setup

### Packages
- `@clerk/nextjs` — React components + middleware
- `@clerk/localizations` — French (frFR) localization

### Root Layout (`app/layout.tsx`)
```tsx
<ClerkProvider localization={frFR}>
  {children}
</ClerkProvider>
```
`ClerkProvider` wraps the app inside `<body>`. Provides auth context to all pages. `frFR` makes all Clerk UI text French.

### Route Protection (`src/proxy.ts`)
```ts
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();
```
- Uses `proxy.ts` (NOT `middleware.ts` — Next.js 16 renamed it)
- `clerkMiddleware()` attaches auth state to every request
- No manual route matching — use `auth.protect()` in individual pages or configure in Clerk dashboard

### Auth Pages
- `sign-in/[[...sign-in]]/page.tsx` — `<SignIn />` component
- `sign-up/[[...sign-up]]/page.tsx` — `<SignUp />` component
- `[[...]]` catch-all route handles multi-step flows (verification, MFA)

### Clerk Components (use these, NOT deprecated ones)
- `<Show when="signed-in">` / `<Show when="signed-out">` — conditional rendering
- `<UserButton />` — user avatar/dropdown with sign-out
- `<SignInButton />` / `<SignUpButton />` — trigger auth flows
- **DEPRECATED** (never use): `<SignedIn>`, `<SignedOut>`, `authMiddleware()`

### Server-side Auth
```ts
import { auth } from "@clerk/nextjs/server";
const { userId } = await auth();
```

## Backend Validation (TODO)
- Clerk issues standard JWTs
- Backend validates Clerk JWT in `auth.py` using Clerk's JWKS endpoint
- Extract `user_id` from token for `Depends(get_current_user)`

## Env Vars
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
