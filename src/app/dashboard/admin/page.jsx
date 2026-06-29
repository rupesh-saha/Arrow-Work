import AdminDashboardClient from "@/components/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/admin/stats`, { cache: "no-store" });
  const data = res.ok ? await res.json() : null;

  return <AdminDashboardClient data={data} />;
}