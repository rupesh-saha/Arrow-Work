'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  FieldError, 
  Form, 
  Input, 
  Label, 
  TextField 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import { useSession } from '@/lib/auth-client';

export default function PostTaskPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      budget: Number(data.budget),
      client_email: session?.user?.email 
    };


    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    setIsLoading(false);
    
    if (response.ok) {
      router.push('/dashboard/client'); 
    } else {
      alert('Failed to publish task. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-2xl mx-auto pb-10"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Post a New Task
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Fill out the details below to publish your task to the marketplace.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <Form className="flex flex-col gap-6" onSubmit={onSubmit} validationBehavior="native">
          
          {/* 1. Task Title */}
          <TextField isRequired name="title" type="text">
            <Label className="text-sm font-semibold text-gray-900 mb-1.5 block">
              Task Title <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="e.g. Design a modern logo for my startup" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white transition-colors" 
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 2. Category Dropdown */}
            <TextField isRequired name="category">
              <Label className="text-sm font-semibold text-gray-900 mb-1.5 block">
                Category <span className="text-red-500">*</span>
              </Label>
              {/* Native select to perfectly match the FormData extraction pattern */}
              <div className="relative">
                <select 
                  name="category"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors appearance-none cursor-pointer text-sm"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Design">Design</option>
                  <option value="Writing">Writing</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
                <Icon icon="lucide:chevron-down" className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" />
              </div>
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            {/* 3. Budget (USD) */}
            <TextField 
              isRequired 
              name="budget" 
              type="number"
              validate={(value) => {
                if (Number(value) <= 0) return "Budget must be greater than $0";
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-900 mb-1.5 block">
                Budget (USD) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">$</span>
                <Input 
                  placeholder="0.00" 
                  min="1"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white transition-colors" 
                />
              </div>
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>
          </div>

          {/* 4. Deadline Date */}
          <TextField 
            isRequired 
            name="deadline" 
            type="date"
            validate={(value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
              if (selectedDate < today) {
                return "Deadline cannot be in the past";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-900 mb-1.5 block">
              Deadline Date <span className="text-red-500">*</span>
            </Label>
            <Input 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white transition-colors cursor-text" 
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          {/* 5. Description */}
          <TextField isRequired name="description">
            <Label className="text-sm font-semibold text-gray-900 mb-1.5 block">
              Task Description <span className="text-red-500">*</span>
            </Label>
            <textarea 
              name="description"
              required
              rows="5"
              placeholder="Describe the deliverables, timeline, and any specific requirements..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors resize-none text-sm"
            ></textarea>
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          {/* Submit Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-2">
            <Button 
              type="submit" 
              isDisabled={isLoading}
              className="flex-1 bg-gray-900 hover:bg-black text-white font-bold h-12 rounded-xl transition-colors shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
                  Publishing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:send" className="text-lg" />
                  Publish Task
                </div>
              )}
            </Button>
            
            <Button 
              type="button" 
              onPress={() => router.push('/dashboard/client')}
              className="flex-[0.3] bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold h-12 rounded-xl transition-colors"
            >
              Cancel
            </Button>
          </div>

        </Form>
      </div>
    </motion.div>
  );
}