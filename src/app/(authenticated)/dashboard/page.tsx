'use client';

import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-theme-primary/20 rounded w-1/4"></div>
          <div className="h-64 bg-theme-primary/10 rounded"></div>
          <div className="h-32 bg-theme-primary/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="bg-theme-dark/50 text-theme-light rounded-lg p-6 shadow-theme">
          <h2 className="text-xl font-bold mb-4">Welcome to Fitness Quest</h2>
          <p>Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-theme-light mb-6">
        Welcome back, {user.username}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-theme-dark/50 rounded-lg p-6 shadow-theme border border-theme-primary/20">
          <h2 className="text-lg font-bold text-theme-light mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-theme-primary/20 p-4 rounded-lg">
              <p className="text-theme-light/70 text-sm">Level</p>
              <p className="text-2xl font-bold text-theme-light">
                {user.progression?.level || 1}
              </p>
            </div>
            <div className="bg-theme-primary/20 p-4 rounded-lg">
              <p className="text-theme-light/70 text-sm">XP</p>
              <p className="text-2xl font-bold text-theme-light">
                {user.progression?.xp || 0}
              </p>
            </div>
            <div className="bg-theme-primary/20 p-4 rounded-lg">
              <p className="text-theme-light/70 text-sm">Streak</p>
              <p className="text-2xl font-bold text-theme-light">
                {user.progression?.streak || 0} days
              </p>
            </div>
            <div className="bg-theme-primary/20 p-4 rounded-lg">
              <p className="text-theme-light/70 text-sm">Workouts</p>
              <p className="text-2xl font-bold text-theme-light">
                {user.stats?.workoutsCompleted || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-theme-dark/50 rounded-lg p-6 shadow-theme border border-theme-primary/20">
          <h2 className="text-lg font-bold text-theme-light mb-4">Daily Goals</h2>
          <div className="space-y-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-theme-light bg-theme-primary/30">
                    Strength
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-theme-light">
                    30%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-theme-primary/10">
                <div
                  style={{ width: '30%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-theme-accent"
                ></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-theme-light bg-theme-primary/30">
                    Cardio
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-theme-light">
                    60%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-theme-primary/10">
                <div
                  style={{ width: '60%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-theme-accent"
                ></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-theme-light bg-theme-primary/30">
                    Flexibility
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-theme-light">
                    45%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-theme-primary/10">
                <div
                  style={{ width: '45%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-theme-accent"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-theme-dark/50 rounded-lg p-6 shadow-theme border border-theme-primary/20">
        <h2 className="text-lg font-bold text-theme-light mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-theme-accent/80 hover:bg-theme-accent text-white rounded-lg transition-colors">
            Start Workout
          </button>
          <button className="p-4 bg-theme-primary/20 hover:bg-theme-primary/30 text-theme-light rounded-lg border border-theme-primary/30 transition-colors">
            View Workouts
          </button>
          <button className="p-4 bg-theme-primary/20 hover:bg-theme-primary/30 text-theme-light rounded-lg border border-theme-primary/30 transition-colors">
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
} 