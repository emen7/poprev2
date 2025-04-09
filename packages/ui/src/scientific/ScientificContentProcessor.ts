/**
 * ScientificContentProcessor
 *
 * Processes content to automatically wrap scientific terms with tooltips.
 */

import { TooltipDataRecord } from '../types/TooltipData';

/**
 * Options for processing scientific content
 */
export interface ProcessingOptions {
  /**
   * Whether to process abbreviations
   * @default true
   */
  processAbbreviations?: boolean;

  /**
   * Whether to process equations
   * @default true
   */
  processEquations?: boolean;

  /**
   * Whether to process technical terms
   * @default true
   */
  processTerms?: boolean;

  /**
   * Custom class name to add to the wrapped terms
   */
  customClass?: string;

  /**
   * Whether to make tooltips interactive (show on hover/click)
   * @default true
   */
  interactive?: boolean;

  /**
   * Tooltip position
   * @default 'auto'
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}

/**
 * Default processing options
 */
const defaultOptions: ProcessingOptions = {
  processAbbreviations: true,
  processEquations: true,
  processTerms: true,
  interactive: true,
  position: 'auto',
};

/**
 * Process scientific content to wrap terms with tooltip markup
 *
 * @param content The content to process
 * @param tooltipData The tooltip data record
 * @param options Processing options
 * @returns The processed content with tooltip markup
 */
export function processScientificContent(
  content: string,
  tooltipData: TooltipDataRecord,
  options: ProcessingOptions = {}
): string {
  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options };

  // Create a copy of the content to modify
  let processedContent = content;

  // Process each term in the tooltip data
  Object.entries(tooltipData).forEach(([term, data]) => {
    // Skip processing based on options
    if (
      (data.type === 'abbreviation' && !mergedOptions.processAbbreviations) ||
      (data.type === 'equation' && !mergedOptions.processEquations) ||
      (data.type === 'term' && !mergedOptions.processTerms)
    ) {
      return;
    }

    // Create a regex to match the term
    // For abbreviations, match whole word
    // For equations and terms, match the exact string
    let regex: RegExp;

    if (data.type === 'abbreviation') {
      regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'g');
    } else {
      regex = new RegExp(escapeRegExp(term), 'g');
    }

    // Create the replacement HTML
    const classNames = ['scientific-term', `term-type-${data.type}`];
    if (mergedOptions.customClass) {
      classNames.push(mergedOptions.customClass);
    }

    const tooltipAttributes = [
      `data-tooltip-type="${data.type}"`,
      `data-tooltip-content="${encodeURIComponent(JSON.stringify(data))}"`,
    ];

    if (mergedOptions.interactive !== undefined) {
      tooltipAttributes.push(`data-tooltip-interactive="${mergedOptions.interactive}"`);
    }

    if (mergedOptions.position) {
      tooltipAttributes.push(`data-tooltip-position="${mergedOptions.position}"`);
    }

    const replacement = `<span class="${classNames.join(' ')}" ${tooltipAttributes.join(
      ' '
    )}>${term}</span>`;

    // Replace all occurrences of the term with the tooltip markup
    processedContent = processedContent.replace(regex, replacement);
  });

  return processedContent;
}

/**
 * Initialize tooltips in the DOM
 *
 * This function finds all elements with tooltip data attributes and
 * initializes them with event listeners for showing/hiding tooltips.
 *
 * @param container The container element to search within (defaults to document.body)
 */
