import React from 'react';

import { ThemeProvider } from '../contexts/ThemeContext';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import { HighlightProvider } from '../components/HighlightProvider';

import '../styles/globals.css';
import '../styles/global.css'; // Import our new global CSS
import '../styles/themes/index.css'; // Import theme styles
import '../styles/highlighting/highlighting.css'; // Import highlighting styles

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
        {/* Restore the original providers for backward compatibility */}
        <UserPreferencesProvider>
          <ThemeProvider>
            <HighlightProvider containerSelector=".ub-paper">
              <main className="min-h-screen">{children}</main>
            </HighlightProvider>
          </ThemeProvider>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
