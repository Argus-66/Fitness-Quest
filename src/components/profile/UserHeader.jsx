import React from 'react';
import Image from 'next/image';

const UserHeader = ({ user }) => {
  if (!user) {
    // Loading or error state
    return (
      <div className="animate-pulse bg-theme-dark p-6 rounded-lg shadow-theme">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-theme-primary/50"></div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="h-7 bg-theme-primary/50 rounded w-1/3"></div>
            <div className="h-4 bg-theme-primary/30 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-dark/50 backdrop-blur-md p-6 rounded-lg shadow-theme border border-theme-primary/20">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* User avatar */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-accent to-theme-primary p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-theme-dark">
              {user.avatarUrl ? (
                <Image 
                  src={user.avatarUrl} 
                  alt={user.username} 
                  width={96} 
                  height={96} 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-theme-light">
                  {user.username ? user.username[0].toUpperCase() : '?'}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* User info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-theme-light mb-1">
            {user.username}
          </h1>
          
          <p className="text-theme-light/70 text-sm mb-3">
            Joined {new Date(user.joinedDate || Date.now()).toLocaleDateString()}
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 bg-theme-primary/20 rounded-full text-xs text-theme-light border border-theme-primary/30">
              Level {user.progression?.level || 1}
            </span>
            
            {user.details?.fitnessLevel && (
              <span className="px-3 py-1 bg-theme-primary/20 rounded-full text-xs text-theme-light border border-theme-primary/30 capitalize">
                {user.details.fitnessLevel}
              </span>
            )}
            
            {user.details?.fitnessGoals?.length > 0 && (
              <span className="px-3 py-1 bg-theme-primary/20 rounded-full text-xs text-theme-light border border-theme-primary/30">
                {user.details.fitnessGoals[0]}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {user.bio && (
        <div className="mt-4 text-theme-light/90 text-sm border-t border-theme-primary/20 pt-4">
          {user.bio}
        </div>
      )}
    </div>
  );
};

export default UserHeader; 