import { ReactNode } from 'react';
export interface HeaderRowProps {
    /**
     * The row type (top, paper, section)
     */
    rowType: 'top' | 'paper' | 'section';
    /**
     * The content to display on the left side of the row
     */
    leftContent?: ReactNode;
    /**
     * The content to display in the center of the row
     */
    centerContent?: ReactNode;
    /**
     * The content to display on the right side of the row
     */
    rightContent?: ReactNode;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * HeaderRow Component
 *
 * A flexible row component for the three-row header system.
 */
export declare function HeaderRow({ rowType, leftContent, centerContent, rightContent, className, }: HeaderRowProps): import("react/jsx-runtime").JSX.Element;
export default HeaderRow;
//# sourceMappingURL=HeaderRow.d.ts.map