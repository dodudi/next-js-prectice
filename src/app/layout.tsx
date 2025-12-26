import "./globals.css";
import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Rudy's Portal",
    description: "Personal Dashboard for Daily Life",
    icons: {
        icon: '/icon',
        apple: '/apple-icon',
    },
}

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
            {children}
        </body>
        </html>
    );
}
