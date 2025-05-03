interface PaperTTSPlayerWrapperProps {
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
 * Wrapper component that provides the ReaderSettingsProvider context for PaperTTSPlayer
 */
export default function PaperTTSPlayerWrapper({ paper, currentSectionNumber, }: PaperTTSPlayerWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaperTTSPlayerWrapper.d.ts.map