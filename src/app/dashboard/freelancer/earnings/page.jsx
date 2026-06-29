import EarningsClient from "@/components/EarningsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EarningsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const res = email ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/earnings/freelancer/${email}`, { cache: "no-store" }) : null;
  const earningsData = res?.ok ? await res.json() : { payments: [], totalEarned: 0, averagePerTask: 0 };

  return <EarningsClient earningsData={earningsData} />;
}