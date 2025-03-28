import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaDumbbell,
  FaTrophy,
  FaUser,
} from 'react-icons/fa';
import { getCurrentUser } from '@/lib/auth.js';

const BottomNav = ({ className = '' }) => {
  const pathname = usePathname();
  const [username, setUsername] = React.useState(null);

  React.useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUsername(user.username);
      }
    };

    getUser();
  }, []);

  const navItems = [
    {
      label: 'Home',
      href: '/dashboard',
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      label: 'Workouts',
      href: '/workouts',
      icon: <FaDumbbell className="w-5 h-5" />,
    },
    {
      label: 'Achievements',
      href: '/achievements',
      icon: <FaTrophy className="w-5 h-5" />,
    },
    {
      label: 'Profile',
      href: username ? `/${username}` : '#',
      icon: <FaUser className="w-5 h-5" />,
      disabled: !username,
    },
  ];

  return (
    <nav className={`bg-theme-dark/80 backdrop-blur-lg border-t border-theme-primary/20 py-2 ${className}`}>
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.disabled ? '#' : item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                  isActive
                    ? 'text-theme-accent'
                    : 'text-theme-light/70 hover:text-theme-light'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="mb-1">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav; 