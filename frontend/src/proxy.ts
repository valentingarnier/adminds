import { clerkMiddleware } from "@clerk/nextjs/server";

// clerkMiddleware() handles all auth automatically:
// - Attaches auth state to every request
// - No manual route matching needed — use Clerk's dashboard to configure
//   which routes require auth, or use auth.protect() in individual pages
export default clerkMiddleware();

export const config = {
  matcher: [
    // Run on all routes except static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
