import FreelancerProfileClient from "@/components/FreelancerProfileClient";

const FreelancerProfilePage = async ({params}) => {
  const { id } = await params;

  const response = await fetch(`http://localhost:5001/api/users/${id}`, {
    cache: "no-store",
  });

  const freelancer = response.ok ? await response.json() : null;
  return (
    <div>
      
      <FreelancerProfileClient freelancer={freelancer}/>
    </div>
  );
};

export default FreelancerProfilePage;