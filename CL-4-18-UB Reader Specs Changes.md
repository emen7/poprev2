<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# UB Reader Implementation Specification

## UI Structure and Styling

### Header Layout (3-Row Fixed Configuration)

- **Row 1 (Title Row):**
    - Left-to-right alignment: Book Hamburger → Section HB → Previous Paper Arrow → "Urantia Book" Title → Next Paper Arrow → Branding Space
    - Largest font size in the hierarchy
- **Row 2 (Paper Row):**
    - Paper Name, left-aligned
    - Medium font size (smaller than Row 1)
- **Row 3 (Section Row):**
    - Section Name, left-aligned
    - Smallest header font size
    - Dynamically updates as user scrolls through sections
    - Shows faded "(intro)" text when no section is in view


### Content Flow

- All content text flows beneath these three fixed header rows
- Maintain descending font size hierarchy: Book > Paper > Section > Body Text


### Structural Changes

- Remove the "Part 1" line completely (Parts are accessible via Papers Hamburger menu)
- Paragraph numbers should be smaller and slightly darker than title colors


## Theme Implementation

### Theme Options

- Dark Theme (default)
- Light Theme
- System Theme (follows device settings)


### Dark Theme Styling

- All titles (including "Urantia Book") should use monochromatic styling
- Title color should be slightly darker than the regular text color
- Section titles within scrolling text should match this monochromatic color scheme


## Dynamic Section Row Implementation

### Primary Solution: Intersection Observer Custom Hook

```javascript
// useSectionObserver.js - Custom React hook
import { useState, useEffect } from 'react';

export function useSectionObserver() {
  const [currentSection, setCurrentSection] = useState("(intro)");
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    // Get the height of your fixed header (sum of Row 1 and Row 2)
    const headerHeight = document.querySelector('.row-1').offsetHeight + 
                         document.querySelector('.row-2').offsetHeight;
    
    // Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Get currently visible sections
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        
        if (visibleSections.length === 0) {
          setCurrentSection("(intro)");
          setIsIntroVisible(true);
          return;
        }
        
        // Find the topmost visible section
        const topSection = visibleSections.reduce((prev, current) => {
          return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
        });
        
        setCurrentSection(topSection.target.textContent);
        setIsIntroVisible(false);
      },
      {
        // Offset by header height so sections are detected right when they reach row 3
        rootMargin: `-${headerHeight}px 0px -${window.innerHeight - headerHeight - 50}px 0px`,
        threshold: 0.1
      }
    );
    
    // Observe all section headers
    const sections = document.querySelectorAll('.section-heading');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      if (sections.length > 0) {
        sections.forEach(section => observer.unobserve(section));
      }
    };
  }, []);
  
  return { currentSection, isIntroVisible };
}
```


### Implementation in Section Row Component

```jsx
// SectionRow.jsx
import React from 'react';
import { useSectionObserver } from './useSectionObserver';

const SectionRow = () => {
  const { currentSection, isIntroVisible } = useSectionObserver();
  
  return (
    <div className="section-row">
      {isIntroVisible ? (
        <span className="faded-intro">(intro)</span>
      ) : (
        <span>{currentSection}</span>
      )}
    </div>
  );
};

export default SectionRow;
```


### Backup Solution: Throttled Scroll Event Listener

```javascript
// useSectionScrollSpy.js
import { useState, useEffect } from 'react';

export function useSectionScrollSpy() {
  const [currentSection, setCurrentSection] = useState("(intro)");
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    // Throttle function to limit execution frequency
    function throttle(func, delay) {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return func(...args);
      };
    }

    function detectActiveSection() {
      const sections = document.querySelectorAll('.section-heading');
      if (sections.length === 0) return;
      
      // Get the section row position
      const header = document.querySelector('.row-1').offsetHeight + 
                    document.querySelector('.row-2').offsetHeight;
      
      // Check which section is at the section row position
      let activeSection = null;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= header + 50 && rect.bottom >= header) {
          activeSection = section;
        }
      });
      
      if (activeSection) {
        setCurrentSection(activeSection.textContent);
        setIsIntroVisible(false);
      } else {
        setCurrentSection("(intro)");
        setIsIntroVisible(true);
      }
    }
    
    // Initial check and throttled scroll handler
    detectActiveSection();
    const handleScroll = throttle(detectActiveSection, 100);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  
  return { currentSection, isIntroVisible };
}
```


## CSS Requirements

```css
/* Example styling for the section row */
.section-row {
  font-size: 1rem; /* Smallest header font */
  height: 2rem; /* Fixed height to maintain space */
  line-height: 2rem;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: var(--background-color);
  position: sticky;
  top: calc(var(--row1-height) + var(--row2-height));
  z-index: 10;
}

.faded-intro {
  opacity: 0.5;
  font-style: italic;
  text-transform: lowercase;
}

/* Section heading styling in content */
.section-heading {
  color: var(--title-color); /* Monochromatic with title */
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem 0;
}

/* Styling for paragraph numbers */
.paragraph-number {
  font-size: 0.8rem;
  color: var(--title-color-darker);
  margin-right: 0.5rem;
}
```


## Implementation Notes

1. **Section Identification:**
    - Add the `section-heading` class to all section headers in the content
    - This enables automatic detection for the dynamic section row
2. **Performance Considerations:**
    - Intersection Observer API is preferred for better performance
    - Fallback to scroll event listener only if necessary
3. **Scalability:**
    - This implementation works across all 196 Papers and the Foreword
    - The class-based approach allows consistent behavior across all content
4. **Theme Variables:**
    - Implement CSS variables for easy theme switching
    - Example: `--title-color`, `--title-color-darker`, `--text-color`, `--background-color`

## CSS Theme Implementation

```css
/* Dark Theme (Default) */
:root {
  --background-color: #121212;
  --text-color: rgba(255, 255, 255, 0.87);
  --title-color: rgba(255, 255, 255, 0.95);
  --title-color-darker: rgba(255, 255, 255, 0.7);
  --row1-height: 3rem;
  --row2-height: 2.5rem;
  --row3-height: 2rem;
}

/* Light Theme */
.light-theme {
  --background-color: #ffffff;
  --text-color: rgba(0, 0, 0, 0.87);
  --title-color: rgba(0, 0, 0, 0.95);
  --title-color-darker: rgba(0, 0, 0, 0.7);
}

/* Apply System Theme */
@media (prefers-color-scheme: light) {
  .system-theme {
    --background-color: #ffffff;
    --text-color: rgba(0, 0, 0, 0.87);
    --title-color: rgba(0, 0, 0, 0.95);
    --title-color-darker: rgba(0, 0, 0, 0.7);
  }
}
```

---

THESE ARE SUGGESTIONS, NOT DIRECTIVES. Feel free to adapt the implementation approach as needed while maintaining the core functionality and design goals.

