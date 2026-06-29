'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Icon } from "@iconify/react";
// Import your auth client/hook here
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const isActive = (path) => pathname === path;

  const handleDashboardRedirect = () => {
    const role = session?.user?.role;
    if (role === 'admin') router.push('/dashboard/admin');
    else if (role === 'client') router.push('/dashboard/client');
    else router.push('/dashboard/freelancer');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="navbar max-w-[1400px] mx-auto min-h-[80px] px-4 md:px-8">

        <div className="navbar-start w-full lg:w-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image src="/arrow.png" width={140} height={45} alt="Arrow Logo" className="h-9 w-auto object-contain" priority />
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex flex-1 items-center">
          <ul className="menu menu-horizontal px-1 items-center gap-1 text-[16px]">
            <li><Link href="/browse-tasks" className={isActive('/browse-tasks') ? 'font-extrabold' : 'font-semibold'}>Browse Tasks</Link></li>
            <li><Link href="/browse-freelancers" className={isActive('/browse-freelancers') ? 'font-extrabold' : 'font-semibold'}>Browse Freelancers</Link></li>
          </ul>

          <div className="flex items-center gap-4 ml-4 pl-6 border-l border-gray-200">
            {session ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDashboardRedirect}
                  className="bg-gray-900 hover:bg-black text-white font-bold h-10 px-6 rounded-[4px] transition-all shadow-md"
                >
                  Dashboard
                </button>

                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                  <Image src={session.user.image || "/avatar.png"} alt="DP" width={40} height={40} className="object-cover" />
                </div>

                <button onClick={() => signOut()} className="text-gray-500 hover:text-red-600 transition-colors">
                  <Icon icon="lucide:log-out" className="text-xl" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-[#62646a] font-bold hover:text-black transition-colors">
                  Sign in
                </Link>
                <Link href="/register" className="flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold h-10 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;