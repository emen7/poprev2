export interface ThreeRowHeaderProps {
  /**
   * The title of the current paper
   */
  paperTitle: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}
/**
 * ThreeRowHeader Component
 *
 * A header component with three rows:
 * 1. Top row: Main title and navigation buttons
 * 2. Paper row: Current paper title
 * 3. Section row: Dynamic section title that updates based on scroll position
 */
export declare function ThreeRowHeader({
  paperTitle,
  className,
}: ThreeRowHeaderProps): import('react/jsx-runtime').JSX.Element;
export default ThreeRowHeader;
//# sourceMappingURL=ThreeRowHeader.d.ts.map
