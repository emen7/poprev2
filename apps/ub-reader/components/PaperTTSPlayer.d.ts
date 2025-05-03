import React from 'react';
interface PaperTTSPlayerProps {
    paper: {
        number: number;
        title: string;
        author?: string;
        sections: {
            number: number;
            title: string;
            paragraphs: {
                number: number;
                text: string;
            }[];
        }[];
    };
    currentSectionNumber?: number;
}
/**
 * Component for playing TTS audio of paper content
 * This component extracts the text content from the paper, excluding paragraph numbers
 */
export declare const PaperTTSPlayer: React.FC<PaperTTSPlayerProps>;
export default PaperTTSPlayer;
//# sourceMappingURL=PaperTTSPlayer.d.ts.map