interface PaperAudioPlayerProps {
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
}
/**
 * Client component wrapper for the AudioPlayer
 * This component extracts the text content from the paper and passes it to the AudioPlayer
 */
export default function PaperAudioPlayer({ paper }: PaperAudioPlayerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaperAudioPlayer.d.ts.map