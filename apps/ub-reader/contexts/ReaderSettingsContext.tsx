'use client';

import type { ReactNode } from &apos;react';
import React, { createContext, useContext, useState } from &apos;react';

interface ReaderSettings {
  showParagraphNumbers: boolean;
}

interface ReaderSettingsContextType {
  settings: ReaderSettings;
  toggleParagraphNumbers: () => void;
}

const defaultSettings: ReaderSettings = {
  showParagraphNumbers: true,
};

const ReaderSettingsContext = createContext<ReaderSettingsContextType | undefined>(undefined);

export function useReaderSettings() {
  const context = useContext(ReaderSettingsContext);
  if (context === undefined) {
    throw new Error('useReaderSettings must be used within a ReaderSettingsProvider');
  }
  return context;
}

interface ReaderSettingsProviderProps {
  children: ReactNode;
}

export function ReaderSettingsProvider({ children }: ReaderSettingsProviderProps) {
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings);

  const toggleParagraphNumbers = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      showParagraphNumbers: !prevSettings.showParagraphNumbers,
    }));
  };

  const value = {
    settings,
    toggleParagraphNumbers,
  };

  return <ReaderSettingsContext.Provider value={value}>{children}</ReaderSettingsContext.Provider>;
}
