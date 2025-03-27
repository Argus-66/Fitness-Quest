import React from 'react';

export default function UserHeader({ user, isEditing, setIsEditing, onLogout, isOwnProfile }) {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between bg-theme-gradient rounded-xl border border-theme-primary/30 shadow-theme p-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-theme-light mb-1">{user.username || 'User'}</h1>
        <p className="text-theme-light/70 mb-1">Member since {user.createdAt || 'Unknown'}</p>
      </div>
      
      <div className="mt-4 md:mt-0 flex gap-2">
        {isOwnProfile && (
          <>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 bg-theme-primary/20 hover:bg-theme-primary/30 text-theme-light rounded-lg border border-theme-primary/30 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-colors"
              >
                Logout
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
} 