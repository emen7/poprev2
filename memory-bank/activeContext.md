# Active Development Context

## Current Focus

- Redesigning page structure for better consistency
- Implementing clean component hierarchy
- Creating a standardized layout system
- Addressing positioning inconsistencies between environments
- Implementing optimized reading experience

## Current Task Details

Working on page structure redesign for the UB Reader application, focusing on:

- Creating a clean, consistent page structure from top to bottom
- Implementing a properly centered reading area with optimal width
- Developing a text-only pullup component with adjustable height
- Ensuring consistent positioning between localhost and Vercel deployment
- Using a full paper implementation to validate the design

## Active Components

- Permanent Title Bar: Fixed position header with app title
- Paper Bar: Secondary header showing current paper information
- Reading Area: Main content container with optimal width
- Pullup Footer: Expandable panel with text-only initial state

## Current Challenges

- Ensuring consistent positioning between localhost and Vercel deployment
- Creating a clean div structure with minimal nesting
- Balancing mobile and desktop experiences with the same core components
- Implementing proper width constraints for optimal reading
- Ensuring the pullup component works consistently across devices

## Related Files

- HTML/CSS prototype (to be created)
- React components (to be created after prototype validation)
- Existing demo files for reference:
  - ub-reader-demo.html
  - ub-reader-enhanced.html
  - pullup-demo.html

## Recent Changes

- [4/21/2025] Decided on hybrid implementation approach with two phases:
  - Phase 1: Complete essential HTML layout (paragraph numbering, pullup behavior, reading area, basic UI)
  - Phase 2: Implement advanced features directly in React (settings functionality, content management)
- [4/21/2025] Created paper-1-alpha.html with basic implementation of the new page structure design
- [4/21/2025] Modified ub-reader-demo.html to redirect to paper-1-alpha.html
- [4/21/2025] Cleaned up repository structure by archiving old demo files
- [4/20/2025] Decided to suspend work on three-row header temporarily
- [4/20/2025] Created plan for page structure redesign
- [4/20/2025] Established optimal reading width constraints (650-700px)
- [4/20/2025] Defined pullup behavior with text-only initial state
