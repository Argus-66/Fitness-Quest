import { motion } from 'framer-motion';
import { FaChartLine, FaFire, FaDumbbell } from 'react-icons/fa';
import type { User } from '@/types/user';

interface StatsGridProps {
  user: User;
}

export default function StatsGrid({ user }: StatsGridProps) {
  const stats = [
    { title: 'Level', value: user?.progression?.level || 1, icon: FaChartLine, color: 'from-green-500' },
    { title: 'Current Streak', value: `${user?.progression?.streak || 0} days`, icon: FaFire, color: 'from-red-500' },
    { title: 'Workouts', value: user?.stats?.workoutsCompleted || 0, icon: FaDumbbell, color: 'from-blue-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-solo-dark/40 backdrop-blur-lg rounded-xl border border-solo-purple/30 p-4 shadow-glow-sm hover:shadow-glow transition-all duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} to-transparent/20 shadow-glow`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-solo-light/70 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 