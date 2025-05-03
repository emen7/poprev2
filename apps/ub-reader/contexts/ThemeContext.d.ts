import { ReactNode } from 'react';
import '../styles/themes/global.css';
export type UITheme = 'light' | 'dark' | 'high-contrast';
export type ContentTheme = 'modern' | 'traditional';
interface ThemeContextType {
    uiTheme: UITheme;
    setUITheme: (theme: UITheme) => void;
    contentTheme: ContentTheme;
    setContentTheme: (theme: ContentTheme) => void;
    toggleUITheme: () => void;
    isThemeTransitioning: boolean;
}
interface ThemeProviderProps {
    children: ReactNode;
    initialUITheme?: UITheme;
    initialContentTheme?: ContentTheme;
}
/**
 * Theme Provider Component
 *
 * This component provides theme context to the application.
 * It manages both UI theme (light/dark) and content theme (modern/traditional).
 * It also handles theme transitions and persistence.
 */
export declare function ThemeProvider({ children, initialUITheme, initialContentTheme, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * useTheme Hook
 *
 * This hook provides access to the theme context.
 */
export declare function useTheme(): ThemeContextType;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map