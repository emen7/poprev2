# Revised Three-Row Header and Section Detection Improvement Plan

Based on your clarification, I have a better understanding of how the section detection should work. Let me update the plan accordingly.

## Current Issues

1. **Header Centering Problem**:

   - The three title rows are misaligned, appearing off to the left instead of centered above the content

2. **Section Title Persistence**:
   - Section names in Row 3 aren't displaying correctly when sections enter and leave the viewport

## Understanding the "Hot Zone" Detection Model

I understand now that Row 3 acts as a "hot zone" or scanner for detecting which section is currently visible:

- Row 3 shows "(intro)" when the introduction content is touching Row 3
- When a section div touches Row 3, that section's title appears in Row 3
- The section title stays visible as long as that section div is touching Row 3
- When scrolling back up, when a previous section touches Row 3 again, that section's title reappears

This is a clean, straightforward approach that will provide a clear indication of which section the user is currently reading.

## Proposed Solution

### 1. Fix Header Centering

We need to restructure the header CSS to ensure proper alignment with the content:

```css
/* Update header centering for all three rows */
.three-row-header {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-index-header);
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Make sure each row uses the full width */
.three-row-header > div {
  width: 100%;
}

/* Desktop centering for each row's content */
@media (min-width: 1024px) {
  .title-row,
  .paper-row,
  .section-row {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .title-row > *,
  .paper-row > *,
  .section-row > * {
    width: 800px;
    max-width: 100%;
  }

  /* Ensure the text is centered within each row */
  .book-title,
  .paper-title,
  .section-title,
  .faded-intro {
    text-align: center;
    width: 100%;
  }
}
```

### 2. Improved Section "Hot Zone" Detection

Here's how we'll implement the "hot zone" detection using Intersection Observer:

```js
export function useSectionObserver({
  sectionHeadingSelector = '.section-content',
  containerSelector = '.reading-area',
  additionalOffset = 0,
}: SectionObserverOptions = {}) {
  // State to track current section
  const [currentSection, setCurrentSection] = useState('(intro)');
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  // Calculate the position of Row 3 (our "hot zone")
  const calculateHotZonePosition = () => {
    const row1Height = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row1-height') || '3rem');
    const row2Height = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row2-height') || '2.5rem');

    // Row 3 position is at the bottom of row1 + row2
    return row1Height + row2Height;
  };

  useEffect(() => {
    // Get all section containers
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const sections = Array.from(container.querySelectorAll(sectionHeadingSelector));

    // The hot zone is positioned at the bottom edge of row2 (top edge of row3)
    const hotZonePosition = calculateHotZonePosition();

    // Configure Intersection Observer to detect sections touching Row 3
    const options = {
      // Make a thin observation area right at Row 3 position
      rootMargin: `-${hotZonePosition}px 0px -${window.innerHeight - hotZonePosition - 10}px 0px`,
      threshold: [0, 0.1, 0.2, 0.3]
    };

    // Create observer
    const observer = new IntersectionObserver(entries => {
      // Get sections that are currently touching the hot zone
      const visibleSections = entries.filter(entry => entry.isIntersecting);

      if (visibleSections.length > 0) {
        // Get the topmost visible section
        const topSection = visibleSections.reduce((prev, current) => {
          return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
        });

        // Get section title from the container
        const titleElement = topSection.target.querySelector('.section-title');
        if (titleElement && titleElement.textContent) {
          setCurrentSection(titleElement.textContent);
          setIsIntroVisible(false);
        }
      } else if (window.scrollY < 100) {
        // If no sections are visible and we're at the top, show intro
        setCurrentSection('(intro)');
        setIsIntroVisible(true);
      }
    }, options);

    // Observe all section containers
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [sectionHeadingSelector, containerSelector]);

  return { currentSection, isIntroVisible };
}
```

## Visual Diagram of Hot Zone Detection

```mermaid
graph TD
    A[User scrolls the page] --> B[Observer checks sections]
    B --> C{Any sections touching Row 3 hot zone?}
    C -- Yes --> D[Get topmost section touching Row 3]
    C -- No --> E{At top of page?}
    E -- Yes --> F[Display '(intro)']
    E -- No --> G[Keep current section title]
    D --> H[Update section title in Row 3]
```

## Implementation Steps

1. **Update the three-row-header.css file:**

   - Fix the centering rules for the header and content alignment
   - Make sure each row properly centers its content

2. **Update the useSectionObserver.ts hook:**

   - Implement the "hot zone" detection logic
   - Configure Intersection Observer with a precise boundary at Row 3 position
   - Update section title when a section touches the hot zone

3. **Add debugging helpers:**
   - Add visual indication of the hot zone during development
   - Include console logs when sections enter/exit the hot zone

This revised approach provides a more intuitive detection mechanism where the section title in Row 3 clearly indicates which section the user is currently viewing.
