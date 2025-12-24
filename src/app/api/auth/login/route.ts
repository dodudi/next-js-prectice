import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, validatePassword, sanitizeUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user
        const user = findUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Validate password
        const isValidPassword = validatePassword(user, password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Return user without password
        const safeUser = sanitizeUser(user);

        return NextResponse.json(
            {
                success: true,
                message: 'Login successful',
                user: safeUser
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Login error:', error);

        return NextResponse.json(
            { error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
