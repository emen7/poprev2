import React from 'react';
import '../styles/themes/index.css';
interface ThemeEnabledReaderProps {
    title: string;
    children: React.ReactNode;
    initialUITheme?: 'light' | 'dark';
    initialContentTheme?: 'modern' | 'traditional';
    className?: string;
}
/**
 * Theme-Enabled Reader Component
 *
 * This component wraps content with the ThemeProvider and provides
 * a header with navigation and settings toggles, as well as a settings panel
 * that includes UI theme and content formatting theme options.
 */
export declare function ThemeEnabledReader({ title, children, initialUITheme, initialContentTheme, className, }: ThemeEnabledReaderProps): import("react/jsx-runtime").JSX.Element;
export default ThemeEnabledReader;
//# sourceMappingURL=ThemeEnabledReader.d.ts.map