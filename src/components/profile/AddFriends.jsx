import React, { useState } from 'react';

const AddFriends = ({ onAddFriend }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a username to search');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Mocked search results for now
      // In a real app, you'd fetch from an API
      setTimeout(() => {
        const mockResults = [
          { 
            id: '1', 
            username: 'fitness_guru', 
            level: 42,
            avatarUrl: null
          },
          { 
            id: '2', 
            username: 'workout_king', 
            level: 27,
            avatarUrl: null
          },
          { 
            id: '3', 
            username: 'gym_enthusiast', 
            level: 15,
            avatarUrl: null
          }
        ].filter(user => 
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setResults(mockResults);
        setLoading(false);
        
        if (mockResults.length === 0) {
          setError('No users found matching your search');
        }
      }, 1000);
    } catch (err) {
      setError('Failed to search for users');
      setLoading(false);
    }
  };

  const handleAddFriend = (userId) => {
    if (onAddFriend) {
      onAddFriend(userId);
      
      // Remove from results to show it was added
      setResults(prev => prev.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="bg-theme-dark/50 backdrop-blur-md p-6 rounded-lg shadow-theme border border-theme-primary/20">
      <h2 className="text-lg font-bold text-theme-light mb-4">Find Friends</h2>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by username"
            className="flex-1 px-4 py-2 bg-theme-primary/20 border border-theme-light/10 rounded-lg 
              text-white placeholder-theme-light/50 focus:outline-none focus:border-theme-light/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-theme-accent hover:bg-theme-primary text-white rounded-lg
              transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}
      
      {results.length > 0 && (
        <div className="space-y-3">
          {results.map(user => (
            <div 
              key={user.id}
              className="flex items-center justify-between p-3 border border-theme-primary/20 rounded-lg bg-theme-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-theme-primary/40 flex items-center justify-center text-theme-light font-bold">
                  {user.username[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-theme-light">{user.username}</p>
                  <p className="text-xs text-theme-light/70">Level {user.level}</p>
                </div>
              </div>
              <button
                onClick={() => handleAddFriend(user.id)}
                className="px-3 py-1 text-sm bg-theme-accent/80 hover:bg-theme-accent text-white rounded-lg"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && results.length === 0 && (
        <p className="text-theme-light/70 text-center py-4">
          Search for users to add as friends
        </p>
      )}
    </div>
  );
};

export default AddFriends; 