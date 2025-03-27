"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock, FaRulerVertical, FaWeight } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { IoMdCalendar } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    height: '',
    weight: ''
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      console.log('Attempting registration...');
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          height: parseInt(formData.height),
          weight: parseInt(formData.weight)
        }),
      });

      const data = await res.json();
      console.log('Registration response:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      alert('Registration successful!');
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert((error as Error).message || 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0a12]">
      <div className="max-w-md w-full space-y-8 p-8 bg-[#0d0a12]/40 backdrop-blur-sm rounded-xl border border-[#9333ea]/20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#9333ea]/20 placeholder-white/50 text-white bg-[#0d0a12]/40 rounded-t-md focus:outline-none focus:ring-[#9333ea] focus:border-[#9333ea] focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#9333ea]/20 placeholder-white/50 text-white bg-[#0d0a12]/40 focus:outline-none focus:ring-[#9333ea] focus:border-[#9333ea] focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#9333ea]/20 placeholder-white/50 text-white bg-[#0d0a12]/40 rounded-b-md focus:outline-none focus:ring-[#9333ea] focus:border-[#9333ea] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#9333ea] hover:bg-[#9333ea]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9333ea]"
            >
              Sign up
            </button>
          </div>

          <div className="text-center">
            <Link href="/login" className="text-[#9333ea] hover:text-[#9333ea]/80">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 