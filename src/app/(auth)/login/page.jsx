'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { signIn } from '@/lib/auth-client';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const { data, error } = await signIn.email({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      alert(`Login failed: ${error.message}`);
      return;
    }

    const role = data?.user?.role;

    if (role === 'admin') {
      router.push('/dashboard/admin');
    } else if (role === 'freelancer') {
      router.push('/dashboard/freelancer');
    } else {
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/"
    });
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

      {/* --- Right Half: Login Form --- */}
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

          <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-[#62646a] text-sm mb-8 font-medium">
            Please enter your details to sign in.
          </p>

          <Form className="flex flex-col gap-5" onSubmit={handleLogin} validationBehavior="native">

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
              <Label className="text-sm font-semibold text-gray-900">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="freelancer@arrow.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
            >
              <Label className="text-sm font-semibold text-gray-900">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="Enter your password" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <div className="flex items-center gap-3 pt-2 w-full">
              <Button
                type="submit"
                isDisabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-sm h-[48px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>

              <Button
                type="reset"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors text-sm h-[48px]"
              >
                Reset Credentials
              </Button>
            </div>
          </Form>

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

          <Button onPress={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 font-semibold h-12 rounded-xl text-gray-700 border border-gray-200" variant="tertiary">
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