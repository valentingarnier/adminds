"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { SidebarLayout } from "@/components/sidebar-layout";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarHeading,
  SidebarSpacer,
} from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Logo } from "@/components/logo";
import {
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/20/solid";

const navItems = [
  { label: "Patients", href: "/dashboard/patients", icon: UsersIcon },
  { label: "Modèles", href: "/dashboard/modeles", icon: DocumentTextIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const sidebarContent = (
    <Sidebar>
      <SidebarHeader>
        <Logo size="md" href="/dashboard" />
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              current={pathname.startsWith(item.href)}
            >
              <item.icon />
              <SidebarLabel>{item.label}</SidebarLabel>
            </SidebarItem>
          ))}
        </SidebarSection>

        <SidebarSpacer />

        <SidebarSection>
          <SidebarItem href="/dashboard/settings" current={pathname.startsWith("/dashboard/settings")}>
            <Cog6ToothIcon />
            <SidebarLabel>Paramètres</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-2">
          <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
          <span className="text-sm text-zinc-600 truncate">Mon compte</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <SidebarLayout navbar={<Navbar />} sidebar={sidebarContent}>
      {children}
    </SidebarLayout>
  );
}
