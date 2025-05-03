/**
 * Creates visually hidden text for screen readers
 *
 * @param text - The text to be read by screen readers
 * @returns An object with the necessary CSS properties
 */
export const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
};

/**
 * CSS class for visually hidden elements that should be read by screen readers
 */
export const SR_ONLY_CLASS = 'sr-only';

/**
 * Announces a message to screen readers using an ARIA live region
 *
 * @param message - The message to announce
 * @param priority - The priority level ('polite' or 'assertive')
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  // Create or find the live region element
  let liveRegion = document.getElementById(`sr-live-region-${priority}`);

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = `sr-live-region-${priority}`;
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-relevant', 'additions');
    liveRegion.setAttribute('aria-atomic', 'true');

    // Apply sr-only styles
    Object.assign(liveRegion.style, srOnly);

    document.body.appendChild(liveRegion);
  }

  // Update the live region with the new message
  liveRegion.textContent = '';

  // Use setTimeout to ensure the DOM update is recognized as a change
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }, 50);
};

/**
 * Generates a descriptive label for an element based on its content
 *
 * @param content - The content to describe
 * @param prefix - Optional prefix for the description
 * @returns A descriptive label for screen readers
 */
export const generateAriaLabel = (content: string, prefix?: string): string => {
  const cleanContent = content.trim().replace(/\s+/g, ' ');
  return prefix ? `${prefix}: ${cleanContent}` : cleanContent;
};
