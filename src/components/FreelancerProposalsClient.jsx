'use client';

import React from 'react';

export default function FreelancerProposalsClient({ initialProposals }) {
  return (
    <div className="max-w-4xl pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Proposals</h1>
        <p className="text-gray-500 mt-1 font-medium">{initialProposals.length} proposal{initialProposals.length !== 1 && 's'} submitted</p>
      </div>

      <div className="flex flex-col gap-4">
        {initialProposals.map((proposal) => (
          <div key={proposal._id} className="bg-white border border-gray-200 rounded-2xl p-6 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow">
            
            <div>
              <h2 className="text-base font-bold text-gray-900">{proposal.task_title}</h2>
              <p className="text-sm font-medium text-gray-500 mt-0.5 mb-3">{proposal.freelancer_email}</p>
              
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                <span className="text-gray-900 font-bold">${proposal.proposed_budget}</span>
                <span>{proposal.estimated_days} days</span>
                <span>{new Date(proposal.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-gray-400 font-medium ml-2">Task budget: ${proposal.task_budget}</span>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              proposal.status === 'Accepted' ? 'bg-green-50 text-green-600' :
              proposal.status === 'Rejected' ? 'bg-red-50 text-red-600' :
              'bg-yellow-50 text-yellow-600'
            }`}>
              {proposal.status || 'Pending'}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}