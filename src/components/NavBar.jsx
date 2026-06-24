'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();

  // Helper function to check if the path is active
  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="navbar max-w-[1400px] mx-auto min-h-[80px] px-4 md:px-8">
        
        {/* --- Mobile View: Hamburger & Logo --- */}
        <div className="navbar-start w-full lg:w-auto justify-between lg:justify-start">
          
          <div className="flex items-center">
            {/* Mobile Dropdown */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0 pr-4" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-4 w-52 p-4 shadow-2xl border border-gray-100 text-[15px] gap-2">
                <li>
                  <Link href="/" className={`${isActive('/') ? 'text-black font-extrabold bg-gray-50' : 'text-gray-600 font-semibold'}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/browse-tasks" className={`${isActive('/browse-tasks') ? 'text-black font-extrabold bg-gray-50' : 'text-gray-600 font-semibold'}`}>
                    Browse Tasks
                  </Link>
                </li>
                <li>
                  <Link href="/browse-freelancers" className={`${isActive('/browse-freelancers') ? 'text-black font-extrabold bg-gray-50' : 'text-gray-600 font-semibold'}`}>
                    Browse Freelancers
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <Link href="/login" className="text-gray-600 font-semibold">
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
              <Image 
                src="/arrow.png" 
                width={140} 
                height={45} 
                alt="Arrow Logo" 
                className="h-9 md:h-10 w-auto object-contain" 
                priority 
              />
            </Link>
          </div>

          {/* Mobile Join Button - Now Solid */}
          <div className="lg:hidden ml-auto">
            <Link href="/register" className="flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold h-9 px-5 rounded-[4px] text-sm transition-all duration-200 shadow-md">
              Join
            </Link>
          </div>
        </div>

        {/* --- Desktop View: Links & Buttons --- */}
        <div className="navbar-end hidden lg:flex flex-1 items-center">
          
          {/* Main Navigation Links */}
          <ul className="menu menu-horizontal px-1 items-center gap-1 text-[16px]">
            <li>
              <Link 
                href="/browse-tasks" 
                className={`px-4 py-2 transition-colors ${
                  isActive('/browse-tasks') 
                  ? 'text-black font-extrabold hover:bg-transparent focus:bg-transparent' 
                  : 'text-[#62646a] font-semibold hover:text-black hover:bg-transparent focus:bg-transparent'
                }`}
              >
                Browse Tasks
              </Link>
            </li>
            <li>
              <Link 
                href="/browse-freelancers" 
                className={`px-4 py-2 transition-colors ${
                  isActive('/browse-freelancers') 
                  ? 'text-black font-extrabold hover:bg-transparent focus:bg-transparent' 
                  : 'text-[#62646a] font-semibold hover:text-black hover:bg-transparent focus:bg-transparent'
                }`}
              >
                Browse Freelancers
              </Link>
            </li>
          </ul>

          {/* Authentication Actions - Visually Separated */}
          <div className="flex items-center gap-5 ml-4 pl-6 border-l border-gray-200">
            <Link 
              href="/login" 
              className={`transition-colors ${
                isActive('/login') 
                ? 'text-black font-extrabold' 
                : 'text-[#62646a] font-bold hover:text-black'
              }`}
            >
              Sign in
            </Link>
            
            {/* Desktop Join Button - Now Solid */}
            <Link 
              href="/register" 
              className="flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold h-10 px-7 rounded-[4px] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Join
            </Link>
          </div>

        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;