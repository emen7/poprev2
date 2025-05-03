var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/**
 * Scientific Header Component
 */
const ScientificHeader = (_a) => {
    var { document } = _a, props = __rest(_a, ["document"]);
    // This would be a custom header component for scientific documents
    // For now, we'll just return null and let the default header be used
    return null;
};
/**
 * Scientific Table of Contents Component
 */
const ScientificTableOfContents = (_a) => {
    var { document, activeSection, onSectionSelect } = _a, props = __rest(_a, ["document", "activeSection", "onSectionSelect"]);
    // This would be a custom TOC component for scientific documents
    // For now, we'll just return null and let the default TOC be used
    return null;
};
/**
 * Scientific Content Renderer Component
 */
const ScientificContentRenderer = (_a) => {
    var { document } = _a, props = __rest(_a, ["document"]);
    // This would be a custom content renderer for scientific documents
    // For now, we'll just return null and let the default content renderer be used
    return null;
};
/**
 * Scientific Citation Node Renderer
 */
const ScientificCitationRenderer = (_a) => {
    var { node, renderChildren } = _a, props = __rest(_a, ["node", "renderChildren"]);
    // This would be a custom renderer for citation nodes
    return (_jsxs("span", { className: "scientific-citation", children: ["[", node.citationKey, "]", renderChildren(node)] }));
};
/**
 * Scientific Figure Node Renderer
 */
const ScientificFigureRenderer = (_a) => {
    var { node, renderChildren } = _a, props = __rest(_a, ["node", "renderChildren"]);
    // This would be a custom renderer for figure nodes
    return (_jsxs("figure", { className: "scientific-figure", children: [_jsx("img", { src: node.url, alt: node.caption, className: "scientific-figure-image" }), _jsxs("figcaption", { className: "scientific-figure-caption", children: [_jsxs("strong", { children: ["Figure ", node.number, ":"] }), " ", node.caption] })] }));
};
/**
 * Scientific Extension
 */
export class ScientificExtension {
    constructor() {
        /**
         * Unique identifier for the extension
         */
        this.id = 'scientific-extension';
        /**
         * Display name of the extension
         */
        this.name = 'Scientific Extension';
        /**
         * Description of the extension
         */
        this.description = 'Adds specialized features for scientific documents';
        /**
         * Version of the extension
         */
        this.version = '1.0.0';
        /**
         * Extension configuration
         */
        this.config = {};
    }
    /**
     * Initialize the extension
     *
     * @param config Extension configuration
     */
    initialize(config) {
        this.config = config;
        console.log('Scientific Extension initialized with config:', config);
    }
    /**
     * Get the components provided by this extension
     */
    getComponents() {
        return {
            DocumentHeader: ScientificHeader,
            TableOfContents: ScientificTableOfContents,
            ContentRenderer: ScientificContentRenderer,
            NodeRenderers: {
                citation: ScientificCitationRenderer,
                figure: ScientificFigureRenderer,
            },
        };
    }
    /**
     * Get the hooks provided by this extension
     */
    getHooks() {
        return {
            useDocumentProcessor: (document) => {
                // This would process the document for scientific content
                // For now, we'll just return the document unchanged
                return document;
            },
        };
    }
    /**
     * Get the utilities provided by this extension
     */
    getUtils() {
        return {
            processReferences: (content) => {
                // This would process references in scientific content
                // For now, we'll just return the content unchanged
                return content;
            },
            validateDocument: (document) => {
                // This would validate a scientific document
                // For now, we'll just return true
                return true;
            },
        };
    }
}
/**
 * Create a new instance of the Scientific Extension
 */
export function createScientificExtension() {
    return new ScientificExtension();
}
//# sourceMappingURL=scientific-extension.js.map