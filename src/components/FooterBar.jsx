import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FooterBar = () => {
  const currentYear = new Date().getFullYear(); // Dynamic copyright year

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* --- Top Section: Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Main Pages */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Platform</h3>
            <ul className="flex flex-col gap-3 text-[#62646a] text-sm font-medium">
              <li><Link href="/" className="hover:underline transition-all">Home</Link></li>
              <li><Link href="/browse-tasks" className="hover:underline transition-all">Browse Tasks</Link></li>
              <li><Link href="/browse-freelancers" className="hover:underline transition-all">Browse Freelancers</Link></li>
              <li><Link href="/login" className="hover:underline transition-all">Sign In</Link></li>
              <li><Link href="/register" className="hover:underline transition-all">Join Arrow</Link></li>
            </ul>
          </div>

          {/* Column 2: Categories (Based on your project requirements) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <ul className="flex flex-col gap-3 text-[#62646a] text-sm font-medium">
              <li><Link href="/browse-tasks?category=Design" className="hover:underline transition-all">Design</Link></li>
              <li><Link href="/browse-tasks?category=Writing" className="hover:underline transition-all">Writing</Link></li>
              <li><Link href="/browse-tasks?category=Development" className="hover:underline transition-all">Development</Link></li>
              <li><Link href="/browse-tasks?category=Marketing" className="hover:underline transition-all">Marketing</Link></li>
              <li><Link href="/browse-tasks?category=Other" className="hover:underline transition-all">Other</Link></li>
            </ul>
          </div>

          {/* Column 3: About / Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">About</h3>
            <ul className="flex flex-col gap-3 text-[#62646a] text-sm font-medium">
              <li><a href="#" className="hover:underline transition-all">About Us</a></li>
              <li><a href="#" className="hover:underline transition-all">How It Works</a></li>
              <li><a href="#" className="hover:underline transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline transition-all">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Required by rubric) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact & Support</h3>
            <ul className="flex flex-col gap-3 text-[#62646a] text-sm font-medium">
              <li><a href="mailto:support@arrow.com" className="hover:underline transition-all">support@arrow.com</a></li>
              <li><a href="#" className="hover:underline transition-all">Help Center</a></li>
              <li><a href="#" className="hover:underline transition-all">Trust & Safety</a></li>
            </ul>
          </div>

        </div>

        {/* --- Bottom Section: Branding & Socials --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200 gap-4">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image 
                src="/arrow.png" 
                width={100} 
                height={30} 
                alt="Arrow Logo" 
                className="h-7 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" 
              />
            </Link>
            <span className="text-sm text-[#b5b6ba] font-medium">
              © Arrow International Ltd. {currentYear}
            </span>
          </div>

          {/* Social Icons (Includes the mandatory new X icon) */}
          <div className="flex items-center gap-5 text-[#b5b6ba]">
            
            {/* New X (Twitter) Icon */}
            <a href="#" aria-label="X (Twitter)" className="hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>

            {/* Instagram Icon */}
            <a href="#" aria-label="Instagram" className="hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterBar;