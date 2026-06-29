import AdminUsersClient from "@/components/AdminUsersClient";

export default async function AdminUsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/admin/users`, { cache: "no-store" });
  const users = res.ok ? await res.json() : [];
  return <AdminUsersClient initialUsers={users} />;
}