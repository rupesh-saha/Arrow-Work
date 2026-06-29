import ProfileFreelancer from "@/components/ProfileFreelancer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EditProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const res = email ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/users/email/${email}`, { cache: "no-store" }) : null;
  const userProfile = res?.ok ? await res.json() : null;

  return <ProfileFreelancer userProfile={userProfile} email={email} />;
}