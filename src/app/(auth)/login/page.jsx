'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from "@heroui/react";
import {Icon} from "@iconify/react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // BetterAuth login logic will go here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="flex h-[90vh] md:h-screen w-full bg-white">

      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          alt="Freelancers collaborating"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-12 left-12 right-12 text-white z-10">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Elevating Freelance.
          </h2>
          <p className="text-lg text-gray-300 font-medium max-w-lg">
            Join the trust of thousands of clients and professionals managing their tasks effortlessly.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px]">

          <Link href="/" className="inline-block mb-8">
            <Image
              src="/arrow.png"
              width={140}
              height={45}
              alt="Arrow Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Header */}
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-[#62646a] text-sm mb-8 font-medium">
            Please enter your details to sign in.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="freelancer@arrow.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-sm">
                Log In
              </Button>
              <Button type="button" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors text-sm">
                Reset Credentials
              </Button>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-semibold tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <Button className="w-full flex items-center justify-center gap-2 font-semibold h-10 rounded-xl text-gray-700 border border-gray-200" variant="tertiary">
            <Icon icon="devicon:google" className="text-xl" />
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-8 font-medium">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-bold">
              Sign up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;