import React from 'react';
import { HighlightContextValue, HighlightProviderProps } from '../types';
/**
 * Provider component for the highlighting system
 */
export declare const HighlightProvider: React.FC<HighlightProviderProps>;
/**
 * Hook to access the highlighting functionality
 */
export declare const useHighlight: () => HighlightContextValue;
