import { TooltipData } from '../types/TooltipData';
import './ScientificTooltip.css';
export interface ScientificTooltipProps {
    /**
     * The content to display (the term that will be wrapped with the tooltip)
     */
    content: string;
    /**
     * The tooltip data
     */
    data: TooltipData;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Whether to show the tooltip on hover (desktop) or click (mobile)
     * @default true
     */
    interactive?: boolean;
    /**
     * Tooltip position
     * @default 'top'
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}
/**
 * ScientificTooltip Component
 *
 * A tooltip component for scientific content that displays
 * additional information about abbreviations, equations, and technical terms.
 */
export declare function ScientificTooltip({ content, data, className, interactive, position, }: ScientificTooltipProps): import("react/jsx-runtime").JSX.Element;
export default ScientificTooltip;
//# sourceMappingURL=ScientificTooltip.d.ts.map