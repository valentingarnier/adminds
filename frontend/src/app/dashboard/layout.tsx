"use client";

import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 p-2">
      <div className="flex flex-1 flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5">
        {/* Page content — grows to push footer down */}
        <div className="flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-5xl">{children}</div>
        </div>

        {/* Account — always at the bottom */}
        <div className="border-t border-zinc-950/5 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{ elements: { avatarBox: "size-8" } }}
            />
            <span className="text-sm text-zinc-500">Mon compte</span>
          </div>
        </div>
      </div>
    </div>
  );
}
