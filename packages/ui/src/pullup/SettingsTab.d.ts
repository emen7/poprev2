import React from 'react';
import './SettingsTab.css';
export interface ReaderSettings {
    /**
     * The font size for the reader
     */
    fontSize: number;
    /**
     * The line height for the reader
     */
    lineHeight: number;
    /**
     * The font family for the reader
     */
    fontFamily: string;
    /**
     * The theme for the reader
     */
    theme: 'light' | 'dark' | 'sepia';
    /**
     * Whether to show paragraph numbers
     */
    showParagraphNumbers: boolean;
    /**
     * Whether to show note indicators
     */
    showNoteIndicators?: boolean;
    /**
     * The formatting type for paragraphs
     */
    formatType: 'traditional' | 'modern';
    /**
     * The text alignment for paragraphs
     * @default 'left'
     */
    textAlignment?: 'left' | 'right' | 'justified';
}
export interface SettingsTabProps {
    /**
     * The current reader settings
     */
    settings: ReaderSettings;
    /**
     * Function called when settings are changed
     */
    onSettingsChange: (settings: Partial<ReaderSettings>) => void;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * SettingsTab Component
 *
 * A tab for configuring reader settings in the pullup panel.
 */
export declare const SettingsTab: React.FC<SettingsTabProps>;
export default SettingsTab;
//# sourceMappingURL=SettingsTab.d.ts.map