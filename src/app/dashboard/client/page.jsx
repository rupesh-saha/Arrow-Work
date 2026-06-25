'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import { Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ClientDashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Client';

  const stats = [
    { 
      title: 'Total Tasks', 
      value: '0', 
      icon: 'lucide:layers', 
      color: 'text-blue-600', 
      bg: 'bg-blue-100',
      border: 'border-blue-200'
    },
    { 
      title: 'Open Tasks', 
      value: '0', 
      icon: 'lucide:door-open', 
      color: 'text-green-600', 
      bg: 'bg-green-100',
      border: 'border-green-200'
    },
    { 
      title: 'Tasks In Progress', 
      value: '0', 
      icon: 'lucide:hammer', 
      color: 'text-purple-600', 
      bg: 'bg-purple-100',
      border: 'border-purple-200'
    },
    { 
      title: 'Total Spent (USD)', 
      value: '$0.00', 
      icon: 'lucide:badge-dollar-sign', 
      color: 'text-orange-600', 
      bg: 'bg-orange-100',
      border: 'border-orange-200'
    },
  ];

  // --- Framer Motion Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Delays each card popping in by 0.1s
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back, {userName.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Here is what's happening with your projects today.
          </p>
        </div>
        
        <Link  
          href="/dashboard/client/post-task"
          className="bg-gray-900 text-white font-bold px-6 h-11 rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2 w-fit">
          <Icon icon="lucide:plus" className="text-lg" />
          Post New Task
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className={`border shadow-sm hover:shadow-md transition-shadow duration-300 ${stat.border}`}>
              <div className="p-5 flex flex-row items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                  <Icon icon={stat.icon} className={`text-2xl ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-black text-gray-900 mt-0.5">{stat.value}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4"
      >
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center shadow-sm">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Icon icon="lucide:rocket" className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to get work done?</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
            Post a task to start receiving proposals from top-tier freelancers instantly.
          </p>
          <Link  
            href="/dashboard/client/post-task"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-sm transition-colors">
            Post Your Task
          </Link>
        </div>
      </motion.div>

    </div>
  );
}