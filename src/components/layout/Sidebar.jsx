import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaDumbbell,
  FaTrophy,
  FaUser,
  FaChartLine,
  FaCog,
} from 'react-icons/fa';
import { getCurrentUser } from '@/lib/auth';

const Sidebar = ({ className = '' }) => {
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
      label: 'Dashboard',
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
      label: 'Stats',
      href: '/stats',
      icon: <FaChartLine className="w-5 h-5" />,
    },
    {
      label: 'Profile',
      href: username ? `/${username}` : '#',
      icon: <FaUser className="w-5 h-5" />,
      disabled: !username,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <FaCog className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`w-64 bg-theme-dark/80 backdrop-blur-md flex flex-col border-r border-theme-primary/20 ${className}`}
    >
      <div className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center justify-center mb-8 pt-2"
        >
          <h1 className="text-2xl font-bold text-theme-light bg-gradient-to-r from-theme-accent to-theme-primary text-transparent bg-clip-text">
            Fitness Quest
          </h1>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.disabled ? '#' : item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-theme-primary/30 text-theme-light'
                    : 'text-theme-light/70 hover:bg-theme-primary/20 hover:text-theme-light'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-theme-accent"></span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-theme-primary/20">
        <div className="text-theme-light/50 text-sm text-center">
          <p>Fitness Quest v1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 