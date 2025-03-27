import { FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { User } from '@/types/user';
import Avatar from '@/components/common/Avatar';
import { format } from 'date-fns';

interface UserHeaderProps {
  user: User;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onLogout?: () => void;
  isOwnProfile: boolean;
}

export default function UserHeader({ 
  user, 
  isEditing, 
  setIsEditing, 
  onLogout, 
  isOwnProfile 
}: UserHeaderProps) {
  // Format joined date
  const formatJoinedDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return format(new Date(dateString), 'MM/dd/yyyy');
    } catch (error) {
      return 'Unknown';
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between bg-theme-gradient rounded-xl border border-theme-primary/30 shadow-theme p-6">
      <div className="flex items-center gap-6">
        <Avatar 
          username={user.username} 
          size="lg" 
        />
        
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-theme-light mb-1">{user.username}</h1>
          <p className="text-theme-light/70 mb-1">Member since {formatJoinedDate(user.createdAt)}</p>
          
          <div className="flex flex-wrap gap-4 mt-2">
            {user.age > 0 && (
              <div className="text-sm text-theme-light/80">
                <span className="font-medium">Age:</span> {user.age}
              </div>
            )}
            {user.height > 0 && (
              <div className="text-sm text-theme-light/80">
                <span className="font-medium">Height:</span> {user.height}cm
              </div>
            )}
            {user.weight > 0 && (
              <div className="text-sm text-theme-light/80">
                <span className="font-medium">Weight:</span> {user.weight}kg
              </div>
            )}
          </div>
          
          {user.bio && (
            <p className="text-theme-light/90 mt-2 max-w-md">{user.bio}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex gap-2">
        {isOwnProfile && (
          <>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-1 px-4 py-2 bg-theme-primary/20 hover:bg-theme-primary/30 text-theme-light rounded-lg border border-theme-primary/30 transition-colors"
            >
              <FaEdit className="mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
} 