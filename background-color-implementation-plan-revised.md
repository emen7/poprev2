# Background Color Scheme Implementation Plan (Revised)

## Overview

This plan outlines the steps to implement the requested background color scheme for the UB Reader application. The implementation will focus on both paper-1-alpha.html and index.html files, which share the same structure and CSS variables.

## Current State Analysis

Both HTML files currently use a dark theme with the following CSS variables:

```css
:root {
  /* Colors */
  --bg-color: #1a1a1a;
  --text-color: #e2e8f0;
  --header-bg-color: #222;
  --header-text-color: #fff;
  --border-color: #333;
  --accent-color: #0088ff;
  --pullup-bg-color: #222;
  --pullup-text-color: #fff;
  --pullup-handle-color: #666;
}
```

The files already have theme switching UI in the settings panel, but the actual theme switching functionality is not implemented in the JavaScript.

## Requested Color Scheme

From the Background color scheme.md file:

**Dark Mode (Default):**

- Outer frame: true black (#000000)
- Reading background: dark gray (#181A1B or #23272F)
- Text: soft off-white (#E8E6E3)

**Light Mode:**

- Frame: pure white (#FFFFFF) or off-white (#F5F6F7)
- Reading background: very light gray or cream (#FAFAFA or #F7F6F3)
- Text: dark gray (#222222)

## Implementation Plan

### 1. Enhance CSS Variables for Theme Support

Modify the CSS variables section to include theme-specific variables:

```css
:root {
  /* Layout measurements (unchanged) */
  --title-bar-height: 60px;
  --paper-bar-height: 40px;
  --pullup-closed-height: 40px;
  --reading-max-width: 700px;
  --content-padding: 20px;

  /* Default theme (dark) */
  --outer-frame-color: #000000;
  --reading-bg-color: #181a1b;
  --text-color: #e8e6e3;
  --header-bg-color: #000000;
  --header-text-color: #e8e6e3;
  --border-color: #333;
  --accent-color: #0088ff;
  --pullup-bg-color: #000000;
  --pullup-text-color: #e8e6e3;
  --pullup-handle-color: #666;
  /* Shadow for visual separation */
  --shadow-color: rgba(0, 0, 0, 0.2);
}

/* Light theme class */
.light-theme-active {
  --outer-frame-color: #ffffff;
  --reading-bg-color: #f7f6f3;
  --text-color: #222222;
  --header-bg-color: #ffffff;
  --header-text-color: #222222;
  --border-color: #ddd;
  --pullup-bg-color: #ffffff;
  --pullup-text-color: #222222;
  --pullup-handle-color: #aaa;
  --shadow-color: rgba(0, 0, 0, 0.1);
}
```

### 2. Update CSS Selectors to Use New Variables

Update the CSS selectors to use the new variables:

```css
/* Add transition effect for smooth theme switching */
body,
.reading-area,
.title-bar,
.paper-bar,
.pullup-footer {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

body {
  font-family: var(--font-family);
  font-size: var(--base-font-size);
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--outer-frame-color);
  min-height: 100vh;
  position: relative;
}

.reading-area {
  /* Existing properties */
  background-color: var(--reading-bg-color);
  color: var(--text-color);
  /* Add padding and border-radius for visual separation */
  padding: 2rem;
  border-radius: 8px;
  /* Add subtle shadow for visual separation from outer frame */
  box-shadow: 0 2px 10px var(--shadow-color);
  margin-bottom: 2rem;
}
```

### 3. Update Theme Options in HTML

Update the theme options in the settings panel to include Dark, Light, and System:

```html
<div class="settings-section">
  <h4>Theme</h4>
  <div class="settings-controls">
    <div class="theme-option theme-option-selected" data-theme="dark">
      <div class="theme-preview dark-theme"></div>
      <span>Dark</span>
    </div>
    <div class="theme-option" data-theme="light">
      <div class="theme-preview light-theme"></div>
      <span>Light</span>
    </div>
    <div class="theme-option" data-theme="system">
      <div class="theme-preview system-theme"></div>
      <span>System</span>
    </div>
  </div>
</div>
```

### 4. Implement Theme Switching JavaScript

Add JavaScript to handle theme switching, including system preference detection:

```javascript
// Theme switching functionality
const themeOptions = document.querySelectorAll('.theme-option');
const body = document.body;
let systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
  // Remove all theme classes
  body.classList.remove('light-theme-active');

  // Handle system theme
  if (theme === 'system') {
    if (systemThemeMediaQuery.matches) {
      // System preference is dark, use default (dark) theme
      theme = 'dark';
    } else {
      // System preference is light
      body.classList.add('light-theme-active');
      theme = 'light';
    }
  } else if (theme === 'light') {
    // Explicitly set light theme
    body.classList.add('light-theme-active');
  }
  // For dark theme, no class needed as it's the default

  // Update selected state in UI
  themeOptions.forEach(option => {
    if (
      option.dataset.theme ===
      (theme === 'light' && systemThemeMediaQuery.matches ? 'system' : theme)
    ) {
      option.classList.add('theme-option-selected');
    } else {
      option.classList.remove('theme-option-selected');
    }
  });

  // Save preference to localStorage
  localStorage.setItem('ub-reader-theme', theme);
}

// Add click event listeners to theme options
themeOptions.forEach(option => {
  option.addEventListener('click', function () {
    const theme = this.dataset.theme;
    setTheme(theme);
  });
});

// Listen for system theme changes
systemThemeMediaQuery.addEventListener('change', e => {
  const currentTheme = localStorage.getItem('ub-reader-theme') || 'dark';
  if (currentTheme === 'system') {
    setTheme('system');
  }
});

// Load saved theme preference on page load
document.addEventListener('DOMContentLoaded', function () {
  const savedTheme = localStorage.getItem('ub-reader-theme') || 'dark';
  setTheme(savedTheme);
});
```

### 5. Update Theme Preview Colors

Update the theme preview colors in the settings panel to match the new color scheme:

```css
.dark-theme {
  background-color: #181a1b;
  border: 1px solid #000000;
}

.light-theme {
  background-color: #f7f6f3;
  border: 1px solid #ffffff;
}

.system-theme {
  background: linear-gradient(to right, #181a1b 50%, #f7f6f3 50%);
  border: 1px solid #666;
}
```

## Implementation Approach

1. First, implement the changes in paper-1-alpha.html as a prototype
2. Test the implementation to ensure proper theme switching and visual appearance
3. Once confirmed working, apply the same changes to index.html
4. Ensure the theme preference is saved and loaded correctly between page refreshes
5. Test system theme detection with browser developer tools

## Accessibility Considerations

- Ensure all text meets WCAG AA contrast requirements in all themes
- Test with screen readers to confirm proper semantic structure
- Verify keyboard navigation works correctly for theme switching

## Visual Diagram

```mermaid
graph TD
    A[User selects theme] --> B{Which theme?}
    B -->|Dark| C[Apply dark theme CSS variables]
    B -->|Light| D[Apply light theme CSS variables]
    B -->|System| E{Check system preference}
    E -->|Dark| C
    E -->|Light| D
    C --> F[Update UI to show selected theme]
    D --> F
    F --> G[Save preference to localStorage]
    H[Page loads] --> I[Check localStorage for saved theme]
    I --> J[Apply saved theme or default to dark]
    K[System preference changes] --> L{Current theme is System?}
    L -->|Yes| E
    L -->|No| M[No action needed]
```

## Next Steps

After implementing this color scheme:

1. Add high contrast theme option for enhanced accessibility
2. Consider adding custom theme creation capability for advanced users
3. Explore additional visual refinements based on user feedback
