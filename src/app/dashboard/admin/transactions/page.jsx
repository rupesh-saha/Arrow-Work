import AdminPaymentsClient from "@/components/AdminPaymentsClient";

export default async function AdminPaymentsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/admin/payments`, { cache: "no-store" });
  const data = res.ok ? await res.json() : { payments: [], totalRevenue: 0, avgTransaction: 0 };
  
  return <AdminPaymentsClient data={data} />;
}