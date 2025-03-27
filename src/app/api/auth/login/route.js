import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Update last login date
    user.lastLogin = new Date();
    await user.save();

    // Create session or token if needed
    // For this example, we'll just return the user data without password
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      joinedDate: user.joinedDate,
      theme: user.theme
    };

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
} 