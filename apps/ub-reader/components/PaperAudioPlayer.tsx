'use client';

import React from 'react';
import AudioPlayer from './AudioPlayer';

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
export default function PaperAudioPlayer({ paper }: PaperAudioPlayerProps) {
  // Extract all text content from the paper
  const extractContent = () => {
    let content = `Paper ${paper.number}: ${paper.title}. `;
    
    if (paper.author) {
      content += `Presented by: ${paper.author}. `;
    }
    
    paper.sections.forEach(section => {
      content += `Section ${section.number}: ${section.title}. `;
      
      section.paragraphs.forEach(paragraph => {
        content += `${paragraph.text} `;
      });
    });
    
    return content;
  };
  
  const content = extractContent();
  
  return (
    <AudioPlayer 
      content={content}
      title={`Listen to Paper ${paper.number}`}
    />
  );
}