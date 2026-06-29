import AdminTasksClient from "@/components/AdminTasksClient";

export default async function AdminTasksPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/admin/tasks`, { cache: "no-store" });
  const tasks = res.ok ? await res.json() : [];
  return <AdminTasksClient initialTasks={tasks} />;
}