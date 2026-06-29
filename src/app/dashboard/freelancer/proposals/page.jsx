import FreelancerProposalsClient from "@/components/FreelancerProposalsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function FreelancerProposalsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const res = email ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/proposals/freelancer/${email}`, { cache: "no-store" }) : null;
  const initialProposals = res?.ok ? await res.json() : [];

  return <FreelancerProposalsClient initialProposals={initialProposals} />;
}