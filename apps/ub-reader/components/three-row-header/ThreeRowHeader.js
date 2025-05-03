/**
 * Three-Row Header Component
 *
 * This component implements the new 3-row fixed header design for the UB Reader.
 * It combines the Title, Paper, and Section rows into a single component.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TitleRow } from './TitleRow';
import { PaperRow } from './PaperRow';
import { DynamicSectionRow } from './SectionRow';
import '../../styles/three-row-header.css';
export const ThreeRowHeader = ({ paper, className = '', onBookMenuToggle, onSectionMenuToggle, onPreviousPaper, onNextPaper, brandingElement, }) => {
    return (_jsxs("header", { className: `three-row-header ${className}`, children: [_jsx(TitleRow, { title: "Urantia Book", onBookMenuToggle: onBookMenuToggle, onSectionMenuToggle: onSectionMenuToggle, onPreviousPaper: onPreviousPaper, onNextPaper: onNextPaper, brandingElement: brandingElement }), _jsx(PaperRow, { paperTitle: `Paper ${paper.number}: ${paper.title}` }), _jsx(DynamicSectionRow, { sectionHeadingSelector: ".section-title", containerSelector: ".reading-area" })] }));
};
//# sourceMappingURL=ThreeRowHeader.js.map