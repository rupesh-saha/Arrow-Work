'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from "@iconify/react";
import Image from 'next/image';

export default function FreelancersClient({ initialFreelancers }) {
  
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Hire Top Freelancers
        </h1>
        <p className="text-gray-500 mb-6">
          Browse our community of expert designers, developers, writers, and marketers.
        </p>
      </div>

      {initialFreelancers.length === 0 ? (
        <div className="text-center py-16 border border-gray-200 rounded-lg bg-gray-50">
          <Icon icon="lucide:users" className="text-4xl text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900">No freelancers found</h3>
          <p className="text-gray-500 text-sm">Check back later for new talent.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialFreelancers.map((freelancer) => (
            
            <div key={freelancer._id} className="flex flex-col border border-gray-200 rounded-lg bg-white p-6 text-center hover:border-gray-300 transition-colors">
              
              {/* Avatar */}
              <div className="mx-auto w-20 h-20 rounded-full mb-4 bg-gray-100 overflow-hidden">
                {freelancer.image ? (
                  <Image width={300} height={300} src={freelancer.image} alt={freelancer.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                    {freelancer.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900">{freelancer.name}</h3>
              <p className="text-sm font-medium text-gray-500 mb-3">${freelancer.hourlyRate || 0} / hr</p>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow px-2">
                {freelancer.bio && freelancer.bio !== "none" ? freelancer.bio : "No bio provided."}
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {freelancer.skills?.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              <Link 
                href={`/freelancers/${freelancer._id}`}
                className="w-full py-2 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-50 font-semibold transition-colors text-sm inline-block"
              >
                View Profile
              </Link>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}