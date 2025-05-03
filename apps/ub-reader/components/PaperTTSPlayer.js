'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useReaderSettings } from '../contexts/ReaderSettingsContext';
import WebSpeechAudioPlayer from './WebSpeechAudioPlayer';
/**
 * Component for playing TTS audio of paper content
 * This component extracts the text content from the paper, excluding paragraph numbers
 */
export const PaperTTSPlayer = ({ paper, currentSectionNumber }) => {
    const { settings, toggleParagraphNumbers } = useReaderSettings();
    // Extract content for TTS, excluding paragraph numbers
    const extractContentForTTS = () => {
        let content = `Paper ${paper.number}: ${paper.title}. `;
        if (paper.author) {
            content += `Presented by: ${paper.author}. `;
        }
        // If a specific section is requested, only include that section
        const sectionsToInclude = currentSectionNumber
            ? paper.sections.filter(section => section.number === currentSectionNumber)
            : paper.sections;
        sectionsToInclude.forEach(section => {
            content += `Section ${section.number}: ${section.title}. `;
            // Add paragraphs WITHOUT their numbers
            section.paragraphs.forEach(paragraph => {
                content += `${paragraph.text} `;
            });
        });
        return content;
    };
    const content = extractContentForTTS();
    const title = currentSectionNumber
        ? `Listen to Section ${currentSectionNumber}`
        : `Listen to Paper ${paper.number}`;
    return (_jsxs("div", { className: "paper-tts-player", children: [_jsx("div", { className: "mb-4", children: _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", checked: settings.showParagraphNumbers, onChange: toggleParagraphNumbers, className: "form-checkbox" }), _jsx("span", { children: "Show paragraph numbers" })] }) }), _jsx(WebSpeechAudioPlayer, { content: content, title: title })] }));
};
export default PaperTTSPlayer;
//# sourceMappingURL=PaperTTSPlayer.js.map