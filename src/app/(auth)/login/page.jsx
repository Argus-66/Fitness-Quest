'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock login for demonstration
    if (username && password) {
      // Store in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({ username }));
      router.push(`/${username}`);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gradient flex items-center justify-center p-4">
      <div className="bg-theme-dark/40 backdrop-blur-md rounded-xl border border-theme-primary/30 p-8 max-w-md w-full shadow-theme">
        <h1 className="text-3xl font-bold text-theme-light text-center mb-6">Fitness Quest</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-theme-light mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-theme-light mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-theme-accent to-theme-primary text-white rounded-lg font-medium shadow-glow hover:from-theme-accent/90 hover:to-theme-primary/90 transition-all"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-theme-light/70">
            Don't have an account?{' '}
            <Link href="/register" className="text-theme-accent hover:text-theme-accent/80">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 