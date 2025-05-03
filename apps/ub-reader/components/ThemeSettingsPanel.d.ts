import '../styles/themes/global.css';
import '../styles/theme-transitions.css';
interface ThemeSettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    inline?: boolean;
}
/**
 * Enhanced Settings Panel Component with UI and Content Theme options
 */
export declare function ThemeSettingsPanel({ isOpen, onClose, className, inline, }: ThemeSettingsPanelProps): import("react/jsx-runtime").JSX.Element;
export default ThemeSettingsPanel;
//# sourceMappingURL=ThemeSettingsPanel.d.ts.map