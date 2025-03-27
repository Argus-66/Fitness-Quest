import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

// GET /api/users/[username]/workouts
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await connectDB();
    const { username } = params;
    
    // Get user by username
    const user = await User.findOne({ username });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Return the user's workouts
    return NextResponse.json({ 
      workouts: user.recentWorkouts || [] 
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}

// POST /api/users/[username]/workouts
export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await connectDB();
    const user = await User.findOne({ username: params.username });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { date, name, duration, xpGained } = body;

    // Check if there's already a workout of the same type for this date
    const existingWorkout = user.recentWorkouts.find(
      (workout: any) => workout.date === date && workout.name === name
    );

    if (existingWorkout) {
      return NextResponse.json(
        { error: 'A workout of this type already exists for this date' },
        { status: 400 }
      );
    }

    // Create new workout
    const newWorkout = {
      date,
      name,
      duration,
      xpGained
    };

    // Add to recent workouts and keep only the most recent ones
    user.recentWorkouts = [newWorkout, ...user.recentWorkouts].slice(0, 30); // Keep last 30 workouts

    // Update user's XP
    user.progression.xp += xpGained;

    // Check for level up
    const newLevel = Math.floor(Math.sqrt(user.progression.xp / 100)) + 1;
    if (newLevel > user.progression.level) {
      user.progression.level = newLevel;
    }

    await user.save();

    return NextResponse.json({
      message: 'Workout recorded successfully',
      workout: newWorkout
    });
  } catch (error) {
    console.error('Error recording workout:', error);
    return NextResponse.json(
      { error: 'Failed to record workout' },
      { status: 500 }
    );
  }
} 