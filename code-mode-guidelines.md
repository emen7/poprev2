# CODE Mode Guidelines for UB Reader Development

## Communication Structure

When presenting checkpoints and milestones during development, please structure your updates as follows:

1. **Accomplishments Summary**

   - Clearly state what has been implemented so far
   - Highlight any challenges that were overcome
   - Include screenshots or demos when relevant

2. **Remaining Work**

   - Outline what still needs to be completed in the current stage
   - Identify any blockers or dependencies
   - Provide estimated timeline for completion

3. **Specific Feedback Requests**
   - Ask precise questions about functionality or appearance that need evaluation
   - Provide options when applicable to make decision-making easier
   - Clearly indicate which aspects are most critical for feedback

## Reader Experience Requirements

### Layout and Responsiveness

1. **Width Limitation**

   - PC reader must be limited in width to what is standard for easy reading in browser
   - Recommended max-width: 700-800px for text content
   - Ensure proper margins on larger screens

2. **Adaptive UI Elements**
   - **Large Screens**: Elements can remain persistent rather than auto-hiding
   - **Small Screens**: Use auto-hiding behavior with gesture/tap to reveal
   - Ensure smooth transitions between states

### Pull-Up/Pull-Down Elements

1. **Pull-Down Element (Top)**

   - Contains navigation controls, title, and global actions
   - Remains visible on large screens
   - Auto-hides on small screens after period of inactivity

2. **Pull-Up Element (Bottom) - Multi-Purpose**

   - **General Features**:

     - User-made notes and quote collections
     - Context-sensitive controls

   - **Scientific Reader Specific**:

     - Referenced documents panel
     - Atlas entries
     - Glossary
     - Abbreviations list
     - Equation explanations

   - **Implementation Notes**:
     - Should support tabbed interface for different content types
     - Height should be adjustable by user (drag handle)
     - Should remember last used height and tab

### Sticky Headers

1. **Paper Title**

   - Always visible at the top regardless of scroll position
   - Sits below the pull-down element when it's visible

2. **Section Headers**
   - Each section header sticks when it reaches the top
   - Gets replaced by the next section header when scrolling
   - Creates hierarchical navigation experience

### Advanced Features

1. **Tooltip System for Scientific Content**

   - Hover or touch to reveal abbreviation definitions
   - Display equations in simple English
   - Show additional context for technical terms
   - Ensure tooltips are accessible and don't interfere with reading flow

2. **Theme Support**
   - Ensure all elements work with both light and dark themes
   - Use CSS variables for consistent styling

## Implementation Priorities

1. Core layout and responsive behavior
2. Pull-up/pull-down elements with basic functionality
3. Sticky header system
4. Multi-purpose panels for the pull-up element
5. Advanced tooltip system

## Evaluation Criteria

When requesting feedback, focus on:

1. Readability and content focus
2. Intuitive interaction patterns
3. Performance and smoothness of animations
4. Accessibility considerations
5. Cross-device consistency

Please use these guidelines when developing and communicating about the UB Reader experience. Regular updates with clear accomplishments, remaining work, and specific feedback requests will help ensure the development stays aligned with the vision for the reader.
