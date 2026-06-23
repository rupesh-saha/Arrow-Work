'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Hero = () => {
  const carouselImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2094&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
  ];

  return (
    <section className="relative w-full h-[600px] md:h-[650px] lg:h-[700px]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} bg-white opacity-50 hover:opacity-100 transition-opacity w-3 h-3 rounded-full mx-1 inline-block"></span>`;
          },
        }}
        className="w-full h-full"
      >
        {carouselImages.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${imgUrl})` }} 
            />
            {/* FIX 1: Solid dark overlay on mobile, gradient on desktop for perfect contrast */}
            <div className="absolute inset-0 bg-black/65 md:bg-gradient-to-r md:from-gray-900/95 md:via-gray-900/70 md:to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Framer Motion Animated Overlay --- */}
      {/* FIX 2: Centered on mobile (justify-center), left-aligned on desktop (md:justify-start) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center md:justify-start">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-8 text-center md:text-left">
          
          <div className="max-w-2xl text-white mx-auto md:mx-0">
            
            {/* FIX 3: Bulletproof animations using direct initial/animate & optimized text sizing */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-5 tracking-tight"
            >
              Get your tasks done by <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">skilled freelancers</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 font-medium leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              Arrow is your premier marketplace for micro-tasks. Whether you need a quick logo fix, a bug squashed, or an article written, connect with top-tier talent and get it done fast.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              {/* Mandatory Rubric Action Buttons */}
              <Link 
                href="/dashboard/client" 
                className="flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 font-bold h-12 px-8 rounded-md transition-all duration-200 text-base sm:text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Post a Task
              </Link>
              <Link 
                href="/browse-tasks" 
                className="flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold h-12 px-8 rounded-md transition-all duration-200 text-base sm:text-lg w-full sm:w-auto"
              >
                Browse Tasks
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
      
    </section>
  );
};

export default Hero;