'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from "@iconify/react";

const FreelancerProfileClient = ({freelancer}) => {
  if (!freelancer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <Icon icon="lucide:user-x" className="text-6xl text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
        <p className="text-gray-500 mb-6">This freelancer account may have been removed or does not exist.</p>
        <Link href="/browse-freelancers" className="bg-gray-900 text-white font-bold py-3 px-6 rounded-xl">
          Back to Freelancers
        </Link>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 min-h-screen">

      {/* Navigation Breadcrumb */}
      <Link href="/browse-freelancers" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <Icon icon="lucide:arrow-left" /> Back to all freelancers
      </Link>

      {/* --- PROFILE HEADER CARD --- */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-8">

        {/* Cover Photo / Header Gradient */}
        <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-700 w-full relative"></div>

        <div className="px-8 pb-8">

          {/* Changed layout: No negative margin on the wrapper, just standard flex */}
          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            
            {/* Avatar - Negative margin applied ONLY here to pull it up into the banner */}
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 shadow-md overflow-hidden flex-shrink-0 -mt-16 mx-auto md:mx-0">
              {freelancer.image ? (
                <img src={freelancer.image} alt={freelancer.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold bg-blue-50 text-blue-600">
                  {freelancer.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="mt-2 text-center md:text-left">
              <h1 className="text-3xl font-black text-gray-900">{freelancer.name}</h1>
              <p className="text-gray-500 font-medium text-lg mt-1 capitalize">{freelancer.role || 'Freelancer'}</p>

              {/* Rating & Location Row */}
              <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Icon icon="lucide:star" className="fill-current text-lg" />
                  <span className="text-gray-900">5.0</span>
                  <span className="text-gray-500 font-normal">(New)</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1 text-gray-500 font-medium">
                  <Icon icon="lucide:map-pin" /> Remote
                </div>
              </div>
            </div>
            
            {/* The Invite and Mail buttons were completely removed from here! */}

          </div>
        </div>
      </div>

      {/* --- PROFILE BODY GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Main Content Column (Left side) */}
        <div className="md:col-span-2 space-y-8">

          {/* About Section */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {freelancer.bio && freelancer.bio !== "none"
                ? freelancer.bio
                : "This freelancer has not added a detailed biography yet."}
            </p>
          </div>

        </div>

        {/* Sidebar Column (Right side) */}
        <div className="space-y-8">

          {/* Pricing & Availability */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Details</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500">Hourly Rate</span>
                <span className="font-bold text-gray-900">${freelancer.hourlyRate || 0} / hr</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500">Availability</span>
                <span className="font-bold text-green-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Available
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Member Since</span>
                <span className="font-bold text-gray-900">
                  {freelancer.createdAt ? new Date(freelancer.createdAt).getFullYear() : new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>

            {freelancer.skills && freelancer.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No specific skills listed.</p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default FreelancerProfileClient;