/**
 * Section Observer Hook
 *
 * This custom hook uses the Intersection Observer API to track which section
 * is currently visible in the viewport. It updates the current section information
 * as the user scrolls, showing "(intro)" when no section is visible.
 */
interface SectionObserverOptions {
    /**
     * CSS selector for section headings
     */
    sectionHeadingSelector?: string;
    /**
     * CSS selector for the container element
     */
    containerSelector?: string;
    /**
     * Additional offset to adjust the detection point (in pixels)
     */
    additionalOffset?: number;
}
/**
 * Custom hook that tracks the currently visible section using Intersection Observer
 */
export declare function useSectionObserver({ sectionHeadingSelector, containerSelector, // Changed from .reading-area to .content
additionalOffset, }?: SectionObserverOptions): {
    currentSection: string;
    isIntroVisible: boolean;
};
export {};
//# sourceMappingURL=useSectionObserver.d.ts.map