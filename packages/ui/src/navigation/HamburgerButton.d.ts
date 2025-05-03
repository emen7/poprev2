import './HamburgerButton.css';
export interface HamburgerButtonProps {
    /**
     * Function called when the button is clicked
     */
    onClick: () => void;
    /**
     * Whether the menu is currently open
     * @default false
     */
    isOpen?: boolean;
    /**
     * Accessible label for the button
     * @default 'Toggle menu'
     */
    ariaLabel?: string;
    /**
     * Color variant of the button
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'tertiary';
    /**
     * Size of the button
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * HamburgerButton Component
 *
 * A button that displays a hamburger icon for toggling navigation menus.
 * Supports different sizes, variants, and open/closed states.
 */
export declare function HamburgerButton({ onClick, isOpen, ariaLabel, variant, size, className, }: HamburgerButtonProps): import("react/jsx-runtime").JSX.Element;
export default HamburgerButton;
//# sourceMappingURL=HamburgerButton.d.ts.map