/**
 * Document Reader Component
 *
 * This component displays a transformed document with proper formatting and navigation.
 * It renders the document content as HTML with appropriate styling and provides
 * a table of contents for easy navigation.
 *
 * @module document-reader/document-reader
 */
import { TransformedDocument } from '@ub-ecosystem/content-transformer';
import './document-reader.css';
/**
 * Props for the DocumentReader component
 *
 * @interface DocumentReaderProps
 * @description Props for the document reader component
 * @property {TransformedDocument} document - The transformed document to display
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
interface DocumentReaderProps {
    /**
     * The transformed document to display
     */
    document: TransformedDocument;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * DocumentReader Component
 *
 * @description A component that displays a transformed document with proper formatting and navigation.
 * It renders the document content as HTML with appropriate styling and provides
 * a table of contents for easy navigation.
 *
 * @example
 * ```tsx
 * <DocumentReader
 *   document={transformedDocument}
 *   className="custom-reader"
 * />
 * ```
 */
export declare function DocumentReader({ document, className }: DocumentReaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=document-reader.d.ts.map