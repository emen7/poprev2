/**
 * Simple Example Page
 *
 * This page demonstrates a simple example without relying on the complex Reader component.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SimpleExamplePage() {
    return (_jsxs("div", { className: "simple-example", children: [_jsx("h1", { children: "Simple Example" }), _jsx("p", { children: "This is a simple example page that doesn't rely on the complex Reader component." }), _jsxs("div", { className: "example-container", children: [_jsxs("div", { className: "example-header", children: [_jsxs("button", { className: "example-button", children: [_jsx("span", { children: "\u2630" }), " Menu"] }), _jsx("h2", { children: "Example Header" }), _jsxs("button", { className: "example-button", children: [_jsx("span", { children: "\u2699\uFE0F" }), " Settings"] })] }), _jsxs("div", { className: "example-content", children: [_jsx("p", { children: "This example demonstrates the basic structure of the enhanced Reader component:" }), _jsxs("ul", { children: [_jsx("li", { children: "A header with navigation and settings buttons" }), _jsx("li", { children: "A main content area" }), _jsx("li", { children: "Slide-in panels for navigation and settings" })] })] })] }), _jsx("style", { children: `
        .simple-example {
          padding: 2rem;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }

        .example-container {
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 2rem;
        }

        .example-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f0f0f0;
          border-bottom: 1px solid #ccc;
        }

        .example-button {
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .example-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .example-content {
          padding: 1rem;
        }
      ` })] }));
}
//# sourceMappingURL=page.js.map