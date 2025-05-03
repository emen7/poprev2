'use client';

import React from 'react';

import { ThemeProvider } from '../contexts/ThemeContext';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import { HighlightProvider } from '../components/HighlightProvider';
import { DebugHelper } from '../components/debug/DebugHelper';
import { WebVitalsReporter } from '../components/WebVitalsReporter';

import '../styles/globals.css';
import '../styles/global.css'; // Import our new global CSS
import '../styles/header-variables.css'; // Import header variables first
import '../styles/themes/global.css'; // Import our centralized theme variables
import '../styles/theme-transitions.css'; // Import theme transition styles
import '../styles/themes/index.css'; // Import theme styles
import '../styles/highlighting/highlighting.css'; // Import highlighting styles
import '../styles/three-row-header.css'; // Import 3-row header styles
import '../styles/fixed-width-layout.css'; // Import fixed-width layout styles
import '../styles/desktop-pullup.css'; // Import desktop pullup styles

/**
 * Client component for the root layout
 * This handles all client-side functionality
 */
export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#222222" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Providers for theme, preferences, and highlighting */}
        <UserPreferencesProvider>
          <ThemeProvider>
            <HighlightProvider containerSelector=".ub-paper">
              <main className="min-h-screen">{children}</main>
              <WebVitalsReporter />
              <DebugHelper />
            </HighlightProvider>
          </ThemeProvider>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
