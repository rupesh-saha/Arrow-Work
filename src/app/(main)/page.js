import Hero from "@/components/HeroCarousel";
import HowItWorks from "@/components/HowItWorks";
import LatestTasks from "@/components/LatestTasks";
import Testimonials from "@/components/Testimonials";
import TopFreelancers from "@/components/TopFreelancers";
import Image from "next/image";

export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/home-stats`, {
    cache: "no-store"
  });

  const data = res.ok ? await res.json() : { latestTasks: [], topFreelancers: [] };

  return (
    <>
      <Hero />
      <LatestTasks tasks={data.latestTasks} />
      <TopFreelancers freelancers={data.topFreelancers} />
      <HowItWorks />
      <Testimonials />

    </>
  );
}
