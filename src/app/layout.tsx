import "./globals.css";
import React from "react";
import {Metadata} from "next";
import SessionProvider from "@/components/session-provider";

export const metadata: Metadata = {
    title: "Rudy",
    description: "Welcome to Rudy's App",
    icons: {
        icon: '/icon',
        apple: '/apple-icon',
    },
}

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <SessionProvider>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
