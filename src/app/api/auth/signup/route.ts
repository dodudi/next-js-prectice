import { NextRequest, NextResponse } from 'next/server';
import { createUser, sanitizeUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, confirmPassword } = body;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: 'Passwords do not match' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create user
        const user = createUser(name, email, password);

        // Return user without password
        const safeUser = sanitizeUser(user);

        return NextResponse.json(
            {
                success: true,
                message: 'User created successfully',
                user: safeUser
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Signup error:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred during signup' },
            { status: 500 }
        );
    }
}
