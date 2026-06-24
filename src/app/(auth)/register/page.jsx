'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from 'framer-motion';

const RegisterPage = () => {
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [imageInputType, setImageInputType] = useState('url');

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const finalRole = isFreelancer ? 'freelancer' : 'client';

    const payload = {
      name: data.name,
      email: data.email,
      image: data.image,
      password: data.password,
      role: finalRole
    };

    // Append extra fields ONLY if they registered as a freelancer
    if (isFreelancer) {
      payload.skills = data.skills ? data.skills.split(',').map(s => s.trim()) : [];
      payload.hourlyRate = Number(data.hourlyRate);
      payload.bio = data.bio || "";
    }

    alert(`Form submitted with:\n${JSON.stringify(payload, null, 2)}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-white">

      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2094&auto=format&fit=crop"
          alt="Creative design workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white z-10">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Start Your Journey.
          </h2>
          <p className="text-lg text-gray-300 font-medium max-w-lg">
            Whether you are looking to hire top-tier talent or offer your professional services, Arrow is your launchpad.
          </p>
        </div>
      </div>

      {/* --- Right Half: Registration Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-[440px] py-8">

          <Link href="/" className="inline-block mb-8">
            <Image src="/arrow.png" width={140} height={45} alt="Arrow Logo" className="h-10 w-auto object-contain" />
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
          <p className="text-[#62646a] text-sm mb-8 font-medium">
            Enter your details below to get started.
          </p>

          <div className="mb-8">
            <Button
              className="w-full flex items-center justify-center gap-2 font-semibold h-12 rounded-xl text-gray-700 border border-gray-200 hover:bg-gray-50 bg-white"
              variant="tertiary"
            >
              <Icon icon="devicon:google" className="text-xl" />
              Sign up with Google
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Note: Google sign-ups are automatically registered as a Client account.
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-semibold tracking-wider">
                Or register with email
              </span>
            </div>
          </div>

          <Form className="flex flex-col gap-5" onSubmit={onSubmit} validationBehavior="native">

            <TextField isRequired name="name" type="text">
              <Label className="text-sm font-semibold text-gray-900">Full Name</Label>
              <Input placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-900">Email Address</Label>
              <Input placeholder="jane@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            {/* --- Profile Image Section (Now required for all users) --- */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-gray-900">
                Profile Image <span className="text-red-500">*</span>
              </Label>

              <div className="flex p-1 bg-gray-100 rounded-lg w-fit mb-1 border border-gray-200">
                <button
                  type="button"
                  onClick={() => setImageInputType('url')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${imageInputType === 'url'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Link URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputType('upload')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${imageInputType === 'upload'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Upload Image
                </button>
              </div>

              {imageInputType === 'url' ? (
                <Input
                  required
                  name="image"
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
                />
              ) : (
                <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all group overflow-hidden cursor-pointer">
                  <div className="flex flex-col items-center gap-1">
                    <Icon icon="lucide:upload-cloud" className="text-3xl text-gray-400 mb-1 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm font-bold text-gray-700">Click to upload</span>
                    <span className="text-xs text-gray-400 font-medium">JPG, PNG or GIF (Max 5MB)</span>
                  </div>
                </div>
              )}
            </div>
            {/* --- End of Profile Image Section --- */}

            <TextField
              isRequired
              minLength={6}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6) return "Password must be at least 6 characters long.";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one capital letter.";
                if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-900">Password</Label>
              <Input placeholder="Create a strong password" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" />
              <Description className="text-xs text-gray-500 mt-1">Must be at least 6 characters with 1 uppercase and 1 lowercase letter.</Description>
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <div className={`p-4 mt-2 border rounded-xl flex items-start gap-3 transition-colors ${isFreelancer ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center h-5">
                <input
                  id="isFreelancer"
                  name="isFreelancer"
                  type="checkbox"
                  checked={isFreelancer}
                  onChange={(e) => setIsFreelancer(e.target.checked)}
                  className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring-blue-600 cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="isFreelancer" className="text-sm font-bold text-gray-900 cursor-pointer">
                  I want to become a Freelancer
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Check this box if you want to browse tasks, submit proposals, and get hired.
                </p>
              </div>
            </div>

            {/* Dynamic Freelancer Fields */}
            <AnimatePresence>
              {isFreelancer && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '4px' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-5 overflow-hidden"
                >

                  <div className="grid grid-cols-2 gap-4">
                    <TextField isRequired={isFreelancer} name="skills" type="text">
                      <Label className="text-sm font-semibold text-gray-900">Skills <span className="text-red-500">*</span></Label>
                      <Input placeholder="e.g. React, Design" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" />
                      <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>

                    <TextField isRequired={isFreelancer} name="hourlyRate" type="number">
                      <Label className="text-sm font-semibold text-gray-900">Hourly Rate (USD) <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500">$</span>
                        <Input placeholder="0.00" className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 bg-white" />
                      </div>
                      <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-semibold text-gray-900">Bio <span className="text-gray-400 font-normal">(Optional)</span></Label>
                    <textarea
                      name="bio"
                      rows="3"
                      placeholder="Tell clients a bit about yourself..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm resize-none"
                    ></textarea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl transition-colors h-12 mt-2 shadow-md"
            >
              Create Account
            </Button>
          </Form>

          <p className="text-center text-sm text-gray-600 mt-8 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-bold">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default RegisterPage;