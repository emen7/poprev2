# UB Reader UI Specifications

This document provides detailed UI specifications for the navigation and settings components to be integrated into the UB Reader. These specifications serve as a guide for designers and developers implementing the visual and interactive aspects of these components.

## Navigation Component

### Header Section

#### Hamburger Menu Button

- **Location**: Top-left corner of the header
- **Size**: 40px × 40px touch target
- **Icon**: Three horizontal lines (hamburger icon)
- **States**:
  - Default: Primary color at 70% opacity
  - Hover: Primary color at 100% opacity
  - Active: Primary color at 100% opacity with subtle background
  - When menu open: 'X' icon or rotated hamburger icon

#### Title

- **Location**: Center of header
- **Font**: Primary font, 18px, semi-bold
- **Content**: Dynamic based on current document (e.g., "Urantia Book", "Paper 1", etc.)
- **Behavior**: Truncates with ellipsis if too long for available space

#### Settings Button

- **Location**: Top-right corner of the header
- **Size**: 40px × 40px touch target
- **Icon**: Gear icon
- **States**: Same as hamburger menu button

### Navigation Panel

#### Panel Container

- **Position**: Fixed, slides in from left
- **Width**: 300px on desktop, 85% of screen width on mobile (max 300px)
- **Height**: Full height minus header height
- **Background**: Background color (light/dark theme aware)
- **Shadow**: Subtle drop shadow on right edge
- **Animation**: Smooth slide-in/out animation (300ms ease transition)

#### Active Part Section (Top)

- **Height**: Auto based on content
- **Background**: Slightly darker than panel background
- **Border**: Bottom border 1px

#### Part Toggle

- **Height**: 48px
- **Padding**: 16px horizontal
- **Font**: 14px, uppercase, semi-bold
- **Icon**: Chevron (down when expanded, right when collapsed)
- **States**:
  - Default: Secondary text color
  - Hover: Primary color
  - Active/Selected: Primary color
- **Animation**: Smooth rotation of chevron icon

#### Papers List

- **Padding**: 0 0 0 16px (indented)
- **Max Height**: When expanded, should not exceed 50% of panel height

#### Paper Item

- **Height**: 40px
- **Padding**: 8px 16px
- **Font**: 14px, regular
- **States**:
  - Default: Primary text color
  - Hover: Background highlight, primary color
  - Active/Selected: Background primary color, white text
- **Current Paper Indicator**: Left border or highlight

#### Scrollable Middle Section

- **Behavior**: Vertically scrollable when content exceeds available space
- **Scrollbar**: Minimal, themed scrollbar that appears on hover

#### Inactive Parts Section (Bottom)

- **Position**: Fixed to bottom of navigation panel
- **Background**: Slightly darker than panel background
- **Border**: Top border 1px

### Section Navigation

#### Section Dropdown

- **Location**: Below sticky header in content area
- **Width**: 200px
- **Height**: 36px
- **Border**: 1px solid border color
- **Border Radius**: 4px
- **Background**: Background color
- **Font**: 14px
- **Icon**: List icon and chevron
- **Behavior**: Click to open dropdown

#### Section Dropdown Content

- **Width**: 200px
- **Max Height**: 300px
- **Background**: Background color
- **Border**: 1px solid border color
- **Border Radius**: 4px
- **Shadow**: Subtle drop shadow
- **Scrollbar**: Appears when content exceeds max height

#### Section Link

- **Height**: 36px
- **Padding**: 8px 16px
- **Font**: 14px
- **States**:
  - Default: Primary text color
  - Hover: Background highlight
  - Active/Current: Bold or highlighted

### Overlay

- **Color**: Black at 50% opacity
- **z-index**: Below navigation panel, above content
- **Behavior**: Appears when navigation panel is open, clicking overlay closes panel

## Settings Component

### Settings Panel

#### Panel Container

- **Position**: Fixed, slides in from right
- **Width**: 300px on desktop, 85% of screen width on mobile (max 300px)
- **Height**: Full height minus header height
- **Background**: Background color (light/dark theme aware)
- **Shadow**: Subtle drop shadow on left edge
- **Animation**: Smooth slide-in/out animation (300ms ease transition)

#### Settings Section

- **Padding**: 16px
- **Border**: Bottom border 1px
- **Spacing**: 24px between sections

#### Section Title

