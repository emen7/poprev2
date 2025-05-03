/**
 * Section Observer Hook
 *
 * This custom hook uses the Intersection Observer API to track which section
 * is currently visible in the viewport. It updates the current section information
 * as the user scrolls, showing "(intro)" when no section is visible.
 */

import { useState, useEffect, useRef } from 'react';

interface SectionObserverOptions {
  /**
   * CSS selector for section headings
   */
  sectionHeadingSelector?: string;

  /**
   * CSS selector for the container element
   */
  containerSelector?: string;

  /**
   * Additional offset to adjust the detection point (in pixels)
   */
  additionalOffset?: number;
}

/**
 * Custom hook that tracks the currently visible section using Intersection Observer
 */
export function useSectionObserver({
  // Target entire section containers instead of just titles
  sectionHeadingSelector = '.section-content',
  containerSelector = '.content', // Changed from .reading-area to .content
  additionalOffset = 50, // Further increased offset for better detection
}: SectionObserverOptions = {}) {
  // State to track current section
  const [currentSection, setCurrentSection] = useState('(intro)');
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  // Store refs to current sections and observer
  const sectionsRef = useRef<Element[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // Track last visible section to keep it displayed when scrolling
  const lastVisibleSectionRef = useRef<string>('(intro)');

  // Debug state
  const [debug, setDebug] = useState(false);

  // Function to check browser support for Intersection Observer
  const isIntersectionObserverSupported = () => {
    return (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    );
  };

  // Throttle function to limit execution frequency for scroll fallback
  const throttle = (func: Function, delay: number) => {
    let lastCall = 0;
    return function (...args: any[]) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  };

  useEffect(() => {
    // Get all section headings
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const sections = Array.from(container.querySelectorAll(sectionHeadingSelector));
    sectionsRef.current = sections;

    if (sections.length === 0) return;

    // Calculate the "hot zone" position - which is at Row 3
    const row1Height = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--row1-height') || '3rem'
    );
    const row2Height = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--row2-height') || '2.5rem'
    );
    const row3Height = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--row3-height') || '2rem'
    );

    // Hot zone is at the top of row 3, which is at row1 + row2 from the top
    const hotZonePosition = row1Height + row2Height;

    // Total header height
    const totalHeaderHeight = row1Height + row2Height + row3Height;

    // Set or create a CSS variable for total header height
    document.documentElement.style.setProperty('--header-total-height', `${totalHeaderHeight}px`);

    if (process.env.NODE_ENV === 'development') {
      // Removed console.log
      // Removed console.log
    }

    // Method 1: Using Intersection Observer (preferred)
    if (isIntersectionObserverSupported()) {
      // Set up observer options to create a thin "hot zone" at Row 3
      const options = {
        // Create a narrow band right at the hot zone (top of row 3)
        // The negative top margin pushes the observation area down to the hot zone
        // The negative bottom margin makes the observation area very thin
        rootMargin: `-${hotZonePosition + 10}px 0px -${window.innerHeight - hotZonePosition - 50 - additionalOffset}px 0px`,
        // These thresholds help detect even small intersections with the hot zone
        threshold: [0, 0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5],
      };

      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        // Removed console.log
        // Removed console.log
      }

      // Create the observer
      observerRef.current = new IntersectionObserver(entries => {
        // Get currently visible sections
        const visibleSections = entries.filter(entry => entry.isIntersecting);

        // Always log when in debug mode
        if (debug) {
          // Removed console.log
          // Removed console.log

          // Advanced debug logging
          visibleSections.forEach(entry => {
            console.log(
              `Section "${entry.target.textContent?.substring(0, 30)}..." - intersectionRatio: ${entry.intersectionRatio.toFixed(2)}, top: ${entry.boundingClientRect.top.toFixed(0)}px`
            );
          });

          // Log all entries in debug mode
          if (entries.length > 0 && visibleSections.length === 0) {
            console.log(
              'No visible sections. First entry:',
              entries[0].target.textContent?.substring(0, 30)
            );
            // Removed console.log
            // Removed console.log
          }
        }

        if (visibleSections.length === 0) {
          // Only show intro if we're at the top of the document
          if (window.scrollY < 200) {
            setCurrentSection('(intro)');
            setIsIntroVisible(true);
            lastVisibleSectionRef.current = '(intro)';
          }
          // Otherwise keep displaying the last visible section
          // We don't update state here to keep the current section displayed
          return;
        }

        // Find the topmost section that is touching the hot zone
        // Sort by top position to get the topmost section if multiple are visible
        const sortedSections = [...visibleSections].sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );

        // Take the topmost visible section
        const topSection = sortedSections[0];

        // Get the section title element from the section content container
        const titleElement = topSection.target.querySelector('.section-title');

        // Update state with the section title if found
        if (titleElement && titleElement.textContent) {
          const sectionTitle = titleElement.textContent;
          if (debug) {
            // Removed console.log
          }

          // Always update to ensure the UI reflects the current section
          lastVisibleSectionRef.current = sectionTitle;
          setCurrentSection(sectionTitle);
          setIsIntroVisible(false);
        }
      }, options);

      // Observe all section headers
      sections.forEach(section => {
        observerRef.current?.observe(section);
      });
    }
    // Method 2: Fallback to scroll event listener
    else {
      // Create a fallback that uses scroll events instead of IntersectionObserver
      const detectActiveSection = () => {
        if (sections.length === 0) return;

        // Get hot zone position for scroll detection
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Find which section container is currently touching the hot zone
        let activeSection = null;

        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const rect = section.getBoundingClientRect();

          // Check if this section is touching the hot zone
          // A section is touching the hot zone when its top is at or above the hot zone position
          // and its bottom is at or below the hot zone position
          if (rect.top <= hotZonePosition + additionalOffset && rect.bottom >= hotZonePosition) {
            activeSection = section;
            break;
          }
        }

        if (activeSection) {
          // Get the section title from within the section container
          const titleElement = activeSection.querySelector('.section-title');
          if (titleElement && titleElement.textContent) {
            const sectionTitle = titleElement.textContent;
            // Update state only if section has changed
            if (sectionTitle !== lastVisibleSectionRef.current) {
              lastVisibleSectionRef.current = sectionTitle;
              setCurrentSection(sectionTitle);
              setIsIntroVisible(false);
            }
          }
        } else if (
          scrollTop < 100 // Only reset to intro at the very top
        ) {
          // We're at the top of the document
          lastVisibleSectionRef.current = '(intro)';
          setCurrentSection('(intro)');
          setIsIntroVisible(true);
        }
        // Otherwise, we keep the current section title (don't update state)
      };

      // Initial check and throttled scroll handler
      detectActiveSection();
      const handleScroll = throttle(detectActiveSection, 100);

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        sections.forEach(section => {
          observerRef.current?.unobserve(section);
        });
      }
    };
  }, [sectionHeadingSelector, containerSelector, additionalOffset, debug]);

  // Add keyboard shortcut for debug mode (Ctrl+Shift+Alt+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && e.key === 'S') {
        // Removed console.log
        setDebug(prev => !prev);

        // Show debug UI indicator if debug mode is on
        if (!debug) {
          // Create debug indicator
          const debugIndicator = document.createElement('div');
          debugIndicator.id = 'section-observer-debug';
          debugIndicator.className = 'section-observer-debug';
          debugIndicator.textContent = 'Section Observer Debug: ON';
          debugIndicator.style.position = 'fixed';
          debugIndicator.style.top = '10px';
          debugIndicator.style.right = '10px';
          debugIndicator.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
          debugIndicator.style.color = 'white';
          debugIndicator.style.padding = '5px 10px';
          debugIndicator.style.borderRadius = '3px';
          debugIndicator.style.zIndex = '9999';
          document.body.appendChild(debugIndicator);

          // Create hot zone visualization
          const row1Height = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--row1-height') || '3rem'
          );
          const row2Height = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--row2-height') || '2.5rem'
          );
          const hotZonePosition = row1Height + row2Height;

          const hotZoneElement = document.createElement('div');
          hotZoneElement.id = 'hot-zone-debug';
          hotZoneElement.style.position = 'fixed';
          hotZoneElement.style.top = `${hotZonePosition}px`;
          hotZoneElement.style.left = '0';
          hotZoneElement.style.width = '100%';
          hotZoneElement.style.height = '2px';
          hotZoneElement.style.backgroundColor = 'red';
          hotZoneElement.style.zIndex = '9999';
          document.body.appendChild(hotZoneElement);
        } else {
          // Remove debug elements
          const debugIndicator = document.getElementById('section-observer-debug');
          if (debugIndicator) {
            debugIndicator.remove();
          }

          const hotZoneElement = document.getElementById('hot-zone-debug');
          if (hotZoneElement) {
            hotZoneElement.remove();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Clean up debug elements
      const debugIndicator = document.getElementById('section-observer-debug');
      if (debugIndicator) {
        debugIndicator.remove();
      }

      const hotZoneElement = document.getElementById('hot-zone-debug');
      if (hotZoneElement) {
        hotZoneElement.remove();
      }
    };
  }, [debug]);

  return { currentSection, isIntroVisible };
}
