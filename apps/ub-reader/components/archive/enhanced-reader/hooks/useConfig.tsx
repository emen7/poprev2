/**
 * Configuration Hook
 *
 * This hook provides access to the Enhanced Reader configuration.
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

import { EnhancedReaderConfig, DEFAULT_CONFIG } from '../types';

/**
 * Configuration Context
 */
interface ConfigContextType {
  /**
   * Current configuration
   */
  config: EnhancedReaderConfig;

  /**
   * Update configuration
   */
  updateConfig: (updates: Partial<EnhancedReaderConfig>) => void;

  /**
   * Update typography configuration
   */
  updateTypography: (updates: Partial<EnhancedReaderConfig['typography']>) => void;

  /**
   * Update layout configuration
   */
  updateLayout: (updates: Partial<EnhancedReaderConfig['layout']>) => void;
}

/**
 * Configuration Context
 */
const ConfigContext = createContext<ConfigContextType>({
  config: DEFAULT_CONFIG,
  updateConfig: () => {},
  updateTypography: () => {},
  updateLayout: () => {},
});

/**
 * Configuration Provider Props
 */
interface ConfigProviderProps {
  /**
   * Children
   */
  children: React.ReactNode;

  /**
   * Initial configuration
   */
  initialConfig?: Partial<EnhancedReaderConfig>;
}

/**
 * Configuration Provider
 */
export function ConfigProvider({ children, initialConfig = {} }: ConfigProviderProps) {
  // Merge initial config with default config
  const [config, setConfig] = useState<EnhancedReaderConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  });

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('er-reader-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(prevConfig => ({
          ...prevConfig,
          ...parsedConfig,
        }));
      } catch (e) {
        console.error('Failed to parse saved config', e);
      }
    }
  }, []);

  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('er-reader-config', JSON.stringify(config));
  }, [config]);

  // Update config
  const updateConfig = useCallback((updates: Partial<EnhancedReaderConfig>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...updates,
    }));
  }, []);

  // Update typography config
  const updateTypography = useCallback((updates: Partial<EnhancedReaderConfig['typography']>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      typography: {
        ...prevConfig.typography,
        ...updates,
      },
    }));
  }, []);

  // Update layout config
  const updateLayout = useCallback((updates: Partial<EnhancedReaderConfig['layout']>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      layout: {
        ...prevConfig.layout,
        ...updates,
      },
    }));
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, updateTypography, updateLayout }}>
      {children}
    </ConfigContext.Provider>
  );
}

/**
 * Use Configuration Hook
 */
export function useConfig() {
  return useContext(ConfigContext);
}
