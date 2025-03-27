"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock, FaRulerVertical, FaWeight } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { IoMdCalendar } from 'react-icons/io';
import { MdFitnessCenter, MdSportsGymnastics } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  fitnessLevel: string;
  fitnessGoals: string[];
  bio: string;
}

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessLevel: 'beginner',
    fitnessGoals: [],
    bio: ''
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match!");
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

      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setError((error as Error).message || 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          fitnessGoals: [...prev.fitnessGoals, value]
        };
      } else {
        return {
          ...prev,
          fitnessGoals: prev.fitnessGoals.filter(goal => goal !== value)
        };
      }
    });
  };

  return (
    <div className="min-h-screen bg-theme-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-theme-dark/50 backdrop-blur-lg rounded-xl shadow-theme overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-theme-light to-theme-accent text-transparent bg-clip-text">
              Join the Quest
            </h2>
            <p className="mt-2 text-theme-light/80">Begin your fitness journey today</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30
                  transition-colors"
                required
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
              <input
                type="password"
                name="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                required
              />
            </div>

            {/* Physical Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <IoMdCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                    text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                  required
                />
              </div>

              <div className="relative">
                <BsGenderAmbiguous className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                    text-white focus:outline-none focus:border-theme-light/30 appearance-none"
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="relative">
                <FaRulerVertical className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
                <input
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                    text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                  required
                />
              </div>

              <div className="relative">
                <FaWeight className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                    text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                  required
                />
              </div>
            </div>

            {/* Fitness Level */}
            <div className="relative">
              <MdFitnessCenter className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-light/50" />
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white focus:outline-none focus:border-theme-light/30 appearance-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Fitness Goals */}
            <div className="bg-theme-primary/20 border border-theme-light/10 rounded-lg p-4">
              <p className="text-theme-light mb-2 flex items-center">
                <MdSportsGymnastics className="mr-2" />
                Fitness Goals (Select all that apply)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="loseWeight"
                    name="fitnessGoals"
                    value="loseWeight"
                    checked={formData.fitnessGoals.includes('loseWeight')}
                    onChange={handleCheckboxChange}
                    className="rounded border-theme-light/10 bg-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                  />
                  <label htmlFor="loseWeight" className="text-theme-light">Lose Weight</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="buildMuscle"
                    name="fitnessGoals"
                    value="buildMuscle"
                    checked={formData.fitnessGoals.includes('buildMuscle')}
                    onChange={handleCheckboxChange}
                    className="rounded border-theme-light/10 bg-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                  />
                  <label htmlFor="buildMuscle" className="text-theme-light">Build Muscle</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="improveEndurance"
                    name="fitnessGoals"
                    value="improveEndurance"
                    checked={formData.fitnessGoals.includes('improveEndurance')}
                    onChange={handleCheckboxChange}
                    className="rounded border-theme-light/10 bg-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                  />
                  <label htmlFor="improveEndurance" className="text-theme-light">Improve Endurance</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="increaseStrength"
                    name="fitnessGoals"
                    value="increaseStrength"
                    checked={formData.fitnessGoals.includes('increaseStrength')}
                    onChange={handleCheckboxChange}
                    className="rounded border-theme-light/10 bg-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                  />
                  <label htmlFor="increaseStrength" className="text-theme-light">Increase Strength</label>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="relative">
              <textarea
                name="bio"
                placeholder="Tell us about your fitness journey (optional)"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
                  text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-theme-accent hover:bg-theme-primary text-white rounded-lg
                transform transition-all duration-300 hover:scale-[1.02]
                shadow-theme"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-theme-light/80">
            Already have an account?{' '}
            <Link href="/login" className="text-theme-accent hover:text-theme-light transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 