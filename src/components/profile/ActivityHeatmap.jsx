import React from 'react';

export default function ActivityHeatmap({ workouts }) {
  return (
    <div className="bg-theme-dark/40 backdrop-blur-lg rounded-lg border border-theme-primary/30 p-4">
      <h3 className="text-theme-light text-lg font-medium mb-4">Workout Activity</h3>
      <div className="p-4 bg-theme-dark/60 rounded-lg border border-theme-primary/20">
        <p className="text-theme-light/80 text-center py-4">
          {workouts?.length 
            ? `You have logged ${workouts.length} workouts`
            : "No workout data available yet"}
        </p>
      </div>
    </div>
  );
} 