- **Font**: 16px, semi-bold
- **Margin**: 0 0 16px 0
- **Color**: Primary text color

#### Setting Option

- **Margin**: 0 0 16px 0 (last child 0)

#### Option Title

- **Font**: 14px, medium
- **Margin**: 0 0 8px 0
- **Color**: Secondary text color

#### Option Buttons Container

- **Display**: Flex with wrap
- **Gap**: 8px

#### Option Button

- **Height**: 32px
- **Padding**: 0 12px
- **Border Radius**: 4px
- **Font**: 14px
- **Background**: Secondary background color
- **States**:
  - Default: Secondary background, primary text
  - Hover: Slightly darker background
  - Active/Selected: Primary color background, white text
- **Transition**: Smooth color transition (150ms)

### Theme-specific Settings

#### Dark Theme Colors

- **Background**: #1a202c
- **Panel Background**: #2d3748
- **Secondary Background**: #4a5568
- **Border Color**: #4a5568
- **Primary Text**: #e2e8f0
- **Secondary Text**: #a0aec0
- **Primary Color**: #4299e1
- **Accent Color**: #90cdf4

#### Light Theme Colors

- **Background**: #ffffff
- **Panel Background**: #f7fafc
- **Secondary Background**: #edf2f7
- **Border Color**: #e2e8f0
- **Primary Text**: #1a202c
- **Secondary Text**: #4a5568
- **Primary Color**: #3182ce
- **Accent Color**: #63b3ed

## Typography Settings

### Font Sizes

- **Small**: 14px base, 1.5 line height
- **Medium**: 16px base, 1.6 line height
- **Large**: 18px base, 1.7 line height
- **X-Large**: 20px base, 1.8 line height

### Font Families

- **Sans-serif**: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- **Serif**: Georgia, Cambria, "Times New Roman", Times, serif

### Line Spacing

- **Compact**: 1.4 line height
- **Normal**: 1.6 line height
- **Relaxed**: 1.8 line height

## Layout Settings

### Text Width

- **Narrow**: 600px max-width
- **Medium**: 800px max-width
- **Wide**: 1000px max-width

## Responsive Behavior

### Mobile Adjustments (< 768px)

- Navigation and settings panels take up 85% of screen width
- Only one panel can be open at a time
- Sticky headers have reduced height
- Font sizes may be slightly reduced
- Touch targets minimum 44px × 44px

### Tablet Adjustments (768px - 1024px)

- Navigation and settings panels fixed at 300px width
- Panels push content rather than overlay on larger tablets
- Sticky headers at full height

### Desktop (> 1024px)

- Navigation and settings panels fixed at 300px width
- Option to pin navigation panel open
- Content centered with max-width based on text width setting

## Animations and Transitions

### Panel Animations

- **Open/Close**: 300ms ease transition for transform
- **Overlay Fade**: 200ms ease transition for opacity

### Interactive Elements

- **Buttons**: 150ms transition for background/color changes
- **Dropdown**: 200ms transition for height/opacity
- **Part Toggle**: 200ms transition for rotation

## Accessibility Considerations

### Keyboard Navigation

- Tab order follows logical structure
- Escape key closes open panels
- Arrow keys navigate within lists
- Enter/Space activates buttons and toggles

### Screen Reader Support

- All interactive elements have appropriate ARIA roles
- Navigation panel has role="navigation"
- Settings panel has role="complementary"
- Proper labeling of all controls
- Status announcements for panel open/close

### Focus Management

- Focus trapped within open panel
- Focus returns to trigger button when panel closes
- Focus indicators visible in all themes
- No focus loss during interactions

## Extension-specific UI

### Scientific Extension Settings

- **Citation Style Selector**: Radio button group or button group
- **MathJax Toggle**: Switch or button group (Enabled/Disabled)
- **Chart Display Options**: Button group or dropdown

### Almanac Extension Settings

- **Timeline View Options**: Button group
- **Reference Display**: Switch or button group
- **Visualization Settings**: Collapsible section with specific controls

### Lectionary Extension Settings

- **Calendar View**: Button group
- **Reading Schedule**: Dropdown or button group
- **Notification Settings**: Switches for different notification types

This UI specification provides comprehensive guidance for implementing the visual and interactive aspects of the navigation and settings components. It ensures consistency across different parts of the interface while maintaining flexibility for theme changes and responsive behavior.
