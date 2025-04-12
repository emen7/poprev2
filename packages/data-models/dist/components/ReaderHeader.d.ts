/**
 * Reader Header Component
 *
 * This component displays the document header with title, subtitle, and metadata.
 */
import { Document, ReaderConfig } from '../models';
/**
 * Props for the ReaderHeader component
 */
export interface ReaderHeaderProps {
  /**
   * The document to display
   */
  document: Document;
  /**
   * Reader configuration
   */
  config: ReaderConfig;
  /**
   * Additional class name
   */
  className?: string;
}
/**
 * The ReaderHeader component
 */
export declare function ReaderHeader({
  document,
  config,
  className,
}: ReaderHeaderProps): import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=ReaderHeader.d.ts.map
