'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth.js';
import UserHeader from '../../../components/profile/UserHeader';
import ActivityHeatmap from '../../../components/profile/ActivityHeatmap';
import AddFriends from '../../../components/profile/AddFriends';

export default function ProfilePage() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // In a real app, this would fetch from an API
        const username = params.username;
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if this is the current user's profile
        const currentUser = await getCurrentUser();
        const isOwnProfile = currentUser && currentUser.username === username;
        
        // Mock user data for demo
        const mockUser = {
          username: username,
          joinedDate: new Date('2023-01-15').toISOString(),
          bio: isOwnProfile 
            ? 'This is your profile! You can customize your bio and track your fitness journey here.'
            : `This is ${username}'s profile.`,
          progression: {
            level: 12,
            xp: 1250,
            streak: 5
          },
          details: {
            fitnessLevel: 'intermediate',
            fitnessGoals: ['buildMuscle', 'improveEndurance']
          }
        };
        
        setUser(mockUser);
        setIsOwnProfile(isOwnProfile);
        setIsFriend(!isOwnProfile && Math.random() > 0.5); // Random for demo
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.username]);

  const handleAddFriend = () => {
    setIsFriend(true);
  };

  return (
    <div className="min-h-screen bg-theme-gradient py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* User Profile Header */}
          <UserHeader user={isLoading ? null : user} />
          
          {/* Friend Button (if not own profile) */}
          {!isLoading && !isOwnProfile && (
            <div className="flex justify-end">
              <button 
                onClick={handleAddFriend}
                disabled={isFriend}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isFriend 
                    ? 'bg-theme-secondary/30 border border-theme-secondary/40 text-theme-light cursor-not-allowed'
                    : 'bg-theme-accent hover:bg-theme-primary text-white'
                }`}
              >
                {isFriend ? 'Friend ✓' : 'Add Friend'}
              </button>
            </div>
          )}
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Activity Heatmap */}
            <div className="md:col-span-2">
              <ActivityHeatmap workouts={[]} />
            </div>
            
            {/* Sidebar Content */}
            <div className="space-y-6">
              {isOwnProfile && (
                <AddFriends onAddFriend={(userId) => console.log('Adding friend:', userId)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 