import './FormatToggle.css';
export interface FormatToggleProps {
  /**
   * Current format type
   */
  currentFormat: 'traditional' | 'modern';
  /**
   * Function called when the format is changed
   */
  onChange: (format: 'traditional' | 'modern') => void;
  /**
   * Whether to show descriptions for each format
   * @default false
   */
  showDescription?: boolean;
  /**
   * Whether to show a preview of each format
   * @default false
   */
  showPreview?: boolean;
  /**
   * Label for the traditional format option
   * @default 'Traditional'
   */
  traditionalLabel?: string;
  /**
   * Label for the modern format option
   * @default 'Modern'
   */
  modernLabel?: string;
  /**
   * Description for the traditional format
   */
  traditionalDescription?: string;
  /**
   * Description for the modern format
   */
  modernDescription?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}
/**
 * FormatToggle Component
 *
 * A component that allows switching between traditional and modern formatting.
 * Supports descriptions and visual previews of each format.
 */
export declare function FormatToggle({
  currentFormat,
  onChange,
  showDescription,
  showPreview,
  traditionalLabel,
  modernLabel,
  traditionalDescription,
  modernDescription,
  className,
}: FormatToggleProps): import('react/jsx-runtime').JSX.Element;
export default FormatToggle;
//# sourceMappingURL=FormatToggle.d.ts.map
