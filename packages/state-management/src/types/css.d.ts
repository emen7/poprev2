/**
 * CSS Module Declarations
 *
 * This file provides TypeScript type definitions for CSS modules.
 * It allows TypeScript to understand imports of CSS files and CSS modules.
 */

// Regular CSS files
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// CSS Modules
declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}
