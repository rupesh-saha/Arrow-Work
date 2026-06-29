'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react";

export default function LatestTasks({ tasks = [] }) {
  if (tasks.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">Latest Featured Tasks</h2>
          <p className="text-gray-500 font-medium">Explore the newest opportunities posted by clients.</p>
        </div>
        <Link href="/browse-tasks" className="hidden md:flex items-center gap-1 font-bold text-gray-600 hover:text-black transition-colors">
          View all <Icon icon="lucide:arrow-right" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <motion.div 
            key={task._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full flex flex-col rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 bg-white group p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wide">
                {task.category}
              </span>
              <h3 className="text-2xl font-black text-green-600">${task.budget}</h3>
            </div>
            <div className="flex-grow mb-6">
              <h4 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {task.title}
              </h4>
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <Icon icon="lucide:user" className="text-xs text-gray-500" />
                </div>
                <span className="text-xs font-medium truncate">{task.client_email}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Icon icon="lucide:calendar-clock" className="text-sm" />
                <span className="text-xs font-semibold">
                  Due {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <Link href={`/browse-tasks/${task._id}`} className="bg-gray-900 text-white font-bold px-4 py-2 hover:bg-black transition-colors rounded-xl flex items-center gap-2 text-xs shadow-md">
                Details <Icon icon="lucide:arrow-right" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}