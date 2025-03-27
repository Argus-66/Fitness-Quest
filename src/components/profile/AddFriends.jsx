import React, { useState } from 'react';

export default function AddFriends({ onClose, onFriendAdded }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-theme-gradient rounded-xl border border-theme-primary/30 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-theme">
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
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full px-4 py-2 bg-theme-dark/40 text-theme-light placeholder-theme-light/50 rounded-lg border border-theme-accent/30 focus:border-theme-accent/50 focus:outline-none"
          />
          <button
            className="px-4 py-2 bg-theme-accent/20 hover:bg-theme-accent/30 text-theme-light rounded-lg border border-theme-accent/30"
          >
            Search
          </button>
        </div>

        <p className="text-theme-light/70 text-center py-4">
          No users found
        </p>
      </div>
    </div>
  );
} 