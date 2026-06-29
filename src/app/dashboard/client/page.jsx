import ClientDashboardClient from "@/components/ClientDashboardClient";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export default async function ClientDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const email = session?.user?.email;
  const userName = session?.user?.name || 'Client';

  const res = email ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/dashboard/client/${email}`, { cache: "no-store" }) : null;
  
  const stats = res?.ok ? await res.json() : { totalTasks: 0, openTasks: 0, inProgressTasks: 0, totalSpent: 0 };

  return <ClientDashboardClient stats={stats} userName={userName}/>;
}