import FreelancersClient from "@/components/FreelancersClient";

export default async function BrowseFreelancersPage() {
  // 1. Fetch data securely
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/users/freelancers`, {
    cache: "no-store",
  });

  const initialFreelancers = response.ok ? await response.json() : [];

  return <FreelancersClient initialFreelancers={initialFreelancers}/>;
}