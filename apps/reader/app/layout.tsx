import React from 'react';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import PreferencesPanel from '../components/PreferencesPanel';
import '../styles/globals.css';

export const metadata = {
  title: 'UB Reader',
  description: 'A modern reader for The Urantia Book',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserPreferencesProvider>
          <main className="min-h-screen">
            {children}
            <PreferencesPanel />
          </main>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}