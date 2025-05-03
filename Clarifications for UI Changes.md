<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Clarifications for UI Changes

Thank you for your detailed analysis of the current implementation. Your questions are helpful, and I'd like to provide clarifications for all requested changes.

## Text Alignment

- Please add text alignment options in the existing format settings section
- Default should be left-aligned text
- Include options for left, right, and justified alignment


## Paragraph Numbering

- Only show the actual paragraph number (not section number) in line with the text
- Format should be just the number (e.g., "1." instead of "Paper:Section.1")
- Paragraph numbers should appear in their own column to the left of the text


## Section Titles

- Please remove the text-transform: uppercase property
- Use title case (first letter of each major word capitalized)
- This should apply to both traditional and modern formatting styles


## Pullup Bar

- The pullup bar should be partially visible at all times, even when collapsed
- Remove any "Drag to Resize" label if present
- Reduce the default height (minHeight) to be less intrusive
- When closed, it should return to its original collapsed state, not remain at last expanded height
- Tapping Notes button should toggle the notes feature; tapping again collapses it back to original state


## Tab Layout

- Make the tab labels (Notes, Quotes, Settings) adjacent with minimal spacing
- They should appear as a cohesive navigation unit, not spread apart


## Notes Feature - IMPORTANT CHANGE

- The notes indicator dots should appear in their own separate column to the left of the paragraph numbers column
- So the layout from left to right would be: [Notes dots] [Paragraph numbers] [Text content]
- Add settings options to toggle visibility of either the notes indicator column or the paragraph numbers column independently

Please let me know if you need any additional clarifications to implement these changes.

THESE ARE SUGGESTIONS, NOT DIRECTIVES. I respect your expertise in making the final decisions for implementation.

