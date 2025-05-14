import React from 'react';
import { ThemeProvider } from '../src/contexts/ThemeContext';

export const withThemeProvider = (Story: React.ComponentType) => (
  <ThemeProvider initialThemeMode="dark" initialTextAlignment="left">
    <div style={{ 
      padding: '1rem', 
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-family-base)',
      minHeight: '100vh'
    }}>
      <Story />
    </div>
  </ThemeProvider>
);
