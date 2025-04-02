'use client';

import React from 'react';
import AudioPlayer from './AudioPlayer';

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
export default function SectionAudioPlayer({ paper, section }: SectionAudioPlayerProps) {
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
  
  return (
    <AudioPlayer 
      content={content}
      title={`Listen to Section ${section.number}`}
    />
  );
}