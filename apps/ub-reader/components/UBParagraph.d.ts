import React from 'react';
interface UBParagraphProps {
    paragraph: {
        number: number;
        text: string;
    };
    isTopicChange?: boolean;
    className?: string;
    currentPaper?: number;
}
/**
 * Component for displaying a UB paragraph with optional paragraph numbers
 * Supports both Modern and Traditional formatting themes
 * Includes automatic reference detection and linking
 */
export declare const UBParagraph: React.FC<UBParagraphProps>;
export default UBParagraph;
//# sourceMappingURL=UBParagraph.d.ts.map