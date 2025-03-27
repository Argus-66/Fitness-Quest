import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { themes } from '@/config/themes';

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    // Get username from URL params
    const { username } = params;

    // Skip authentication for demo/development purposes
    // In production, implement proper token verification here

    // First check if the user exists in the database
    await connectDB();
    const dbUser = await User.findOne({ username });
    
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { theme } = await request.json();
    if (!theme) {
      return NextResponse.json({ error: 'Theme is required' }, { status: 400 });
    }

    // Validate theme
    if (!themes.some(t => t.id === theme)) {
      return NextResponse.json({ error: 'Invalid theme' }, { status: 400 });
    }
    
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { theme } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user theme' }, { status: 500 });
    }

    // Return the updated user
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    );
  }
} 