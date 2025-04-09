/**
 * Reader Content Component
 *
 * This component displays the document content with proper formatting.
 */
import { Document, ReaderConfig } from '../models';
/**
 * Props for the ReaderContent component
 */
export interface ReaderContentProps {
    /**
     * The document to display
     */
    document: Document;
    /**
     * Reader configuration
     */
    config: ReaderConfig;
    /**
     * Currently active section ID
     */
    activeSection: string | null;
    /**
     * Callback when a section is selected
     */
    onSectionSelect: (sectionId: string) => void;
    /**
     * Additional class name
     */
    className?: string;
}
/**
 * The ReaderContent component
 */
export declare function ReaderContent({ document, config, activeSection, onSectionSelect, className }: ReaderContentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReaderContent.d.ts.map