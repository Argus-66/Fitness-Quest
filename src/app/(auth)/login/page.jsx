'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Call the actual login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to user profile
        router.push(`/${data.user.username}`);
      } else {
        // Login failed
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gradient flex items-center justify-center p-4">
      <div className="bg-theme-dark/50 backdrop-blur-md rounded-xl border border-theme-primary/30 p-8 max-w-md w-full shadow-theme">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-theme-light to-theme-accent text-transparent bg-clip-text text-center mb-6">Fitness Quest</h1>
        
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-theme-light mb-2 font-medium">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-theme-light mb-2 font-medium">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-4 bg-theme-accent hover:bg-theme-primary text-white rounded-lg
            transform transition-all duration-300 hover:scale-[1.02]
            shadow-theme disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-theme-light/80">
            Don't have an account?{' '}
            <Link href="/register" className="text-theme-accent hover:text-theme-light transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 