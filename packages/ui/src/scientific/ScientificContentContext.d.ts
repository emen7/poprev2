import React, { ReactNode } from 'react';
import { TooltipData, TooltipDataRecord } from '../types/TooltipData';
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
declare const ScientificContentContext: React.Context<ScientificContentContextType>;
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
 * @param props The provider props
 * @returns The provider component
 */
export declare function ScientificContentProvider({ initialData, dataUrl, includeExampleData, persistData, children, }: ScientificContentProviderProps): JSX.Element;
/**
 * Hook to use the scientific content context
 * @returns The scientific content context
 */
export declare function useScientificContent(): ScientificContentContextType;
export default ScientificContentContext;
//# sourceMappingURL=ScientificContentContext.d.ts.map