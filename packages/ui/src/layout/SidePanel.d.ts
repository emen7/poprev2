import { ReactNode } from 'react';
import './SidePanel.css';
export interface SidePanelProps {
    /**
     * The content to be rendered in the side panel
     */
    children: ReactNode;
    /**
     * Whether the side panel is open
     */
    isOpen: boolean;
    /**
     * Function to call when the side panel should be closed
     */
    onClose: () => void;
    /**
     * The position of the side panel
     * @default 'left'
     */
    position?: 'left' | 'right';
    /**
     * The width of the side panel
     * @default '300px'
     */
    width?: string;
    /**
     * Whether to show an overlay behind the side panel
     * @default true
     */
    showOverlay?: boolean;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Whether to close the panel when clicking outside
     * @default true
     */
    closeOnClickOutside?: boolean;
}
/**
 * SidePanel Component
 *
 * A sliding panel that can be positioned on the left or right side of the screen.
 * Includes overlay and click-outside behavior.
 */
export declare function SidePanel({ children, isOpen, onClose, position, width, showOverlay, className, closeOnClickOutside, }: SidePanelProps): import("react/jsx-runtime").JSX.Element;
export default SidePanel;
//# sourceMappingURL=SidePanel.d.ts.map