'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import '../styles/themes/global.css';
const ThemeContext = createContext(undefined);
/**
 * Theme Provider Component
 *
 * This component provides theme context to the application.
 * It manages both UI theme (light/dark) and content theme (modern/traditional).
 * It also handles theme transitions and persistence.
 */
export function ThemeProvider({ children, initialUITheme = 'light', initialContentTheme = 'traditional', }) {
    // Try to load theme from localStorage
    const getSavedTheme = () => {
        if (typeof window === 'undefined')
            return initialUITheme;
        const savedTheme = localStorage.getItem('ub-reader-ui-theme');
        if (savedTheme &&
            (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'high-contrast')) {
            return savedTheme;
        }
        return initialUITheme;
    };
    const [uiTheme, setUITheme] = useState(getSavedTheme());
    const [contentTheme, setContentTheme] = useState(initialContentTheme);
    const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
    // Toggle between light and dark themes
    const toggleUITheme = () => {
        setUITheme(prevTheme => {
            if (prevTheme === 'light')
                return 'dark';
            if (prevTheme === 'dark')
                return 'light';
            return 'light'; // Default fallback
        });
    };
    // Handle theme change with transition
    const handleThemeChange = (newTheme) => {
        setIsThemeTransitioning(true);
        setUITheme(newTheme);
        // Save theme preference to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('ub-reader-ui-theme', newTheme);
        }
        // Reset transition state after animation completes
        setTimeout(() => {
            setIsThemeTransitioning(false);
        }, 300); // Match this with CSS transition duration
    };
    // Apply theme class to body and handle theme changes
    useEffect(() => {
        // Remove all theme classes
        document.body.classList.remove('light-theme', 'dark-theme', 'high-contrast-theme');
        // Add current theme class
        document.body.classList.add(`${uiTheme}-theme`);
        // Add transition class if transitioning
        if (isThemeTransitioning) {
            document.body.classList.add('theme-transitioning');
        }
        else {
            document.body.classList.remove('theme-transitioning');
        }
    }, [uiTheme, isThemeTransitioning]);
    // Override setUITheme to include transition
    const setUIThemeWithTransition = (theme) => {
        handleThemeChange(theme);
    };
    return (_jsx(ThemeContext.Provider, { value: {
            uiTheme,
            setUITheme: setUIThemeWithTransition,
            contentTheme,
            setContentTheme,
            toggleUITheme,
            isThemeTransitioning,
        }, children: children }));
}
/**
 * useTheme Hook
 *
 * This hook provides access to the theme context.
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
//# sourceMappingURL=ThemeContext.js.map