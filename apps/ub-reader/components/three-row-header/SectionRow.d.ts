/**
 * Section Row Component (Row 3)
 *
 * This is the third row of the 3-row header design.
 * It dynamically displays the current section title as the user scrolls,
 * showing "(intro)" when no section is visible.
 */
import React from 'react';
import { SectionRowProps } from './types';
import './SectionRow.css';
/**
 * SectionRow that automatically observes sections and updates
 */
export declare const DynamicSectionRow: React.FC<{
    sectionHeadingSelector?: string;
    containerSelector?: string;
}>;
/**
 * Static SectionRow that receives current section as prop
 */
export declare const SectionRow: React.FC<SectionRowProps>;
//# sourceMappingURL=SectionRow.d.ts.map