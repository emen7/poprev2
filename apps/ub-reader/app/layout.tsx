import React from 'react';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';
import '../styles/themes/index.css'; // Import theme styles
import Script from 'next/script';

export const metadata = {
  title: 'UB Reader',
  description: 'A modern reader for The Urantia Book',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <UserPreferencesProvider>
          <ThemeProvider>
            <main className="min-h-screen">
              {children}
              {/* Removed PreferencesPanel to fix the blue hovering settings gear issue */}
            </main>
          </ThemeProvider>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
