'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Client',
      quote: 'Arrow saved my launch week. I posted a bug fix task on a Tuesday, had three proposals within the hour, and the code was shipped by Wednesday. Incredible talent.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Freelancer',
      quote: 'This platform is perfect for filling the gaps between my agency contracts. The UI is clean, clients are responsive, and the Stripe integration means I never worry about getting paid.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Client',
      quote: 'I needed a quick logo touch-up and didn\'t want to hire a full-time designer. Found a top-rated freelancer here in minutes. The quality of work was absolutely premium.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Marcus Thorne',
      role: 'Freelancer',
      quote: 'Arrow completely removed the friction of bidding on small tasks. I spend less time negotiating and more time writing code. Easily my favorite marketplace right now.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-350 mx-auto px-6 md:px-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Loved by Clients & Freelancers
          </h2>
          <p className="text-lg text-[#62646a]">
            Don't just take our word for it. Here is what our community has to say.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-[1600px] mx-auto">
        
        <div className="absolute top-0 bottom-0 left-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />

        <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-4">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8 mx-4 w-87.5 md:w-112.5 flex flex-col justify-between h-62.5"
            >
              <p className="text-gray-700 italic leading-relaxed text-[15px] md:text-base">
                "{review.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-6">
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-[#62646a] font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>

        <div className="absolute top-0 bottom-0 right-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

      </div>
    </section>
  );
};

export default Testimonials;