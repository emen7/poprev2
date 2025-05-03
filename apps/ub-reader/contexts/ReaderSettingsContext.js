'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const defaultSettings = {
    showParagraphNumbers: true,
};
const ReaderSettingsContext = createContext(undefined);
export function useReaderSettings() {
    const context = useContext(ReaderSettingsContext);
    if (context === undefined) {
        throw new Error('useReaderSettings must be used within a ReaderSettingsProvider');
    }
    return context;
}
export function ReaderSettingsProvider({ children }) {
    const [settings, setSettings] = useState(defaultSettings);
    const toggleParagraphNumbers = () => {
        setSettings(prevSettings => (Object.assign(Object.assign({}, prevSettings), { showParagraphNumbers: !prevSettings.showParagraphNumbers })));
    };
    const value = {
        settings,
        toggleParagraphNumbers,
    };
    return _jsx(ReaderSettingsContext.Provider, { value: value, children: children });
}
//# sourceMappingURL=ReaderSettingsContext.js.map