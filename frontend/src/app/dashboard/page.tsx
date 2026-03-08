import { redirect } from "next/navigation";

// Dashboard home redirects to the patients list — the primary view
export default function DashboardPage() {
  redirect("/dashboard/patients");
}
