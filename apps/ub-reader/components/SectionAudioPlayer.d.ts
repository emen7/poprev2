interface SectionAudioPlayerProps {
    paper: {
        number: number;
        title: string;
        author?: string;
    };
    section: {
        number: number;
        title: string;
        paragraphs: {
            number: number;
            text: string;
        }[];
    };
}
/**
 * Client component wrapper for the AudioPlayer for a specific section
 * This component extracts the text content from the section and passes it to the AudioPlayer
 */
export default function SectionAudioPlayer({ paper, section }: SectionAudioPlayerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SectionAudioPlayer.d.ts.map