export function initializeTooltips(container: HTMLElement = document.body): void {
  // Find all elements with tooltip data attributes
  const tooltipElements = container.querySelectorAll('[data-tooltip-content]');

  tooltipElements.forEach(element => {
    // Get tooltip data
    const tooltipContentAttr = element.getAttribute('data-tooltip-content');
    if (!tooltipContentAttr) return;

    try {
      const tooltipData = JSON.parse(decodeURIComponent(tooltipContentAttr));
      const tooltipType = element.getAttribute('data-tooltip-type') || 'term';
      const interactive = element.getAttribute('data-tooltip-interactive') !== 'false';
      const position = element.getAttribute('data-tooltip-position') || 'auto';

      // Create tooltip element
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'scientific-tooltip';
      tooltipElement.setAttribute('role', 'tooltip');

      // Create tooltip content
      const tooltipContent = document.createElement('div');
      tooltipContent.className = 'tooltip-content';

      // Add appropriate content based on tooltip type
      if (tooltipType === 'abbreviation') {
        const title = document.createElement('div');
        title.className = 'tooltip-title';
        title.textContent = tooltipData.shortForm || '';

        const fullForm = document.createElement('div');
        fullForm.className = 'tooltip-full-form';
        fullForm.textContent = tooltipData.fullForm || '';

        tooltipContent.appendChild(title);
        tooltipContent.appendChild(fullForm);
      } else if (tooltipType === 'equation') {
        const title = document.createElement('div');
        title.className = 'tooltip-title';
        title.textContent = element.textContent || '';

        const fullForm = document.createElement('div');
        fullForm.className = 'tooltip-full-form';
        fullForm.textContent = tooltipData.fullForm || '';

        tooltipContent.appendChild(title);
        tooltipContent.appendChild(fullForm);

        if (tooltipData.simplifiedForm) {
          const simplified = document.createElement('div');
          simplified.className = 'tooltip-simplified';
          simplified.textContent = tooltipData.simplifiedForm;
          tooltipContent.appendChild(simplified);
        }
      } else {
        const title = document.createElement('div');
        title.className = 'tooltip-title';
        title.textContent = element.textContent || '';

        const fullForm = document.createElement('div');
        fullForm.className = 'tooltip-full-form';
        fullForm.textContent = tooltipData.fullForm || '';

        tooltipContent.appendChild(title);
        tooltipContent.appendChild(fullForm);
      }

      // Add context if available
      if (tooltipData.context) {
        const context = document.createElement('div');
        context.className = 'tooltip-context';
        context.textContent = tooltipData.context;
        tooltipContent.appendChild(context);
      }

      // Add related terms if available
      if (tooltipData.relatedTerms && tooltipData.relatedTerms.length > 0) {
        const related = document.createElement('div');
        related.className = 'tooltip-related';

        const relatedLabel = document.createElement('span');
        relatedLabel.className = 'related-label';
        relatedLabel.textContent = 'Related: ';

        related.appendChild(relatedLabel);
        related.appendChild(document.createTextNode(tooltipData.relatedTerms.join(', ')));

        tooltipContent.appendChild(related);
      }

      // Add source if available
      if (tooltipData.source) {
        const source = document.createElement('div');
        source.className = 'tooltip-source';
        source.textContent = tooltipData.source;
        tooltipContent.appendChild(source);
      }

      tooltipElement.appendChild(tooltipContent);

      // Wrap the element in a container
      const wrapper = document.createElement('span');
      wrapper.className = 'scientific-tooltip-wrapper';

      // Replace the element with the wrapper
      const parent = element.parentNode;
      if (parent) {
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
        wrapper.appendChild(tooltipElement);

        // Add event listeners if interactive
        if (interactive) {
          // Detect if we're on a touch device
          const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

          if (isTouchDevice) {
            // For touch devices, show/hide on click
            element.addEventListener('click', e => {
              e.preventDefault();
              tooltipElement.classList.toggle('visible');

              // Position the tooltip
              positionTooltip(element, tooltipElement, position);

              // Add a click event listener to the document to close the tooltip when clicking outside
              if (tooltipElement.classList.contains('visible')) {
                document.addEventListener('click', handleDocumentClick);
              }
            });

            // Function to handle clicks outside the tooltip
            function handleDocumentClick(e: Event) {
              if (
                !tooltipElement.contains(e.target as Node) &&
                !element.contains(e.target as Node)
              ) {
                tooltipElement.classList.remove('visible');
                document.removeEventListener('click', handleDocumentClick);
              }
            }
          } else {
            // For desktop, show/hide on hover
            element.addEventListener('mouseenter', () => {
              tooltipElement.classList.add('visible');
              positionTooltip(element, tooltipElement, position);
            });

            element.addEventListener('mouseleave', () => {
              tooltipElement.classList.remove('visible');
            });
          }
        }
      }
    } catch (error) {
      console.error('Error initializing tooltip:', error);
    }
  });
}

/**
 * Position a tooltip relative to its target element
 *
 * @param targetElement The element the tooltip is for
 * @param tooltipElement The tooltip element
 * @param position The desired position ('top', 'bottom', 'left', 'right', or 'auto')
 */
function positionTooltip(
  targetElement: Element,
  tooltipElement: HTMLElement,
  position: string = 'auto'
): void {
  const targetRect = targetElement.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Remove all position classes
  tooltipElement.classList.remove(
    'tooltip-position-top',
    'tooltip-position-bottom',
    'tooltip-position-left',
    'tooltip-position-right'
  );

  // Calculate the best position if 'auto'
  let calculatedPosition = position;

  if (position === 'auto') {
    // Check if there's enough space above
    if (targetRect.top > tooltipRect.height + 10) {
      calculatedPosition = 'top';
    }
    // Check if there's enough space below
    else if (viewportHeight - targetRect.bottom > tooltipRect.height + 10) {
      calculatedPosition = 'bottom';
    }
    // Check if there's enough space to the right
    else if (viewportWidth - targetRect.right > tooltipRect.width + 10) {
      calculatedPosition = 'right';
    }
    // Default to left if none of the above
    else {
      calculatedPosition = 'left';
    }
  }

  // Add the appropriate position class
  tooltipElement.classList.add(`tooltip-position-${calculatedPosition}`);
}

/**
 * Escape special characters in a string for use in a regular expression
 *
 * @param string The string to escape
 * @returns The escaped string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default {
  processScientificContent,
  initializeTooltips,
};
