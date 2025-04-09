/**
 * Reader Settings Component
 *
 * This component displays a settings panel for customizing the reader experience,
 * including theme, typography, and layout options.
 */
import { ReaderConfig } from '../models';
import './ReaderSettings.css';
/**
 * Props for the ReaderSettings component
 */
export interface ReaderSettingsProps {
    /**
     * Reader configuration
     */
    config: ReaderConfig;
    /**
     * Callback when configuration changes
     */
    onConfigChange: (config: Partial<ReaderConfig>) => void;
    /**
     * Additional class name
     */
    className?: string;
    /**
     * Callback when the settings panel is opened
     */
    onSettingsOpen?: () => void;
    /**
     * Callback when the settings panel is closed
     */
    onSettingsClose?: () => void;
    /**
     * Whether the settings panel is initially open
     */
    initiallyOpen?: boolean;
}
/**
 * The ReaderSettings component
 */
export declare function ReaderSettings({ config, onConfigChange, className, onSettingsOpen, onSettingsClose, initiallyOpen }: ReaderSettingsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReaderSettings.d.ts.map