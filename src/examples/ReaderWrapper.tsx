/**
 * Reader Wrapper Component
 * 
 * This component wraps our Reader component with the necessary context providers.
 */

'use client';

import React from 'react';
import { ReaderSettingsProvider } from '../../apps/reader/contexts/ReaderSettingsContext';

interface ReaderWrapperProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * Wrapper component that provides all necessary contexts for the Reader
 */
export function ReaderWrapper({ children }: ReaderWrapperProps) {
  return (
    <ReaderSettingsProvider>
      {children}
    </ReaderSettingsProvider>
  );
}