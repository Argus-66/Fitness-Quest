import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserPlus, FaSpinner } from 'react-icons/fa';
import { getUser } from '@/lib/auth';

interface AddFriendsProps {
  onClose: () => void;
  onFriendAdded?: () => void;
}

export default function AddFriends({ onClose, onFriendAdded }: AddFriendsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ username: string; level: number }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/search?username=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      const data = await response.json();
      const currentUser = getUser();
      
      // Filter out the current user from results
      const filteredResults = data.filter((user: any) => 
        user && user.username && user.username !== currentUser?.username
      );
      
      setSearchResults(filteredResults);
    } catch (err) {
      console.error('Error searching users:', err);
      setError('Failed to search users. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddFriend = async (username: string) => {
    const currentUser = getUser();
    if (!currentUser) {
      setError('You must be logged in to add friends');
      return;
    }

    setIsAdding(username);
    setError(null);

    try {
      const response = await fetch(`/api/users/${currentUser.username}/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendUsername: username }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add friend');
      }

      // Remove the added user from search results
      setSearchResults(prev => prev.filter(user => user.username !== username));
      
      // Call the callback to refresh the friends list
      if (onFriendAdded) {
        onFriendAdded();
      }
    } catch (err) {
      console.error('Error adding friend:', err);
      setError(err instanceof Error ? err.message : 'Failed to add friend. Please try again.');
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-theme-gradient rounded-xl border border-theme-primary/30 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-theme"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-theme-light">Add Friends</h3>
          <button 
            onClick={onClose}
            className="text-theme-light/60 hover:text-theme-light"
          >
            ✕
          </button>
        </div>

        <div className="flex space-x-2 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search users..."
              className="w-full px-4 py-2 bg-theme-dark/40 text-theme-light placeholder-theme-light/50 rounded-lg border border-theme-accent/30 focus:border-theme-accent/50 focus:outline-none"
            />
            {isSearching && (
              <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-light/50 animate-spin" />
            )}
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="px-4 py-2 bg-theme-accent/20 hover:bg-theme-accent/30 text-theme-light rounded-lg border border-theme-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSearch />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {searchResults.map((user) => (
            <div
              key={user.username}
              className="flex justify-between items-center p-3 bg-theme-primary/20 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-theme-gradient flex items-center justify-center">
                  <span className="text-lg font-bold text-theme-light">
                    {user.username[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-theme-light font-medium">{user.username}</p>
                  <p className="text-xs text-theme-light/60">Level {user.level}</p>
                </div>
              </div>
              <button
                onClick={() => handleAddFriend(user.username)}
                disabled={isAdding === user.username}
                className="p-2 text-theme-accent hover:text-theme-accent/80 hover:bg-theme-accent/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding === user.username ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaUserPlus />
                )}
              </button>
            </div>
          ))}
          {searchResults.length === 0 && searchQuery && !isSearching && (
            <p className="text-theme-light/70 text-center py-4">
              No users found matching "{searchQuery}"
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
} 