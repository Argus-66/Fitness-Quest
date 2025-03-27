import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { themes } from '@/config/themes';

export async function GET(req: Request, { params }: { params: { username: string } }) {
  try {
    await connectDB();
    
    const user = await User.findOne({ username: params.username })
      .select('-password')
      .lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Type assertion and field processing
    const userData = user as Record<string, any>;
    
    const processedUser = {
      ...userData,
      createdAt: userData.createdAt || new Date(),
      bio: userData.bio || '',

      height: userData.height || 0,
      weight: userData.weight || 0,
      age: userData.age || 0,

      stats: userData.stats || { workoutsCompleted: 0, bestStreak: 0 },
      progression: userData.progression || { level: 1, xp: 0, streak: 0 }
    };

    return NextResponse.json(processedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { username: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    
    console.log('Updating user with data:', {
        bio: body.bio,
        age: parseInt(body.age) || 0,
        height: parseInt(body.height) || 0,
        weight: parseInt(body.weight) || 0
    });
    
    const updatedUser = await User.findOneAndUpdate(
      { username: params.username },
      { 
        $set: {
          bio: body.bio,
          age: body.age || 0,
          height: body.height || 0,
          weight: body.weight || 0
        }
      },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await connectDB();

    const data = await request.json();
    const { theme, bio, age, height, weight } = data;

    // Validate theme if it's being updated
    if (theme && !themes.some(t => t.id === theme)) {
      return NextResponse.json(
        { error: 'Invalid theme selection' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (theme) updateData.theme = theme;
    if (bio !== undefined) updateData.bio = bio;
    if (age !== undefined) updateData.age = age;
    if (height !== undefined) updateData.height = height;
    if (weight !== undefined) updateData.weight = weight;

    const updatedUser = await User.findOneAndUpdate(
      { username: params.username },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}