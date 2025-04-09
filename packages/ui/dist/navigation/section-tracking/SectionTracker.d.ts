import React from 'react';
export interface SectionTrackerProps {
    /**
     * The ID of the section
     */
    sectionId: string;
    /**
     * The title of the section
     */
    sectionTitle: string;
    /**
     * The children to render
     */
    children: React.ReactNode;
    /**
     * Whether to show debug information
     * @default false
     */
    debug?: boolean;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * SectionTracker Component
 *
 * A component that tracks when a section is visible in the viewport and
 * updates the navigation state accordingly.
 */
export declare function SectionTracker({ sectionId, sectionTitle, children, debug, className, }: SectionTrackerProps): import("react/jsx-runtime").JSX.Element;
export default SectionTracker;
//# sourceMappingURL=SectionTracker.d.ts.map