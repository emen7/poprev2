<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Urantia Book Traditional Reader UI Redesign Specification

http://localhost:3001/traditional-reader/1. 

## Core UI Requirements

**Layout \& Typography**

- Implement a monochromatic color scheme
- Use subtle shade variations to distinguish title text from body text
- Set reading viewport width to approximately 800px on desktop devices
- Apply the same width constraint to the pullup menu component

**Header Hierarchy**

- Top navigation bar should contain:
    - Two hamburger menu icons (left and right)
    - Center text "Urantia Book" (without "The") that functions as a hyperlink to the Papers list
- Paper identification should be left-aligned and include:
    - Part Title on one line
    - Paper Title (e.g., "Paper 1") on the next line
- Remove the attribution text ("presented by a Divine Counselor")

**Section Title Behavior**

- Add a dynamic section title area below the Paper number line
- This section title area should:
    - Initially remain empty when displaying introduction content
    - Dynamically update to display the current section title during scrolling
    - Clear when user scrolls back to introductory content
    - Use left alignment for all section titles
    - Maintain proportionate sizing relative to other title elements

**Content Handling**

- Ignore titles from the JSON data structure, exccept the section titles.
- Section titles should be aligned left. 
- Begin content display with the first words of text below the titles in JSON
- Display introductory paragraphs (which aren't explicitly labeled) below the empty section title area
- When scrolling to named sections (e.g., "1. The Father's Name"), display these titles in the section title area


## Implementation Notes

The dynamic section title should function as a "sticky" element that updates based on scroll position and visible content, creating a contextual reading experience that maintains orientation within the document.

THESE ARE SUGGESTIONS, NOT DIRECTIVES. The implementation details should leverage Roo Code Architect's expertise while maintaining the described reading experience and information hierarchy.

