'use client';

import React from &apos;react';

import { HighlightProvider } from '../components/HighlightProvider';
import { WebVitalsReporter } from '../components/WebVitalsReporter';
import { ThemeProvider } from '../contexts/ThemeContext';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';

// Import only the essential styles
import '../styles/globals.css';

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
            </HighlightProvider>
          </ThemeProvider>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
