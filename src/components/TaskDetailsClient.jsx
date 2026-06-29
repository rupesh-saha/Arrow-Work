'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { Icon } from "@iconify/react";

const TaskDetailsClient = ({ task }) => {
  // 1. Get the session data
  const { data: sessionData } = useSession();
  
  // 2. Safely extract the user (will be undefined if logged out, preventing the crash!)
  const user = sessionData?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 3. Safely check the role
  const isFreelancer = user?.role?.toLowerCase() === 'freelancer';

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <Icon icon="lucide:file-question" className="text-6xl text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Not Found</h1>
        <p className="text-gray-500 mb-6">This task may have been removed or does not exist.</p>
        <Link href="/browse-tasks" className="bg-gray-900 text-white font-bold py-3 px-6 rounded-xl">
          Back to Tasks
        </Link>
      </div>
    );
  }

  // Handle Proposal Submission
  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      task_id: task._id,
      freelancer_email: user?.email, // Safely use the email
      proposed_budget: data.proposed_budget,
      estimated_days: data.estimated_days,
      cover_note: data.cover_note,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/proposals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setIsSubmitting(false);

    if (response.ok) {
      setIsSubmitted(true);
    } else {
      alert("Failed to submit proposal. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 min-h-screen">
      
      <Link href="/browse-tasks" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <Icon icon="lucide:arrow-left" /> Back to all tasks
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
            {task.category}
          </span>
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
            {task.status || 'Open'}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
          {task.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          {isFreelancer && (
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Icon icon="lucide:send" className="text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Submit a Proposal</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon="lucide:check" className="text-3xl font-bold" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Proposal Submitted!</h3>
                  <p className="text-gray-500">The client will review your application shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitProposal} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1.5">Proposed Budget (USD)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-medium">$</span>
                        <input 
                          type="number" 
                          name="proposed_budget"
                          required
                          min="1"
                          placeholder="e.g. 50.00" 
                          className="w-full h-12 pl-8 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1.5">Estimated Days</label>
                      <input 
                        type="number" 
                        name="estimated_days"
                        required
                        min="1"
                        placeholder="e.g. 3" 
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1.5">Cover Note</label>
                    <textarea 
                      name="cover_note"
                      required
                      rows="4" 
                      placeholder="Explain why you are the best fit for this task..."
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors mt-2"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Fallback for logged out users or clients */}
          {!isFreelancer && (
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center text-gray-500 text-sm font-medium">
              Only registered Freelancers can submit proposals for this task.
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR DETAILS --- */}
        <div>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm sticky top-8">
            <div className="space-y-6">
              
              {/* Budget */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Icon icon="lucide:dollar-sign" className="text-xl font-bold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Budget</p>
                  <p className="text-2xl font-black text-gray-900">${task.budget}</p>
                </div>
              </div>

              <div className="h-px w-full bg-gray-100"></div>

              {/* Deadline */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon icon="lucide:calendar" className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Deadline</p>
                  <p className="text-lg font-bold text-gray-900">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Posted Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                  <Icon icon="lucide:clock" className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Posted</p>
                  <p className="text-base font-bold text-gray-900">
                    {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Client Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Icon icon="lucide:user" className="text-xl" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p className="text-base font-bold text-gray-900 truncate">
                    {task.client_email}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskDetailsClient;