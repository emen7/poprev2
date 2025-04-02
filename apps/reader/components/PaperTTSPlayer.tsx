'use client';

import React from 'react';
import WebSpeechAudioPlayer from './WebSpeechAudioPlayer';
import { useReaderSettings } from '../contexts/ReaderSettingsContext';

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
  currentSectionNumber?: number; // Optional: if provided, only that section will be read
}

/**
 * Component for playing TTS audio of paper content
 * This component extracts the text content from the paper, excluding paragraph numbers
 */
export const PaperTTSPlayer: React.FC<PaperTTSPlayerProps> = ({
  paper,
  currentSectionNumber,
}) => {
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
  
  return (
    <div className="paper-tts-player">
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.showParagraphNumbers}
            onChange={toggleParagraphNumbers}
            className="form-checkbox"
          />
          <span>Show paragraph numbers</span>
        </label>
      </div>
      
      <WebSpeechAudioPlayer 
        content={content}
        title={title}
      />
    </div>
  );
};

export default PaperTTSPlayer;