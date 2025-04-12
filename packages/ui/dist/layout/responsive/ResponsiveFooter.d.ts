import React from 'react';
import './ResponsiveFooter.css';
export interface ResponsiveFooterProps {
  /**
   * The content to be rendered in the footer
   */
  children: React.ReactNode;
  /**
   * Whether to auto-hide the footer on scroll (mobile only)
   * @default true
   */
  autoHide?: boolean;
  /**
   * Threshold in pixels for when to start hiding the footer
   * @default 50
   */
  scrollThreshold?: number;
  /**
   * Additional CSS class name
   */
  className?: string;
}
/**
 * ResponsiveFooter Component
 *
 * A footer component that adapts to different screen sizes:
 * - On mobile: Can auto-hide when scrolling down and reappear when scrolling up or tapping
 * - On desktop: Remains fixed at the bottom of the viewport
 */
export declare function ResponsiveFooter({
  children,
  autoHide,
  scrollThreshold,
  className,
}: ResponsiveFooterProps): import('react/jsx-runtime').JSX.Element;
export default ResponsiveFooter;
//# sourceMappingURL=ResponsiveFooter.d.ts.map
