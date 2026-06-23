import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      
      <div className="navbar max-w-[1400px] mx-auto min-h-[80px] px-4 md:px-8">
        
        <div className="navbar-start w-full lg:w-auto justify-between lg:justify-start">
          
          <div className="flex items-center">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0 pr-4" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-4 w-52 p-4 shadow-2xl border border-gray-100 font-semibold text-gray-600 gap-2">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/browse-tasks">Browse Tasks</Link></li>
                <li><Link href="/browse-freelancers">Browse Freelancers</Link></li>
                <div className="divider my-0"></div>
                <li><Link href="/login">Sign in</Link></li>
                <li><Link href="/register" className="text-black font-bold">Join</Link></li>
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

          <div className="lg:hidden ml-auto">
            <Link href="/register" className="flex items-center justify-center bg-transparent hover:bg-gray-50 border border-gray-900 hover:border-black text-black font-bold h-9 px-5 rounded-[4px] text-sm transition-all duration-200">
              Join
            </Link>
          </div>
        </div>

        <div className="navbar-end hidden lg:flex flex-1">
          <ul className="menu menu-horizontal px-1 items-center gap-2 font-semibold text-[16px] text-[#62646a]">
            <li>
              <Link href="/browse-tasks" className="hover:bg-transparent hover:text-black focus:bg-transparent transition-colors px-3">
                Browse Tasks
              </Link>
            </li>
            <li>
              <Link href="/browse-freelancers" className="hover:bg-transparent hover:text-black focus:bg-transparent transition-colors px-3">
                Browse Freelancers
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:bg-transparent hover:text-black focus:bg-transparent transition-colors px-3">
                Sign in
              </Link>
            </li>
          </ul>

          <Link href="/register" className="flex items-center justify-center bg-transparent hover:bg-gray-50 border border-gray-900 hover:border-black text-black font-bold h-10 px-6 rounded-[4px] ml-5 transition-all duration-200">
            Join
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;