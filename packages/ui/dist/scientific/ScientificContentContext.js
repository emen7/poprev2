import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { exampleTooltipData } from '../types/TooltipData';
/**
 * Create the context with default values
 */
const ScientificContentContext = createContext({
    tooltipData: {},
    registerTooltipData: () => { },
    registerTooltipDataBatch: () => { },
    getTooltipData: () => undefined,
    clearTooltipData: () => { },
    loadTooltipDataFromUrl: async () => { },
});
/**
 * Provider component for scientific content context
 */
export function ScientificContentProvider({ initialData = {}, dataUrl, includeExampleData = false, persistData = true, children, }) {
    // Initialize state with initial data and optionally example data
    const [tooltipData, setTooltipData] = useState(() => {
        // Try to load from localStorage if persistData is true
        if (persistData) {
            try {
                const storedData = localStorage.getItem('scientific-tooltip-data');
                if (storedData) {
                    return JSON.parse(storedData);
                }
            }
            catch (error) {
                console.error('Error loading tooltip data from localStorage:', error);
            }
        }
        // Otherwise use initial data and optionally example data
        return Object.assign(Object.assign({}, initialData), (includeExampleData ? exampleTooltipData : {}));
    });
    // Persist tooltip data to localStorage when it changes
    useEffect(() => {
        if (persistData) {
            try {
                localStorage.setItem('scientific-tooltip-data', JSON.stringify(tooltipData));
            }
            catch (error) {
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
    const registerTooltipData = (term, data) => {
        setTooltipData(prevData => (Object.assign(Object.assign({}, prevData), { [term]: data })));
    };
    /**
     * Register multiple tooltip data entries
     */
    const registerTooltipDataBatch = (dataRecord) => {
        setTooltipData(prevData => (Object.assign(Object.assign({}, prevData), dataRecord)));
    };
    /**
     * Get tooltip data for a term
     */
    const getTooltipData = (term) => {
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
    const loadTooltipDataFromUrl = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load tooltip data: ${response.statusText}`);
            }
            const data = await response.json();
            registerTooltipDataBatch(data);
        }
        catch (error) {
            console.error('Error loading tooltip data from URL:', error);
        }
    };
    // Create the context value
    const contextValue = {
        tooltipData,
        registerTooltipData,
        registerTooltipDataBatch,
        getTooltipData,
        clearTooltipData,
        loadTooltipDataFromUrl,
    };
    return (_jsx(ScientificContentContext.Provider, { value: contextValue, children: children }));
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
//# sourceMappingURL=ScientificContentContext.js.map