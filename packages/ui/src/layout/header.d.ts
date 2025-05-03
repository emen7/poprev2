import { ReactNode } from 'react';
import './Header.css';
export interface HeaderProps {
    /**
     * Left section content (typically navigation controls)
     */
    leftContent?: ReactNode;
    /**
     * Center section content (typically title)
     */
    centerContent?: ReactNode;
    /**
     * Right section content (typically actions/settings)
     */
    rightContent?: ReactNode;
    /**
     * Whether the header is fixed at the top
     * @default true
     */
    fixed?: boolean;
    /**
     * Whether to show a border at the bottom of the header
     * @default true
     */
    showBorder?: boolean;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Whether to make the header transparent when scrolled to top
     * @default false
     */
    transparentOnTop?: boolean;
    /**
     * Whether to show a shadow under the header
     * @default true
     */
    showShadow?: boolean;
}
/**
 * Header Component
 *
 * A flexible header component with three content sections (left, center, right).
 * Supports fixed positioning, border, and transparency options.
 */
export declare function Header({ leftContent, centerContent, rightContent, fixed, showBorder, className, transparentOnTop, showShadow, }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export default Header;
//# sourceMappingURL=header.d.ts.map