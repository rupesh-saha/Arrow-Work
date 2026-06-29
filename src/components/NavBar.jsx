'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'; // Added useState
import { Icon } from "@iconify/react";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const handleDashboardRedirect = () => {
    const role = session?.user?.role;
    if (role === 'admin') router.push('/dashboard/admin');
    else if (role === 'client') router.push('/dashboard/client');
    else router.push('/dashboard/freelancer');
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

      <div className="max-w-[1400px] mx-auto min-h-[80px] px-4 md:px-8 flex items-center justify-between">

        {/* --- Logo --- */}
        <div className="flex-shrink-0">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image src="/arrow.png" width={140} height={45} alt="Arrow Logo" className="h-9 w-auto object-contain" priority />
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end">
          <ul className="flex items-center gap-6 text-[16px] mr-6">
            <li>
              <Link href="/browse-tasks" className={isActive('/browse-tasks') ? 'font-extrabold text-black' : 'font-semibold text-gray-600 hover:text-black transition-colors'}>
                Browse Tasks
              </Link>
            </li>
            <li>
              <Link href="/browse-freelancers" className={isActive('/browse-freelancers') ? 'font-extrabold text-black' : 'font-semibold text-gray-600 hover:text-black transition-colors'}>
                Browse Freelancers
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
            {session ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDashboardRedirect}
                  className="bg-gray-900 hover:bg-black text-white font-bold h-10 px-6 rounded-[4px] transition-all shadow-md"
                >
                  Dashboard
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
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

        <button 
          className="lg:hidden p-2 text-gray-800 hover:text-black transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"} className="text-3xl" />
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          <Link 
            href="/browse-tasks" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-2 rounded-lg ${isActive('/browse-tasks') ? 'font-extrabold bg-gray-50' : 'font-semibold'}`}
          >
            Browse Tasks
          </Link>
          <Link 
            href="/browse-freelancers" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-2 rounded-lg ${isActive('/browse-freelancers') ? 'font-extrabold bg-gray-50' : 'font-semibold'}`}
          >
            Browse Freelancers
          </Link>
          
          <div className="h-px w-full bg-gray-100 my-2"></div>
          
          {session ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                  <Image src={session.user.image || "/avatar.png"} alt="DP" width={40} height={40} className="object-cover" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-sm truncate">{session.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                </div>
                <button onClick={() => signOut()} className="text-gray-500 hover:text-red-600 p-2">
                  <Icon icon="lucide:log-out" className="text-xl" />
                </button>
              </div>
              <button
                onClick={handleDashboardRedirect}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold h-12 rounded-[4px] shadow-md"
              >
                Dashboard
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full h-12 border border-gray-300 rounded-xl font-bold text-gray-700"
              >
                Sign in
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full h-12 bg-gray-900 text-white rounded-xl font-bold"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;