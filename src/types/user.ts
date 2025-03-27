export interface User {
  _id: string;  // Changed from id to _id to match MongoDB
  username: string;
  email: string;
  password?: string;
  bio?: string;
  age?: number;
  height?: number;
  weight?: number;
  level: number;
  xp: number;
  streak: number;
  theme: string;
  coins: number;
  progression: {
    level: number;
    xp: number;
    streak: number;
  };
  stats: {
    workoutsCompleted: number;
    bestStreak: number;
  };
  skills: {
    strength: number;
    agility: number;
    endurance: number;
  };
  friends?: Array<{
    username: string;
    level: number;
  }>;
  recentWorkouts: Array<{
    date: string;
    name: string;
    duration: number;
    xpGained: number;
  }>;
  achievements?: Array<{  // Made optional with ?
    title: string;
    description: string;
    dateEarned: string;
  }>;
  activityFeed?: Array<{
    date: string;
    description: string;
  }>;
  workouts: Array<{
    _id: string;
    date: string;
    name: string;
    duration: number;
    xpGained: number;
    exercises: Array<{
      name: string;
      sets: number;
      reps: number;
      weight: number;
    }>;
    completed: boolean;
  }>;
  badges: any[];  // Added this from your console output
  cardsOwned: any[];  // Added this from your console output
  __v: number;  // Added this from your console output
  createdAt: string;
  updatedAt: string;
}