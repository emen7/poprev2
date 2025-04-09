export interface HamburgerButtonProps {
    /**
     * Whether the button is for book navigation (large) or section navigation (small)
     */
    variant: 'book' | 'section';
    /**
     * Whether the navigation panel is open
     */
    isOpen: boolean;
    /**
     * Function to call when the button is clicked
     */
    onClick: () => void;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * HamburgerButton Component
 *
 * A button that toggles between hamburger and X icons for navigation menus.
 */
export declare function HamburgerButton({ variant, isOpen, onClick, className, }: HamburgerButtonProps): import("react/jsx-runtime").JSX.Element;
export default HamburgerButton;
//# sourceMappingURL=HamburgerButton.d.ts.map