/**
 * Theme system types for the UB Ecosystem
 */

/**
 * Theme type
 */
export type ThemeType = 'light' | 'dark' | 'traditional' | string;

/**
 * Theme interface
 */
export interface Theme {
  /**
   * Theme name
   */
  name: ThemeType;

  /**
   * Theme colors
   */
  colors: ThemeColors;

  /**
   * Theme typography
   */
  typography: ThemeTypography;

  /**
   * Theme spacing
   */
  spacing: ThemeSpacing;

  /**
   * Theme breakpoints
   */
  breakpoints: ThemeBreakpoints;

  /**
   * Theme transitions
   */
  transitions: ThemeTransitions;

  /**
   * Theme shadows
   */
  shadows: ThemeShadows;

  /**
   * Theme border radius
   */
  borderRadius: ThemeBorderRadius;
}

/**
 * Theme colors interface
 */
export interface ThemeColors {
  /**
   * Primary color
   */
  primary: string;

  /**
   * Secondary color
   */
  secondary: string;

  /**
   * Background color
   */
  background: string;

  /**
   * Surface color
   */
  surface: string;

  /**
   * Text color
   */
  text: string;

  /**
   * Accent color
   */
  accent: string;

  /**
   * Error color
   */
  error: string;

  /**
   * Warning color
   */
  warning: string;

  /**
   * Success color
   */
  success: string;

  /**
   * Info color
   */
  info: string;

  /**
   * Disabled color
   */
  disabled: string;

  /**
   * Border color
   */
  border: string;

  /**
   * Divider color
   */
  divider: string;

  /**
   * Highlight colors
   */
  highlight: {
    /**
     * Default highlight color
     */
    default: string;

    /**
     * Yellow highlight color
     */
    yellow: string;

    /**
     * Green highlight color
     */
    green: string;

    /**
     * Blue highlight color
     */
    blue: string;

    /**
     * Pink highlight color
     */
    pink: string;
  };
}

/**
 * Theme typography interface
 */
export interface ThemeTypography {
  /**
   * Font family
   */
  fontFamily: string;

  /**
   * Font sizes
   */
  fontSize: {
    /**
     * Extra small font size
     */
    xs: string;

    /**
     * Small font size
     */
    sm: string;

    /**
     * Medium font size
     */
    md: string;

    /**
     * Large font size
     */
    lg: string;

    /**
     * Extra large font size
     */
    xl: string;

    /**
     * Extra extra large font size
     */
    xxl: string;
  };

  /**
   * Font weights
   */
  fontWeight: {
    /**
     * Light font weight
     */
    light: number;

    /**
     * Regular font weight
     */
    regular: number;

    /**
     * Medium font weight
     */
    medium: number;

    /**
     * Bold font weight
     */
    bold: number;
  };

  /**
   * Line heights
   */
  lineHeight: {
    /**
     * Small line height
     */
    sm: number;

    /**
     * Medium line height
     */
    md: number;

    /**
     * Large line height
     */
    lg: number;
  };
}

/**
 * Theme spacing interface
 */
export interface ThemeSpacing {
  /**
   * Extra small spacing
   */
  xs: string;

  /**
   * Small spacing
   */
  sm: string;

  /**
   * Medium spacing
   */
  md: string;

  /**
   * Large spacing
   */
  lg: string;

  /**
   * Extra large spacing
   */
  xl: string;

  /**
   * Extra extra large spacing
   */
  xxl: string;
}

/**
 * Theme breakpoints interface
 */
export interface ThemeBreakpoints {
  /**
   * Small breakpoint
   */
  sm: string;

  /**
   * Medium breakpoint
   */
  md: string;

  /**
   * Large breakpoint
   */
  lg: string;

  /**
   * Extra large breakpoint
   */
  xl: string;
}

/**
 * Theme transitions interface
 */
export interface ThemeTransitions {
  /**
   * Short transition
   */
  short: string;

  /**
   * Medium transition
   */
  medium: string;

  /**
   * Long transition
   */
  long: string;
}

/**
 * Theme shadows interface
 */
export interface ThemeShadows {
  /**
   * Small shadow
   */
  sm: string;

  /**
   * Medium shadow
   */
  md: string;

  /**
   * Large shadow
   */
  lg: string;
}

/**
 * Theme border radius interface
 */
export interface ThemeBorderRadius {
  /**
   * Small border radius
   */
  sm: string;

  /**
   * Medium border radius
   */
  md: string;

  /**
   * Large border radius
   */
  lg: string;

  /**
   * Pill border radius
   */
  pill: string;

  /**
   * Circle border radius
   */
  circle: string;
}

/**
 * Theme context interface
 */
export interface ThemeContext {
  /**
   * Current theme
   */
  theme: ThemeType;

  /**
   * Current theme object
   */
  themeObject: Theme;

  /**
   * Set theme
   */
  setTheme: (theme: ThemeType) => void;

  /**
   * Toggle between light and dark themes
   */
  toggleTheme: () => void;
}

/**
 * Theme provider props interface
 */
export interface ThemeProviderProps {
  /**
   * Initial theme
   */
  initialTheme?: ThemeType;

  /**
   * Children
   */
  children: React.ReactNode;
}
