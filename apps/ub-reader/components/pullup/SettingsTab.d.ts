import { ReaderSettings } from './types';
import './SettingsTab.css';
export interface SettingsTabProps {
    /**
     * The current reader settings
     */
    settings: ReaderSettings;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * SettingsTab Component
 *
 * A tab for adjusting reader settings.
 * Uses PullupContext for state management.
 *
 * Note: We removed the onSettingsChange prop to fix Next.js serialization errors.
 * The component now uses the context directly for settings updates.
 */
export declare function SettingsTab({ settings, className }: SettingsTabProps): import("react/jsx-runtime").JSX.Element;
export default SettingsTab;
//# sourceMappingURL=SettingsTab.d.ts.map