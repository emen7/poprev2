/**
 * Core Reader Component
 *
 * This is the main Reader component that renders a document with configurable extensions.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { createConfig } from '../models';
import { DocumentAdapter, globalExtensionRegistry } from '../utils';
import './Reader.css';
import { ReaderHeader } from './ReaderHeader';
import { ReaderContent } from './ReaderContent';
import { ReaderNavigation } from './ReaderNavigation';
import { ReaderSettings } from './ReaderSettings';
/**
 * The core Reader component
 */
export function Reader({ document, config = {}, className = '', style = {} }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Merge the provided config with the default config
    const mergedConfig = createConfig(config);
    // Convert the document to our format if needed
    const [internalDocument, setInternalDocument] = useState(null);
    // Active section state
    const [activeSection, setActiveSection] = useState(null);
    // Settings state
    const [readerConfig, setReaderConfig] = useState(mergedConfig);
    // Navigation and settings panel state
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    // Update reader config when props change
    useEffect(() => {
        setReaderConfig(mergedConfig);
    }, [mergedConfig]);
    // Initialize extensions
    useEffect(() => {
        if (readerConfig.extensions.length > 0) {
            globalExtensionRegistry.initializeExtensions(readerConfig.extensionConfig || {});
        }
    }, [readerConfig.extensions, readerConfig.extensionConfig]);
    // Convert document to internal format
    useEffect(() => {
        // Check if the document is already in our format
        if (document && 'id' in document && 'sections' in document) {
            setInternalDocument(document);
        }
        // Otherwise, convert from TransformedDocument
        else if (document && 'content' in document && 'metadata' in document) {
            const convertedDocument = DocumentAdapter.fromTransformedDocument(document);
            setInternalDocument(convertedDocument);
        }
        // Reset active section when document changes
        setActiveSection(null);
    }, [document]);
    // If no document is available yet, show a loading state
    if (!internalDocument) {
        return (_jsx("div", { className: `reader-container ${className}`, style: style, children: _jsx("div", { className: "reader-loading", children: "Loading document..." }) }));
    }
    // Handle config changes
    const handleConfigChange = (newConfig) => {
        setReaderConfig(Object.assign(Object.assign({}, readerConfig), newConfig));
    };
    // Handle navigation panel open/close
    const handleNavigationOpen = () => {
        setIsNavigationOpen(true);
        setIsSettingsOpen(false);
    };
    const handleNavigationClose = () => {
        setIsNavigationOpen(false);
    };
    // Handle settings panel open/close
    const handleSettingsOpen = () => {
        setIsSettingsOpen(true);
        setIsNavigationOpen(false);
    };
    const handleSettingsClose = () => {
        setIsSettingsOpen(false);
    };
    // Apply theme, typography, and layout styles
    const readerStyles = Object.assign({ 
        // Branding
        '--reader-primary-color': readerConfig.branding.primaryColor, '--reader-secondary-color': readerConfig.branding.secondaryColor, 
        // Theme colors
        '--reader-background-color': readerConfig.theme.mode === 'dark'
            ? ((_a = readerConfig.theme.colors) === null || _a === void 0 ? void 0 : _a.background) || '#1a202c'
            : ((_b = readerConfig.theme.colors) === null || _b === void 0 ? void 0 : _b.background) || '#ffffff', '--reader-text-color': readerConfig.theme.mode === 'dark'
            ? ((_c = readerConfig.theme.colors) === null || _c === void 0 ? void 0 : _c.text) || '#e2e8f0'
            : ((_d = readerConfig.theme.colors) === null || _d === void 0 ? void 0 : _d.text) || '#333333', '--reader-border-color': readerConfig.theme.mode === 'dark'
            ? ((_e = readerConfig.theme.colors) === null || _e === void 0 ? void 0 : _e.border) || '#4a5568'
            : ((_f = readerConfig.theme.colors) === null || _f === void 0 ? void 0 : _f.border) || '#e2e8f0', '--reader-panel-background': readerConfig.theme.mode === 'dark'
            ? ((_g = readerConfig.theme.colors) === null || _g === void 0 ? void 0 : _g.panelBackground) || '#2d3748'
            : ((_h = readerConfig.theme.colors) === null || _h === void 0 ? void 0 : _h.panelBackground) || '#f7fafc', 
        // Typography
        '--reader-font-family': readerConfig.typography.fontFamily ||
            (readerConfig.typography.fontStyle === 'serif'
                ? 'Georgia, Cambria, "Times New Roman", Times, serif'
                : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'), '--reader-font-size': readerConfig.typography.fontSize === 'small' ? '14px'
            : readerConfig.typography.fontSize === 'medium' ? '16px'
                : readerConfig.typography.fontSize === 'large' ? '18px'
                    : '20px', '--reader-line-height': readerConfig.typography.lineSpacing === 'compact' ? '1.4'
            : readerConfig.typography.lineSpacing === 'normal' ? '1.6'
                : '1.8', 
        // Layout
        '--reader-max-width': readerConfig.layout.textWidth === 'narrow' ? '600px'
            : readerConfig.layout.textWidth === 'medium' ? '800px'
                : '1000px' }, style);
    // Combine class names
    const containerClassName = `reader-container ${readerConfig.branding.customClass || ''} ${className}`;
    // Add theme data attribute
    const themeAttribute = readerConfig.theme.mode;
    return (_jsxs("div", { className: containerClassName, style: readerStyles, "data-theme": themeAttribute, children: [_jsxs(ReaderHeader, { document: internalDocument, config: readerConfig, children: [(readerConfig.navigation.showTableOfContents ||
                        readerConfig.navigation.showBreadcrumbs ||
                        readerConfig.navigation.showRelationshipMap) && (_jsx(ReaderNavigation, { document: internalDocument, config: readerConfig, activeSection: activeSection, onSectionSelect: setActiveSection, onNavigationOpen: handleNavigationOpen, onNavigationClose: handleNavigationClose, initiallyOpen: false })), readerConfig.navigation.showSettings && (_jsx(ReaderSettings, { config: readerConfig, onConfigChange: handleConfigChange, onSettingsOpen: handleSettingsOpen, onSettingsClose: handleSettingsClose, initiallyOpen: false }))] }), _jsxs("div", { className: "reader-main", children: [(readerConfig.navigation.showTableOfContents ||
                        readerConfig.navigation.showBreadcrumbs ||
                        readerConfig.navigation.showRelationshipMap) && (_jsx("div", { className: "reader-sidebar", children: _jsx(ReaderNavigation, { document: internalDocument, config: readerConfig, activeSection: activeSection, onSectionSelect: setActiveSection, className: "reader-sidebar-navigation" }) })), _jsx(ReaderContent, { document: internalDocument, config: readerConfig, activeSection: activeSection, onSectionSelect: setActiveSection })] })] }));
}
//# sourceMappingURL=Reader.js.map