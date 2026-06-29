'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Icon } from "@iconify/react";
import { Pagination } from "@heroui/react";

export default function BrowseTasksClient({ initialData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { tasks, totalPages, currentPage } = initialData;

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'All';

  const [localSearch, setLocalSearch] = useState(currentSearch);

  const updateFilters = (newSearch, newCategory, newPage) => {
    const params = new URLSearchParams();
    
    if (newSearch) params.set('search', newSearch);
    if (newCategory !== 'All') params.set('category', newCategory);
    params.set('page', newPage);
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== currentSearch) {
        updateFilters(localSearch, currentCategory, 1);
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [localSearch, currentCategory, currentSearch]); 

  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  const handleCategory = (e) => updateFilters(currentSearch, e.target.value, 1);
  const handlePageChange = (pageNumber) => updateFilters(currentSearch, currentCategory, pageNumber);

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 min-h-screen">
      
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
          Explore Open Tasks
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Find the perfect freelance job. Filter by category, search for specific skills, and submit your proposal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="relative w-full sm:w-2/3">
            <Icon icon="lucide:search" className="absolute left-4 top-3.5 text-gray-400 text-xl" />
            <input 
              type="text"
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
              placeholder="Search tasks by title..."
              value={localSearch} // Now uses the instant local state
              onChange={(e) => setLocalSearch(e.target.value)} // Updates locally without triggering the server instantly
            />
          </div>
          
          {/* Category Filter - FIXED COLORS */}
          <div className="relative w-full sm:w-1/3">
            <select 
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 appearance-none cursor-pointer text-sm font-medium text-gray-700 transition-all"
              value={currentCategory}
              onChange={handleCategory}
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
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Icon icon="lucide:search-x" className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No tasks found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tasks.map((task) => (
            <div key={task._id} className="h-full flex flex-col rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 bg-white group overflow-hidden">
              
              <div className="flex justify-between items-start pt-6 px-6 pb-0">
                <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full tracking-wide text-[10px] uppercase">
                  {task.category}
                </span>
                <h3 className="text-2xl font-black text-green-600">
                  ${task.budget}
                </h3>
              </div>

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

              <div className="px-6 pb-6 pt-0 flex items-center justify-between mt-auto gap-4">
                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Icon icon="lucide:calendar-clock" className="text-sm" />
                  <span className="text-xs font-semibold">
                    Due {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <Link 
                  href={`/browse-tasks/${task._id}`}
                  className="bg-gray-900 text-white font-bold px-5 py-2 hover:bg-black transition-colors shadow-md rounded-xl flex items-center gap-2 text-sm"
                >
                  Details <Icon icon="lucide:arrow-right" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center pb-8">
          <Pagination className="justify-center gap-2">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous 
                  isDisabled={currentPage === 1} 
                  onPress={() => handlePageChange(currentPage - 1)}
                  className="font-bold text-gray-700"
                >
                  <Pagination.PreviousIcon />
                  <span>Prev</span>
                </Pagination.Previous>
              </Pagination.Item>
              
              {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link 
                    isActive={p === currentPage} 
                    onPress={() => handlePageChange(p)}
                    className="font-bold"
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              
              <Pagination.Item>
                <Pagination.Next 
                  isDisabled={currentPage === totalPages} 
                  onPress={() => handlePageChange(currentPage + 1)}
                  className="font-bold text-gray-700"
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}

    </div>
  );
}