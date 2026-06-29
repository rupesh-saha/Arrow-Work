import FreelancerProjectsClient from "@/components/FreelancerProjectsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function FreelancerProjectsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const res = email ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/projects/freelancer/${email}`, { cache: "no-store" }) : null;
  const initialProjects = res?.ok ? await res.json() : [];

  return <FreelancerProjectsClient initialProjects={initialProjects} />;
}