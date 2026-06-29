'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] md:text-[400px] font-black text-gray-100/50 pointer-events-none select-none">
        404
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full text-center"
      >
        
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-gray-100"
        >
          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
            <Icon icon="lucide:map-pin-off" className="text-3xl" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
          Page Not Found
        </h1>
        
        <p className="text-gray-500 mb-10 text-lg">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto h-12 px-6 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Icon icon="lucide:arrow-left" className="text-lg" />
            Go Back
          </button>

          <Link 
            href="/"
            className="w-full sm:w-auto h-12 px-8 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Icon icon="lucide:home" className="text-lg" />
            Return Home
          </Link>

        </div>
      </motion.div>

    </div>
  );
}