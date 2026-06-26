import ClientProposalsClient from "@/components/ClientProposalsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ClientProposalsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const res = email ? await fetch(`http://localhost:5001/api/proposals/client/${email}`, { cache: "no-store" }) : null;
  const initialProposals = res?.ok ? await res.json() : [];

  return <ClientProposalsClient initialProposals={initialProposals}/>;
}