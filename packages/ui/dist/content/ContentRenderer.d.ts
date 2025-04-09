import { Section } from './SectionRenderer';
import './ContentRenderer.css';
export interface DocumentContent {
    /**
     * Unique identifier for the document
     */
    id: string;
    /**
     * Document title
     */
    title: string;
    /**
     * Document sections
     */
    sections: Section[];
}
export interface ContentRendererProps {
    /**
     * The document content to render
     */
    content: DocumentContent;
    /**
     * The formatting type to use
     */
    formatType: 'traditional' | 'modern';
    /**
     * Whether to show paragraph numbers
     * @default true
     */
    showParagraphNumbers?: boolean;
    /**
     * IDs of sections to highlight
     */
    highlightedSections?: string[];
    /**
     * IDs of paragraphs to highlight
     */
    highlightedParagraphs?: string[];
    /**
     * Function called when a section becomes visible
     */
    onSectionVisible?: (sectionId: string) => void;
    /**
     * Function called when a paragraph becomes visible
     */
    onParagraphVisible?: (paragraphId: string) => void;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * ContentRenderer Component
 *
 * A component that renders document content with support for:
 * - Traditional and Modern formatting
 * - Paragraph numbering
 * - Section and paragraph highlighting
 * - Visibility tracking
 */
export declare function ContentRenderer({ content, formatType, showParagraphNumbers, highlightedSections, highlightedParagraphs, onSectionVisible, onParagraphVisible, className, }: ContentRendererProps): import("react/jsx-runtime").JSX.Element;
export default ContentRenderer;
//# sourceMappingURL=ContentRenderer.d.ts.map