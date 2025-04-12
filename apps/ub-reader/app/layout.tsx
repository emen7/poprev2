import React from 'react';

import { ThemeProvider } from '../contexts/ThemeContext';
import { ExtendedUserPreferencesProvider } from '../contexts/ExtendedUserPreferencesContext';
import { EnhancedHighlightProvider } from '../components/EnhancedHighlightProvider';

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
        {/* We're not using the providers here because each page will use its own providers */}
        {/* This allows us to have different configurations for different pages */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
