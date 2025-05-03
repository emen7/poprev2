'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ReaderSettingsProvider } from '../contexts/ReaderSettingsContext';
import PaperTTSPlayer from './PaperTTSPlayer';
/**
 * Wrapper component that provides the ReaderSettingsProvider context for PaperTTSPlayer
 */
export default function PaperTTSPlayerWrapper({ paper, currentSectionNumber, }) {
    return (_jsx(ReaderSettingsProvider, { children: _jsx(PaperTTSPlayer, { paper: paper, currentSectionNumber: currentSectionNumber }) }));
}
//# sourceMappingURL=PaperTTSPlayerWrapper.js.map