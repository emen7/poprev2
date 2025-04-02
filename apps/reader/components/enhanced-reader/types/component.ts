/**
 * Enhanced Reader Component Types
 * 
 * This file contains type definitions for the Enhanced Reader components.
 */

import { EnhancedReaderConfig } from './config';

/**
 * Enhanced Reader Props
 */
export interface EnhancedReaderProps {
  /**
   * Title to display in the header
   */
  title: string;
  
  /**
   * Content to display in the main area
   */
  children: React.ReactNode;
  
  /**
   * Initial theme (light or dark)
   */
  initialTheme?: 'light' | 'dark';
  
  /**
   * Initial configuration
   */
  initialConfig?: Partial<EnhancedReaderConfig>;
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Reader Header Props
 */
export interface ReaderHeaderProps {
  /**
   * Title to display in the header
   */
  title: string;
  
  /**
   * Callback when navigation toggle is clicked
   */
  onNavigationToggle: () => void;
  
  /**
   * Callback when settings toggle is clicked
   */
  onSettingsToggle: () => void;
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Navigation Panel Props
 */
export interface NavigationPanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;
  
  /**
   * Callback when the panel is closed
   */
  onClose: () => void;
  
  /**
   * Navigation items to display
   */
  items?: NavigationItem[];
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Navigation Item
 */
export interface NavigationItem {
  /**
   * Unique identifier
   */
  id: string;
  
  /**
   * Display title
   */
  title: string;
  
  /**
   * Optional URL
   */
  url?: string;
  
  /**
   * Child items
   */
  children?: NavigationItem[];
}
/**
 * Settings Panel Props
 */
export interface SettingsPanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;
  
  /**
   * Callback when the panel is closed
   */
  onClose: () => void;
  
  /**
   * Current theme
   */
  theme: 'light' | 'dark';
  
  /**
   * Callback when theme is changed
   */
  onThemeChange: (theme: 'light' | 'dark') => void;
  
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Overlay Props
 */
export interface OverlayProps {
  /**
   * Callback when the overlay is clicked
   */
  onClick: () => void;
  
  /**
   * Additional class name
   */
  className?: string;
}