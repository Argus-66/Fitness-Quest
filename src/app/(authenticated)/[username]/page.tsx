'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaDumbbell, FaFire, FaTrophy, FaChartLine, FaUserFriends, FaSignOutAlt, FaEdit, FaUserPlus, FaUserMinus, FaQuoteLeft, FaScroll, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getUser, clearUser } from '@/lib/auth';
import type { User } from '@/types/user';
import type { Workout } from '@/types/workout';
import UserHeader from '@/components/profile/UserHeader';
import AddFriends from '@/components/profile/AddFriends';
import ActivityHeatmap from '@/components/profile/ActivityHeatmap';
import DailyWorkoutGoals from '@/components/profile/DailyWorkoutGoals';
import StatsGrid from '@/components/profile/StatsGrid';
import WorkoutsTimeline from '@/components/profile/WorkoutsTimeline';
import QuoteCard from '@/components/profile/QuoteCard';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import Avatar from '@/components/common/Avatar';
import ThemeSelector from '@/components/profile/ThemeSelector';

interface PageProps {
  params: {
    username: string;
  };
}

// Motivational quotes
const quotes = [
  "Every workout is a step toward your legendary status.",
  "The only bad workout is the one that didn't happen.",
  "Your body can withstand almost anything. It's your mind you have to convince.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "The pain you feel today will be the strength you feel tomorrow."
];

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bio: '',
    height: 0,
    weight: 0,
    age: 0
  });
  const [friendUsername, setFriendUsername] = useState('');
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ username: string; level: number }>>([]);
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [workouts, setWorkouts] = useState<Array<{
    date: string;
    name: string;
    duration: number;
    xpGained: number;
  }>>([]);
  const [quote, setQuote] = useState('');
  
  // Get the logged-in user
  const loggedInUser = getUser();
  
  // Check if viewing own profile
  const isOwnProfile = loggedInUser?.username === params.username;

  const handleLogout = () => {
    clearUser();
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'bio' ? value : Number(value)
    }));
  };

  const handleSaveDetails = async () => {
    try {
      const response = await fetch(`/api/users/${user?.username}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      // Refresh user data
      fetchUser();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleAddFriend = async () => {
    if (!loggedInUser) {
      console.error('User not logged in');
      return;
    }

    try {
      console.log(`Adding friend: ${params.username}`);
      setIsAddingFriend(true);
      
      const response = await fetch(`/api/users/${loggedInUser.username}/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendUsername: params.username }),
      });

      if (!response.ok) {
        throw new Error('Failed to add friend');
      }

      setIsFriend(true);
      console.log('Friend added successfully');
    } catch (error) {
      console.error('Error adding friend:', error);
    } finally {
      setIsAddingFriend(false);
    }
  };

  const handleRemoveFriend = async () => {
    if (!loggedInUser) {
      console.error('User not logged in');
      return;
    }

    try {
      console.log(`Removing friend: ${params.username}`);
      setIsAddingFriend(true);
      
      const response = await fetch(`/api/users/${loggedInUser.username}/friends/${params.username}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove friend');
      }

      setIsFriend(false);
      console.log('Friend removed successfully');
    } catch (error) {
      console.error('Error removing friend:', error);
    } finally {
      setIsAddingFriend(false);
    }
  };

  const handleRemoveFriendDirect = async (username: string) => {
    if (!loggedInUser) {
      console.error('User not logged in');
      return;
    }

    try {
      console.log(`Removing friend: ${username}`);
      
      const response = await fetch(`/api/users/${loggedInUser.username}/friends/${username}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove friend');
      }

      // Refresh user data to update friends list
      fetchUser();
      console.log('Friend removed successfully');
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const fetchWorkouts = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${params.username}/workouts`);
      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }
      const data = await response.json();
      setWorkouts(data.workouts || []);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
      setWorkouts([]);
    }
  }, [params.username]);

  const calculateXpProgress = (level: number, xp: number) => {
    const xpForNextLevel = level * 100;
    return Math.min(100, (xp / xpForNextLevel) * 100);
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${params.username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      setUser(data);
      
      // Check if this user is already a friend of the logged-in user
      if (!isOwnProfile && loggedInUser) {
        const friendsResponse = await fetch(`/api/users/${loggedInUser.username}/friends`);
        if (friendsResponse.ok) {
          const friendsData = await friendsResponse.json();
          const isFriendAlready = friendsData.friends.some(
            (friend: { username: string }) => friend.username === params.username
          );
          setIsFriend(isFriendAlready);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, [params.username]);

  useEffect(() => {
    fetchUser();
    // Set a random motivational quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [params.username]);

  useEffect(() => {
    if (user) {
      setEditForm({
        bio: user.bio || '',
        height: user.height || 0,
        weight: user.weight || 0,
        age: user.age || 0
      });
      
      // Fetch workouts when user data is available
      fetchWorkouts();
    }
  }, [user]);

  // Fetch user data when username changes
  useEffect(() => {
    fetchUser();
    // Reset form when username changes
    setIsEditing(false);
  }, [params.username, fetchUser]);

  // Fetch workouts when username changes
  useEffect(() => {
    fetchWorkouts();
  }, [params.username, fetchWorkouts]);

  const handleThemeChange = async (themeId: string) => {
    if (!user || !isOwnProfile) {
      throw new Error('Unauthorized to change theme');
    }

    try {
      const response = await fetch(`/api/users/${user.username}/theme`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: themeId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update theme');
      }

      // Update local user data
      const updatedUser = { ...user, theme: themeId };
      setUser(updatedUser);
      
      // Note: ThemeContext has already updated localStorage so no need to do it here
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error; // Re-throw to be handled by the ThemeSelector component
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-theme-dark via-theme-primary/50 to-theme-dark flex items-center justify-center">
        <div className="animate-pulse text-theme-light text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-gradient p-8">
      <div className="space-y-8">
        <UserHeader 
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onLogout={isOwnProfile ? handleLogout : undefined}
          isOwnProfile={isOwnProfile}
        />

        {/* Friends Section */}
        <div className="flex space-x-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setShowFriendsModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-theme-dark/40 backdrop-blur-lg rounded-xl border border-theme-primary/30 hover:bg-theme-primary/20 shadow-glow-sm transition-all duration-300"
          >
            <FaUserFriends className="w-5 h-5 text-theme-light" />
            <span className="text-theme-light">Friends ({user.friends?.length || 0})</span>
          </motion.button>
          
          {isOwnProfile ? (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowAddFriendModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-br from-theme-accent/30 to-theme-primary/30 backdrop-blur-lg rounded-xl border border-theme-accent/40 hover:from-theme-accent/40 hover:to-theme-primary/40 shadow-glow-sm transition-all duration-300"
            >
              <FaUserPlus className="w-5 h-5 text-theme-light" />
              <span className="text-theme-light">Add Friend</span>
            </motion.button>
          ) : (
            !isFriend ? (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleAddFriend}
                disabled={isAddingFriend}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-br from-theme-accent/30 to-theme-primary/30 backdrop-blur-lg rounded-xl border border-theme-accent/40 hover:from-theme-accent/40 hover:to-theme-primary/40 shadow-glow-sm transition-all duration-300 disabled:opacity-50"
              >
                {isAddingFriend ? (
                  <span className="text-theme-light">Adding...</span>
                ) : (
                  <>
                    <FaUserPlus className="w-5 h-5 text-theme-light" />
                    <span className="text-theme-light">Add Friend</span>
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleRemoveFriend}
                disabled={isAddingFriend}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-br from-theme-secondary/30 to-theme-accent/30 backdrop-blur-lg rounded-xl border border-theme-secondary/40 hover:bg-theme-secondary/20 shadow-glow-sm transition-all duration-300 disabled:opacity-50"
              >
                {isAddingFriend ? (
                  <span className="text-theme-light">Updating...</span>
                ) : (
                  <>
                    <FaUserFriends className="w-5 h-5 text-theme-light" />
                    <span className="text-theme-light">Friend ✓</span>
                  </>
                )}
              </motion.button>
            )
          )}
          
          {isOwnProfile && (
            <ThemeSelector 
              currentTheme={user.theme || 'solo-leveling'} 
              onThemeChange={handleThemeChange}
            />
          )}
        </div>

        {/* Main content */}
        <div className="space-y-8 pb-8">
          {/* Stats Grid */}
          <StatsGrid user={user} />

          {/* Activity Heatmap */}
          <div className="w-full">
            <h2 className="text-2xl font-bold text-theme-light mb-4">Workout Activity</h2>
            <ActivityHeatmap workouts={workouts} />
          </div>

          {/* Daily Workout Goals */}
          <DailyWorkoutGoals
            userId={user._id}
            username={user.username}
            isOwnProfile={isOwnProfile}
          />

          {/* Recent Workouts */}
          <div className="w-full">
            <WorkoutsTimeline workouts={workouts} />
          </div>

          {/* Motivational Quote */}
          <div className="w-full">
            <QuoteCard />
          </div>
        </div>

        {/* Modals */}
        {showFriendsModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-theme-gradient rounded-xl border border-theme-primary/30 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-glow"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-theme-light">Friends</h3>
                <button 
                  onClick={() => setShowFriendsModal(false)}
                  className="text-theme-light/60 hover:text-theme-light"
                >
                  ✕
                </button>
              </div>
              
              {user.friends && user.friends.length > 0 ? (
                <div className="space-y-3">
                  {user.friends.map((friend: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-theme-primary/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-theme-gradient flex items-center justify-center">
                          <span className="text-lg font-bold text-theme-light">{friend.username[0].toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="text-theme-light font-medium">{friend.username}</p>
                          <p className="text-xs text-theme-light/60">Level {friend.level || 1}</p>
                        </div>
                      </div>
                      
                      {isOwnProfile && (
                        <button
                          onClick={() => handleRemoveFriendDirect(friend.username)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full"
                        >
                          <FaUserMinus />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-theme-light text-center py-6">No friends yet</p>
              )}
            </motion.div>
          </div>
        )}
        
        {isOwnProfile && showAddFriendModal && (
          <AddFriends 
            onClose={() => setShowAddFriendModal(false)} 
            onFriendAdded={fetchUser}
          />
        )}
      </div>
    </div>
  );
} 