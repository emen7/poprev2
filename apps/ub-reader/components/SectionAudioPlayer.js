'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import AudioPlayer from './AudioPlayer';
/**
 * Client component wrapper for the AudioPlayer for a specific section
 * This component extracts the text content from the section and passes it to the AudioPlayer
 */
export default function SectionAudioPlayer({ paper, section }) {
    // Extract all text content from the section
    const extractContent = () => {
        let content = `Paper ${paper.number}: ${paper.title}. `;
        if (paper.author) {
            content += `Presented by: ${paper.author}. `;
        }
        content += `Section ${section.number}: ${section.title}. `;
        section.paragraphs.forEach(paragraph => {
            content += `${paragraph.text} `;
        });
        return content;
    };
    const content = extractContent();
    return _jsx(AudioPlayer, { content: content, title: `Listen to Section ${section.number}` });
}
//# sourceMappingURL=SectionAudioPlayer.js.map