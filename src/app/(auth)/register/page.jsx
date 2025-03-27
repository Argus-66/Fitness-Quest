'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    height: '',
    weight: '',
    fitnessLevel: 'beginner',
    fitnessGoals: [],
    bio: ''
  });
  
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
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

  const validateStep1 = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setError('');
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would normally send the data to an API
      console.log('Registration data:', formData);
      
      // Mock registration for demonstration
      localStorage.setItem('user', JSON.stringify({ 
        username: formData.username,
        email: formData.email,
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        fitnessLevel: formData.fitnessLevel,
        fitnessGoals: formData.fitnessGoals,
        bio: formData.bio
      }));
      
      router.push(`/${formData.username}`);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gradient flex items-center justify-center p-4">
      <div className="bg-theme-dark/40 backdrop-blur-md rounded-xl border border-theme-primary/30 p-8 max-w-md w-full shadow-theme">
        <h1 className="text-3xl font-bold text-theme-light text-center mb-6">Create your account</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label htmlFor="username" className="block text-theme-light mb-2">Username*</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                  placeholder="Choose a username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-theme-light mb-2">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-theme-light mb-2">Password*</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                  placeholder="Create a password (min. 6 characters)"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-theme-light mb-2">Confirm Password*</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 mt-4 bg-gradient-to-r from-theme-accent to-theme-primary text-white rounded-lg font-medium shadow-glow hover:from-theme-accent/90 hover:to-theme-primary/90 transition-all"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-theme-light mb-2">Age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                    placeholder="Years"
                  />
                </div>
                
                <div>
                  <label htmlFor="height" className="block text-theme-light mb-2">Height</label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                    placeholder="cm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-theme-light mb-2">Weight</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                  placeholder="kg"
                />
              </div>
              
              <div>
                <label htmlFor="fitnessLevel" className="block text-theme-light mb-2">Fitness Level</label>
                <select
                  id="fitnessLevel"
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-theme-light mb-2">Fitness Goals</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="loseWeight"
                      value="loseWeight"
                      checked={formData.fitnessGoals.includes('loseWeight')}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                    />
                    <label htmlFor="loseWeight" className="ml-2 text-sm text-theme-light">
                      Lose Weight
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="buildMuscle"
                      value="buildMuscle"
                      checked={formData.fitnessGoals.includes('buildMuscle')}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                    />
                    <label htmlFor="buildMuscle" className="ml-2 text-sm text-theme-light">
                      Build Muscle
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="improveEndurance"
                      value="improveEndurance"
                      checked={formData.fitnessGoals.includes('improveEndurance')}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                    />
                    <label htmlFor="improveEndurance" className="ml-2 text-sm text-theme-light">
                      Improve Endurance
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="increaseStrength"
                      value="increaseStrength"
                      checked={formData.fitnessGoals.includes('increaseStrength')}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-theme-primary/30 text-theme-accent focus:ring-theme-accent"
                    />
                    <label htmlFor="increaseStrength" className="ml-2 text-sm text-theme-light">
                      Increase Strength
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-theme-light mb-2">Bio (Optional)</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-theme-dark/60 text-theme-light rounded-lg border border-theme-primary/30 focus:border-theme-accent focus:outline-none"
                  rows="3"
                  placeholder="Tell us about yourself and your fitness journey"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 bg-theme-dark/60 text-theme-light rounded-lg font-medium border border-theme-primary/30 hover:bg-theme-dark/80 transition-all"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-theme-accent to-theme-primary text-white rounded-lg font-medium shadow-glow hover:from-theme-accent/90 hover:to-theme-primary/90 transition-all"
                >
                  Sign up
                </button>
              </div>
            </>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-theme-light/70">
            Already have an account?{' '}
            <Link href="/login" className="text-theme-accent hover:text-theme-accent/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 