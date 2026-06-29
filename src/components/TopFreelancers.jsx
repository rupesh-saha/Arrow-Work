'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react";
import Image from 'next/image';

export default function TopFreelancers({ freelancers = [] }) {
  if (freelancers.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20 bg-gray-50 rounded-3xl border border-gray-100 mb-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">Top Freelancers</h2>
          <p className="text-gray-500 font-medium">Work with the best talent on our platform.</p>
        </div>
        <Link href="/browse-freelancers" className="hidden md:flex items-center gap-1 font-bold text-gray-600 hover:text-black transition-colors">
          View all <Icon icon="lucide:arrow-right" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer, index) => (
          <motion.div 
            key={freelancer._id || freelancer.email}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
          >
            <Image
              width={200}
              height={200} 
              src={freelancer.image || "/avatar.png"} 
              alt={freelancer.name} 
              className="w-16 h-16 rounded-full object-cover border border-gray-200 shrink-0" 
            />
            <div className="flex-1 overflow-hidden">
              <h3 className="font-bold text-gray-900 text-lg truncate">{freelancer.name}</h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-black mb-3">
                <Icon icon="lucide:star" /> {(freelancer.avgRating || 0).toFixed(1)} 
                <span className="text-gray-400 font-medium ml-1">({freelancer.totalJobs || 0} jobs)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(freelancer.skills || []).slice(0, 3).map((skill, i) => (
                  <span key={i} className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 rounded font-bold uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}