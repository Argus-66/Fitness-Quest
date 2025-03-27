interface AvatarProps {
  username: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-20 h-20 text-3xl'
};

export default function Avatar({ username, size = 'md' }: AvatarProps) {
  return (
    <div 
      className={`${sizeClasses[size]} rounded-full bg-theme-gradient flex items-center justify-center shadow-theme`}
    >
      <span className="font-bold text-theme-light">
        {username[0].toUpperCase()}
      </span>
    </div>
  );
} 