/**
 * Tests for the theme system
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '../components/ThemeProvider';
import { useTheme } from '../hooks/useTheme';
import { lightTheme, darkTheme, traditionalTheme } from '../themes';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Test component that uses the theme
const ThemedComponent: React.FC = () => {
  const { theme, themeObject } = useTheme();

  return (
    <div
      data-testid="themed-component"
      style={{
        color: themeObject.colors.text,
        backgroundColor: themeObject.colors.background,
        padding: themeObject.spacing.md,
        fontFamily: themeObject.typography.fontFamily,
      }}
    >
      Current theme: {theme}
    </div>
  );
};

describe('Theme System', () => {
  it('should provide theme context to components', () => {
    render(
      <ThemeProvider initialTheme="light">
        <ThemedComponent />
      </ThemeProvider>
    );

    const themedComponent = screen.getByTestId('themed-component');
    expect(themedComponent).toHaveTextContent('Current theme: light');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider initialTheme="light">
        <ThemedComponent />
      </ThemeProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should provide different themes', () => {
    // Light theme
    expect(lightTheme.name).toBe('light');
    expect(lightTheme.colors.background).toBe('#ffffff');

    // Dark theme
    expect(darkTheme.name).toBe('dark');
    expect(darkTheme.colors.background).toBe('#121212');

    // Traditional theme
    expect(traditionalTheme.name).toBe('traditional');
    expect(traditionalTheme.colors.background).toBe('#f5f5dc');
  });
});
