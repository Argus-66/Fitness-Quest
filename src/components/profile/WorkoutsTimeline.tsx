import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Workout {
  date: string;
  name: string;
  duration: number;
  xpGained: number;
}

interface WorkoutsTimelineProps {
  workouts: Workout[];
}

export default function WorkoutsTimeline({ workouts }: WorkoutsTimelineProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Group workouts by month
  const workoutsByMonth = useMemo(() => {
    const grouped = workouts.reduce((acc, workout) => {
      const monthKey = workout.date.substring(0, 7); // YYYY-MM format
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(workout);
      return acc;
    }, {} as Record<string, Workout[]>);

    // Sort workouts within each month by date
    Object.keys(grouped).forEach(month => {
      grouped[month].sort((a, b) => b.date.localeCompare(a.date));
    });

    return grouped;
  }, [workouts]);

  // Get current month's workouts
  const currentMonthKey = selectedDate.toISOString().substring(0, 7);
  const currentMonthWorkouts = workoutsByMonth[currentMonthKey] || [];

  // Navigation functions
  const goToPreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  return (
    <div className="bg-solo-dark/30 backdrop-blur-lg rounded-xl border border-solo-purple/20 p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-solo-light flex items-center gap-2">
          <span>Recent Workouts</span>
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-solo-purple/20 rounded-lg transition-colors"
          >
            <FaChevronLeft className="text-solo-light/70" />
          </button>
          <span className="text-solo-light/90 font-medium">
            {format(selectedDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-solo-purple/20 rounded-lg transition-colors"
          >
            <FaChevronRight className="text-solo-light/70" />
          </button>
        </div>
      </div>

      <div className="min-h-[300px]"> {/* Ensure minimum height */}
        {currentMonthWorkouts.length > 0 ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
            {currentMonthWorkouts.map((workout, index) => (
              <motion.div
                key={`${workout.date}-${workout.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-solo-purple/10 rounded-lg p-4 border border-solo-purple/20"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-solo-light font-medium">{workout.name}</span>
                    <span className="text-solo-light/60 text-sm">
                      {format(parseISO(workout.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-solo-light/60 text-sm">Duration</span>
                      <p className="text-solo-light font-medium">{workout.duration} min</p>
                    </div>
                    <div className="text-right">
                      <span className="text-solo-light/60 text-sm">XP Gained</span>
                      <p className="text-solo-accent font-medium">+{workout.xpGained} XP</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] bg-solo-purple/5 rounded-lg border border-dashed border-solo-purple/20">
            <p className="text-solo-light/60 text-lg mb-2">No workouts recorded for {format(selectedDate, 'MMMM yyyy')}</p>
            <p className="text-solo-light/40 text-sm">Complete a workout to see it here!</p>
          </div>
        )}
      </div>
    </div>
  );
} 