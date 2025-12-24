import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail, validatePassword } from "@/lib/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = findUserByEmail(credentials.email as string);

                if (!user) {
                    return null;
                }

                const isValid = validatePassword(user, credentials.password as string);

                if (!isValid) {
                    return null;
                }

                // Return user object (password will be excluded)
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            // Public routes
            const publicRoutes = ['/login', '/signup', '/api/auth/signup'];
            const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

            // Allow public routes and auth routes
            if (isPublicRoute || pathname.startsWith('/api/auth')) {
                return true;
            }

            // Redirect to login if not authenticated
            if (!isLoggedIn) {
                return false; // Will redirect to signIn page
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
});
