import FreelancersClient from "@/components/FreelancersClient";

export default async function BrowseFreelancersPage() {
  // 1. Fetch data securely
  const response = await fetch(`http://localhost:5001/api/users/freelancers`, {
    cache: "no-store",
  });

  const initialFreelancers = response.ok ? await response.json() : [];

  // 3. Pass to client
  return <FreelancersClient initialFreelancers={initialFreelancers}/>;
}