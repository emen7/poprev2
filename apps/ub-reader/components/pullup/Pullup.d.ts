import './Pullup.css';
export interface PullupProps {
    /**
     * The minimum height of the pullup panel
     * @default 100
     */
    minHeight?: number;
    /**
     * The maximum height of the pullup panel
     * @default 600
     */
    maxHeight?: number;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * Pullup Component
 *
 * A component that combines all pullup components into a single component.
 * Uses PullupContext for state management instead of props.
 */
export declare function Pullup({ minHeight, maxHeight, className }: PullupProps): import("react/jsx-runtime").JSX.Element;
export default Pullup;
//# sourceMappingURL=Pullup.d.ts.map