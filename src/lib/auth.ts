// Simple in-memory user store (replace with database in production)
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

// Mock database
const users: User[] = [];

export function createUser(name: string, email: string, password: string): User {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const user: User = {
        id: generateId(),
        name,
        email,
        password, // In production, hash this with bcrypt
        createdAt: new Date()
    };

    users.push(user);
    return user;
}

export function findUserByEmail(email: string): User | undefined {
    return users.find(u => u.email === email);
}

export function validatePassword(user: User, password: string): boolean {
    // In production, use bcrypt.compare()
    return user.password === password;
}

export function sanitizeUser(user: User): Omit<User, 'password'> {
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
}

function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
