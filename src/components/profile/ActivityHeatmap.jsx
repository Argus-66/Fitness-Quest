import React from 'react';

const ActivityHeatmap = ({ workouts = [] }) => {
  // Generate fake data for the heatmap if no workouts
  const generateHeatmapData = () => {
    const days = 90; // Last 3 months
    const data = [];
    
    const today = new Date();
    const intensityOptions = [0, 0, 0, 1, 1, 2, 3]; // More zeros to have more empty days
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const randomIntensity = workouts.length > 0 
        ? 0 // If we have workouts, don't generate random data
        : intensityOptions[Math.floor(Math.random() * intensityOptions.length)];
      
      const existingWorkout = workouts.find(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate.toDateString() === date.toDateString();
      });
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: existingWorkout ? existingWorkout.intensity || 2 : randomIntensity
      });
    }
    
    return data.reverse(); // Most recent last
  };
  
  const heatmapData = generateHeatmapData();
  
  // Group by week for display
  const weeks = [];
  let week = [];
  
  heatmapData.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0 || index === heatmapData.length - 1) {
      weeks.push(week);
      week = [];
    }
  });
  
  // Color mapping
  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 1: return 'bg-theme-primary/30';
      case 2: return 'bg-theme-primary/60';
      case 3: return 'bg-theme-accent';
      default: return 'bg-theme-dark/60';
    }
  };
  
  return (
    <div className="bg-theme-dark/50 backdrop-blur-md p-6 rounded-lg shadow-theme border border-theme-primary/20">
      <h2 className="text-lg font-bold text-theme-light mb-4">Activity</h2>
      
      <div className="overflow-auto">
        <div className="grid grid-flow-col gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="grid grid-flow-row gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`day-${day.date}`}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(day.value)} hover:ring-1 hover:ring-theme-light/50`}
                  title={`${day.date}: ${day.value ? 'Active' : 'No activity'}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-4 text-xs text-theme-light/70">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-theme-dark/60"></div>
          <span>None</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-theme-primary/30"></div>
          <span>Light</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-theme-primary/60"></div>
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-theme-accent"></div>
          <span>Intense</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap; 