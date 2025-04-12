import { useState, useEffect, useCallback } from 'react';
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
} = {}) {
  // Initialize state from localStorage if available
  const [formatType, setFormatTypeState] = useState(() => {
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
  const setFormatType = useCallback(format => {
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
//# sourceMappingURL=useFormatting.js.map
