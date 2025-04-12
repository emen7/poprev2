import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { TooltipData, TooltipDataRecord, exampleTooltipData } from '../types/TooltipData';

/**
 * Context interface for scientific content
 */
interface ScientificContentContextType {
  /**
   * The tooltip data record
   */
  tooltipData: TooltipDataRecord;

  /**
   * Register new tooltip data
   */
  registerTooltipData: (term: string, data: TooltipData) => void;

  /**
   * Register multiple tooltip data entries
   */
  registerTooltipDataBatch: (dataRecord: TooltipDataRecord) => void;

  /**
   * Get tooltip data for a term
   */
  getTooltipData: (term: string) => TooltipData | undefined;

  /**
   * Clear all tooltip data
   */
  clearTooltipData: () => void;

  /**
   * Load tooltip data from a URL
   */
  loadTooltipDataFromUrl: (url: string) => Promise<void>;
}

/**
 * Create the context with default values
 */
const ScientificContentContext = createContext<ScientificContentContextType>({
  tooltipData: {},
  registerTooltipData: () => {},
  registerTooltipDataBatch: () => {},
  getTooltipData: () => undefined,
  clearTooltipData: () => {},
  loadTooltipDataFromUrl: async () => {},
});

/**
 * Props for the ScientificContentProvider
 */
interface ScientificContentProviderProps {
  /**
   * Initial tooltip data
   */
  initialData?: TooltipDataRecord;

  /**
   * URL to load tooltip data from
   */
  dataUrl?: string;

  /**
   * Whether to include example data
   * @default false
   */
  includeExampleData?: boolean;

  /**
   * Whether to persist tooltip data in localStorage
   * @default true
   */
  persistData?: boolean;

  /**
   * Children components
   */
  children: ReactNode;
}

/**
 * Provider component for scientific content context
 */
export function ScientificContentProvider({
  initialData = {},
  dataUrl,
  includeExampleData = false,
  persistData = true,
  children,
}: ScientificContentProviderProps) {
  // Initialize state with initial data and optionally example data
  const [tooltipData, setTooltipData] = useState<TooltipDataRecord>(() => {
    // Try to load from localStorage if persistData is true
    if (persistData) {
      try {
        const storedData = localStorage.getItem('scientific-tooltip-data');
        if (storedData) {
          return JSON.parse(storedData);
        }
      } catch (error) {
        console.error('Error loading tooltip data from localStorage:', error);
      }
    }

    // Otherwise use initial data and optionally example data
    return {
      ...initialData,
      ...(includeExampleData ? exampleTooltipData : {}),
    };
  });

  // Persist tooltip data to localStorage when it changes
  useEffect(() => {
    if (persistData) {
      try {
        localStorage.setItem('scientific-tooltip-data', JSON.stringify(tooltipData));
      } catch (error) {
        console.error('Error saving tooltip data to localStorage:', error);
      }
    }
  }, [tooltipData, persistData]);

  // Load tooltip data from URL if provided
  useEffect(() => {
    if (dataUrl) {
      loadTooltipDataFromUrl(dataUrl);
    }
  }, [dataUrl]);

  /**
   * Register new tooltip data
   */
  const registerTooltipData = (term: string, data: TooltipData) => {
    setTooltipData(prevData => ({
      ...prevData,
      [term]: data,
    }));
  };

  /**
   * Register multiple tooltip data entries
   */
  const registerTooltipDataBatch = (dataRecord: TooltipDataRecord) => {
    setTooltipData(prevData => ({
      ...prevData,
      ...dataRecord,
    }));
  };

  /**
   * Get tooltip data for a term
   */
  const getTooltipData = (term: string) => {
    return tooltipData[term];
  };

  /**
   * Clear all tooltip data
   */
  const clearTooltipData = () => {
    setTooltipData({});
  };

  /**
   * Load tooltip data from a URL
   */
  const loadTooltipDataFromUrl = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load tooltip data: ${response.statusText}`);
      }

      const data = await response.json();
      registerTooltipDataBatch(data);
    } catch (error) {
      console.error('Error loading tooltip data from URL:', error);
    }
  };

  // Create the context value
  const contextValue: ScientificContentContextType = {
    tooltipData,
    registerTooltipData,
    registerTooltipDataBatch,
    getTooltipData,
    clearTooltipData,
    loadTooltipDataFromUrl,
  };

  return (
    <ScientificContentContext.Provider value={contextValue}>
      {children}
    </ScientificContentContext.Provider>
  );
}

/**
 * Hook to use the scientific content context
 */
export function useScientificContent() {
  const context = useContext(ScientificContentContext);

  if (!context) {
    throw new Error('useScientificContent must be used within a ScientificContentProvider');
  }

  return context;
}

export default ScientificContentContext;
