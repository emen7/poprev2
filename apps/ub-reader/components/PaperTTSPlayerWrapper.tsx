'use client';

import React from &apos;react';

import { ReaderSettingsProvider } from '../contexts/ReaderSettingsContext';

import PaperTTSPlayer from './PaperTTSPlayer';

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
export default function PaperTTSPlayerWrapper({
  paper,
  currentSectionNumber,
}: PaperTTSPlayerWrapperProps) {
  return (
    <ReaderSettingsProvider>
      <PaperTTSPlayer paper={paper} currentSectionNumber={currentSectionNumber} />
    </ReaderSettingsProvider>
  );
}
