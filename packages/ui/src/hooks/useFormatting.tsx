import { useState, useEffect, useCallback } from 'react';

export type FormatType = 'traditional' | 'modern';

export interface UseFormattingOptions {
  /**
   * Default format type
   * @default 'traditional'
   */
  defaultFormat?: FormatType;

  /**
   * Storage key for persisting format preference
   * @default 'ub-reader-format'
   */
  storageKey?: string;

  /**
   * Whether to persist format preference in localStorage
   * @default true
   */
  persistPreference?: boolean;
}

export interface UseFormattingResult {
  /**
   * Current format type
   */
  formatType: FormatType;

  /**
   * Function to change the format type
   */
  setFormatType: (format: FormatType) => void;

  /**
   * Function to toggle between traditional and modern formats
   */
  toggleFormat: () => void;

  /**
   * Whether the current format is traditional
   */
  isTraditional: boolean;

  /**
   * Whether the current format is modern
   */
  isModern: boolean;
}

/**
 * useFormatting Hook
 *
 * A hook for managing content formatting preferences.
 * Supports persistence in localStorage and provides convenient helpers.
 */
export function useFormatting({
  defaultFormat = 'traditional',
  storageKey = 'ub-reader-format',
  persistPreference = true,
}: UseFormattingOptions = {}): UseFormattingResult {
  // Initialize state from localStorage if available
  const [formatType, setFormatTypeState] = useState<FormatType>(() => {
    if (persistPreference && typeof window !== 'undefined') {
      const savedFormat = localStorage.getItem(storageKey);
      if (savedFormat === 'traditional' || savedFormat === 'modern') {
        return savedFormat;
      }
    }
    return defaultFormat;
  });

  // Update localStorage when format changes
  useEffect(() => {
    if (persistPreference && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, formatType);
    }
  }, [formatType, persistPreference, storageKey]);

  // Set format type
  const setFormatType = useCallback((format: FormatType) => {
    setFormatTypeState(format);
  }, []);

  // Toggle between traditional and modern
  const toggleFormat = useCallback(() => {
    setFormatTypeState(current => (current === 'traditional' ? 'modern' : 'traditional'));
  }, []);

  // Convenience boolean flags
  const isTraditional = formatType === 'traditional';
  const isModern = formatType === 'modern';

  return {
    formatType,
    setFormatType,
    toggleFormat,
    isTraditional,
    isModern,
  };
}

export default useFormatting;
