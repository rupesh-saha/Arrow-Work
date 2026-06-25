'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import { Button } from "@heroui/react";

export default function BrowseTasksPage() {
  const [tasks, setTasks] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:5001/api/tasks`);
      if (response.ok) {
        const data = await response.json();
        // Filter out nulls and ONLY show "Open" tasks
        const openTasks = data.filter(task => task && task._id && task.status === 'Open');
        setTasks(openTasks);
      } else {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  // Challenge 1: Filter Logic (Search by Title + Category Dropdown)
  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || task.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  if (tasks === null) {
    return <div className="flex justify-center items-center min-h-[60vh]"><Icon icon="eos-icons:loading" className="text-4xl animate-spin text-gray-900" /></div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 min-h-screen">
      
      {/* --- PAGE HEADER & FILTERS --- */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
          Explore Open Tasks
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Find the perfect freelance job. Filter by category, search for specific skills, and submit your proposal to clients worldwide.
        </p>

        {/* Filter Bar using pure Tailwind HTML */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Custom Search Input */}
          <div className="relative w-full sm:w-2/3">
            <Icon icon="lucide:search" className="absolute left-4 top-3.5 text-gray-400 text-xl" />
            <input 
              type="text"
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="Search tasks by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Custom Category Dropdown */}
          <div className="relative w-full sm:w-1/3">
            <select 
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-400 appearance-none cursor-pointer text-sm font-medium text-gray-700 transition-colors"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>
            <Icon icon="lucide:chevron-down" className="absolute right-4 top-4 text-gray-400 pointer-events-none text-lg" />
          </div>

        </div>
      </motion.div>

      {/* --- TASKS GRID --- */}
      {filteredTasks?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Icon icon="lucide:search-x" className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No tasks found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTasks.map((task) => (
            <motion.div key={task._id} variants={itemVariants}>
              
              {/* Pure HTML/Tailwind Card to replace HeroUI Card */}
              <div className="h-full flex flex-col rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 bg-white group overflow-hidden">
                
                {/* Card Header */}
                <div className="flex justify-between items-start pt-6 px-6 pb-0">
                  <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full tracking-wide text-[10px] uppercase">
                    {task.category}
                  </span>
                  <h3 className="text-2xl font-black text-green-600">
                    ${task.budget}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="px-6 py-4 flex-grow">
                  <h4 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-500 mt-auto">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                      <Icon icon="lucide:user" className="text-xs text-gray-500" />
                    </div>
                    <span className="text-xs font-medium truncate">{task.client_email}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between mt-auto gap-4">
                  <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Icon icon="lucide:calendar-clock" className="text-sm" />
                    <span className="text-xs font-semibold">
                      Due {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  {/* Keep HeroUI Button as it works perfectly */}
                  <Button 
                    as={Link} 
                    href={`/browse-tasks/${task._id}`}
                    className="bg-gray-900 text-white font-bold px-5 hover:bg-blue-600 transition-colors shadow-md"
                    endContent={<Icon icon="lucide:arrow-right" />}
                  >
                    Details
                  </Button>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

    </div>
  );
}