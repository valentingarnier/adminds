import { SignIn } from "@clerk/nextjs";

// Clerk's <SignIn /> renders the full login form:
// email/password, OAuth buttons (Google, etc.), verification steps.
// All configured from your Clerk dashboard — no custom form code needed.
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <SignIn />
    </div>
  );
}
