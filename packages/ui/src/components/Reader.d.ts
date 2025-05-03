/**
 * Core Reader Component
 *
 * This is the main Reader component that renders a document with configurable extensions.
 */
import React from 'react';
import { Document, ReaderConfig } from '../models';
import './Reader.css';
/**
 * Props for the Reader component
 */
export interface ReaderProps {
    /**
     * The document to display, either in our Document format or the legacy TransformedDocument format
     */
    document: Document | any;
    /**
     * Configuration for the Reader
     */
    config?: Partial<ReaderConfig>;
    /**
     * Additional class name
     */
    className?: string;
    /**
     * Additional style
     */
    style?: React.CSSProperties;
}
/**
 * The core Reader component
 */
export declare function Reader({ document, config, className, style }: ReaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Reader.d.ts.map