import FreelancerDashboardClient from "@/components/FreelancerDashboardClient";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export default async function FreelancerDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const email = session?.user?.email;
  const userName = session?.user?.name || 'Freelancer';

  const res = email ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/dashboard/freelancer/${email}`, { cache: "no-store" }) : null;
  
  const stats = res?.ok ? await res.json() : { totalProposals: 0, pendingProposals: 0, acceptedProposals: 0, totalEarnings: 0 };

  return <FreelancerDashboardClient stats={stats} userName={userName} />;
}