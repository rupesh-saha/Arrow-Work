import AdminDashboardClient from "@/components/AdminDashboardClient";
import { auth } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const token = await auth.api.getToken({
    headers: await headers()
  })

  console.log(token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/admin/stats`, { cache: "no-store" });
  const data = res.ok ? await res.json() : null;

  return <AdminDashboardClient data={data} />;
}