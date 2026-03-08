import { SignUp } from "@clerk/nextjs";

// Same as sign-in — Clerk handles the full registration flow.
// Fields (name, email, password) are configured in Clerk dashboard.
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <SignUp />
    </div>
  );
}
