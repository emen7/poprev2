/**
 * UB Highlight Module
 * A reusable module for text highlighting in the Urantia Book ecosystem
 */
import { HighlightManagerOptions, HighlightColor, HighlightData } from './types';

/**
 * Highlight Manager Class
 * Manages text highlighting functionality
 */
export class HighlightManager {
  private container: HTMLElement;
  private colors: HighlightColor[];
  private isDarkMode: () => boolean;
  private onHighlight: (data: HighlightData) => void;
  private showHighlights: boolean;
  private selectionMenu: HTMLElement | null;
  private colorPicker: HTMLElement | null;
  private selectedText: string;
  private selectedRange: Range | null;

  /**
   * Create a new HighlightManager
   * @param options - Configuration options
   */
  constructor(options: HighlightManagerOptions) {
    this.container = options.container;
    this.colors = options.colors || this.getDefaultColors();
    this.isDarkMode = options.isDarkMode || (() => false);
    this.onHighlight = options.onHighlight || (() => {});
    this.showHighlights = options.showHighlights !== undefined ? options.showHighlights : true;

    // State
    this.selectionMenu = null;
    this.colorPicker = null;
    this.selectedText = '';
    this.selectedRange = null;

    // Initialize
    this.init();
  }

  /**
   * Get default color options based on research-backed recommendations
   * @returns Array of default color objects
   */
  private getDefaultColors(): HighlightColor[] {
    return [
      // No highlight option (for removing highlights)
      {
        name: 'none',
        lightModeColor: 'transparent',
        darkModeColor: 'inherit',
        displayName: 'No Highlight',
      },
      // Primary: Yellow - Traditional highlighter color, high recognition
      {
        name: 'yellow',
        lightModeColor: 'rgba(255, 245, 120, 0.6)', // More saturated yellow with 60% opacity
        darkModeColor: '#FFDE21', // Yellow for dark mode
      },
      // Orange (formerly Coral) - Warm accent color
      {
        name: 'orange',
        lightModeColor: 'rgba(255, 133, 89, 0.6)', // Coral with 60% opacity for light mode
        darkModeColor: '#FF8559', // Coral for dark mode
      },
      // Soft Pink - Warm accent color
      {
        name: 'pink',
        lightModeColor: 'rgba(255, 193, 204, 0.6)', // Soft pink with 60% opacity
        darkModeColor: '#FFC1CC', // Soft pink for dark mode
      },
      // Pastel Red - Warm accent color
      {
        name: 'red',
        lightModeColor: 'rgba(255, 116, 108, 0.6)', // Pastel red with 60% opacity
        darkModeColor: '#FF746C', // Pastel red for dark mode
      },
      // Lavender - Cool complementary color
      {
        name: 'lavender',
        lightModeColor: 'rgba(179, 156, 208, 0.6)', // Lavender with 60% opacity
        darkModeColor: '#B39CD0', // Lavender for dark mode
      },
      // Light Steel Blue - Cool complementary color
      {
        name: 'blue',
        lightModeColor: 'rgba(176, 196, 222, 0.6)', // Light steel blue with 60% opacity
        darkModeColor: '#B0C4DE', // Light steel blue for dark mode
      },
      // DodgerBlue - Bright blue for dark mode
      {
        name: 'dodgerblue',
        lightModeColor: 'rgba(30, 144, 255, 0.6)', // DodgerBlue with 60% opacity
        darkModeColor: '#1E90FF', // DodgerBlue for dark mode
        displayName: 'Dodger Blue',
      },
      // Pale Green - High contrast option
      {
        name: 'green',
        lightModeColor: 'rgba(152, 251, 152, 0.6)', // Pale green with 60% opacity
        darkModeColor: '#98FB98', // Pale green for dark mode
      },
    ];
  }

  /**
   * Initialize the highlight manager
   */
  private init(): void {
    // Add event listeners
    this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.addEventListener('contextmenu', this.handleContextMenu.bind(this));
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));

    // Add copy event listener to handle copying text in dark mode
    this.container.addEventListener('copy', this.handleCopy.bind(this));

    // Add styles
    this.addStyles();

    // Apply initial visibility state
    this.updateHighlightVisibility();
  }

  /**
   * Handle copy event to ensure text is copied without dark mode styling
   * @param event - The copy event
   */
  private handleCopy(event: ClipboardEvent): void {
    // Only intercept copy in dark mode
    if (!this.isDarkMode()) return;

    // Get the selection
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    // Process the selection to preserve proper paragraph formatting
    const processedText = this.processSelectionForCopy(selection);

    // Set the clipboard data
    event.clipboardData?.setData('text/plain', processedText);

    // Prevent the default copy behavior
    event.preventDefault();
  }

  /**
   * Process selection for copying
   * @param selection - The selection to process
   * @returns The plain text of the selection
   */
  private processSelectionForCopy(selection: Selection): string {
    // Simply return the plain text of the selection
    return selection.toString();
  }

  /**
   * Add required styles to the document
   */
  private addStyles(): void {
    // Check if styles already exist
    if (document.getElementById('ub-highlight-styles')) return;

    // Create style element
    const style = document.createElement('style');
    style.id = 'ub-highlight-styles';

    // Generate CSS for colors
    let css = `
      /* Selection menu */
      .ub-selection-menu {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 8px;
          z-index: 1000;
          display: flex;
          gap: 8px;
          min-width: 150px;
          animation: ub-fadeIn 0.2s ease-in-out;
          transition: background-color 0.3s;
      }
      
      body.dark-mode .ub-selection-menu {
          background-color: rgba(51, 51, 51, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      
      @keyframes ub-fadeIn {
          from {
              opacity: 0;
              transform: translateY(5px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }
      
      .ub-action-button {
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      .ub-action-button:hover {
          background-color: #f0f0f0;
          border-color: #ccc;
      }
      
      body.dark-mode .ub-action-button {
          border-color: #444;
          color: #ddd;
      }
      
      body.dark-mode .ub-action-button:hover {
          background-color: #444;
          border-color: #555;
      }
      
      /* Color picker */
      .ub-color-picker {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 8px;
          z-index: 1000;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 200px;
          animation: ub-fadeIn 0.2s ease-in-out;
      }
      
      body.dark-mode .ub-color-picker {
          background-color: rgba(51, 51, 51, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      
      .ub-color-option {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid #ddd;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
      }
      
      .ub-color-option:hover {
          transform: scale(1.1);
      }
      
      body.dark-mode .ub-color-option {
          border-color: #555;
      }
      
      /* No highlight option */
      .ub-color-option.ub-color-none {
          background-color: white;
          position: relative;
      }
      
      .ub-color-option.ub-color-none::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: red;
          transform: rotate(45deg);
      }
      
      .ub-color-option.ub-color-none::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: red;
          transform: rotate(-45deg);
      }
      
      body.dark-mode .ub-color-option.ub-color-none {
          background-color: #333;
      }
      
      /* Highlight styles */
      .ub-highlight {
          transition: color 0.2s, background-color 0.2s;
      }
      
      /* Hide highlights when showHighlights is false */
      .ub-highlights-hidden .ub-highlight {
          background-color: transparent !important;
          color: inherit !important;
      }
      
      /* Toggle switch */
      .ub-toggle-switch {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
      }
      
      .ub-toggle-switch input[type="checkbox"] {
          height: 0;
          width: 0;
          visibility: hidden;
          position: absolute;
      }
      
      .ub-toggle-switch label {
          cursor: pointer;
          text-indent: -9999px;
          width: 40px;
          height: 20px;
          background: #ddd;
          display: block;
          border-radius: 100px;
          position: relative;
      }
      
      .ub-toggle-switch label:after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 90px;
          transition: 0.3s;
      }
      
      .ub-toggle-switch input:checked + label {
          background: #3498db;
      }
      
      .ub-toggle-switch input:checked + label:after {
          left: calc(100% - 2px);
          transform: translateX(-100%);
      }
      
      .ub-toggle-switch label:active:after {
          width: 24px;
      }
      
      .ub-toggle-switch span {
          font-size: 14px;
      }
      
      body.dark-mode .ub-toggle-switch label {
          background: #555;
      }
      
      body.dark-mode .ub-toggle-switch input:checked + label {
          background: #2980b9;
      }
      
      body.dark-mode .ub-toggle-switch span {
          color: #ddd;
      }
      
      /* Fix for dark mode text selection */
      body.dark-mode ::selection {
          color: #000;
          background-color: rgba(255, 255, 255, 0.7);
      }
    `;

    // Add CSS for each color
    this.colors.forEach(color => {
      if (color.name === 'none') return; // Skip the "none" option

      css += `
        .ub-highlight-${color.name} {
            background-color: ${color.lightModeColor};
        }
        
        body.dark-mode .ub-highlight-${color.name} {
            color: ${color.darkModeColor};
            background-color: inherit;
        }
      `;
    });

    // Add style to document
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Handle mouse up event
   * @param event - The mouse event
   */
  private handleMouseUp(event: MouseEvent): void {
    // Ignore right-click
    if (event.button === 2) return;

    // Get selection
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      this.removeSelectionMenu();
      this.removeColorPicker();
      return;
    }

    // Get selected text
    this.selectedText = selection.toString().trim();
    if (this.selectedText.length < 3) {
      this.removeSelectionMenu();
      this.removeColorPicker();
      return;
    }

    // Store the selection range
    this.selectedRange = selection.getRangeAt(0).cloneRange();

    // Calculate menu position
    const rect = this.selectedRange.getBoundingClientRect();

    const position = {
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + window.scrollX,
    };

    // Create selection menu
    this.createSelectionMenu(position);
  }

  /**
   * Handle context menu event
   * @param event - The mouse event
   */
  private handleContextMenu(event: MouseEvent): void {
    // Get selection
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    // Get selected text
    this.selectedText = selection.toString().trim();
    if (this.selectedText.length < 3) return;

    // Store the selection range
    this.selectedRange = selection.getRangeAt(0).cloneRange();

    // Prevent default context menu
    event.preventDefault();

    // Calculate menu position
    const position = {
      top: event.clientY + window.scrollY,
      left: event.clientX + window.scrollX,
    };

    // Create selection menu
    this.createSelectionMenu(position);
  }

  /**
   * Handle click outside
   * @param event - The mouse event
   */
  private handleClickOutside(event: MouseEvent): void {
    if (
      this.selectionMenu &&
      !this.selectionMenu.contains(event.target as Node) &&
      !this.container.contains(event.target as Node)
    ) {
      this.removeSelectionMenu();
    }
    if (
      this.colorPicker &&
      !this.colorPicker.contains(event.target as Node) &&
      !this.container.contains(event.target as Node)
    ) {
      this.removeColorPicker();
    }
  }

  /**
   * Create selection menu
   * @param position - The position of the menu
   */
  private createSelectionMenu(position: { top: number; left: number }): void {
    // Remove existing menu if any
    this.removeSelectionMenu();
    this.removeColorPicker();

    // Create menu element
    this.selectionMenu = document.createElement('div');
    this.selectionMenu.className = 'ub-selection-menu';
    this.selectionMenu.style.top = `${position.top}px`;
    this.selectionMenu.style.left = `${position.left}px`;

    // Create highlight button
    const highlightButton = document.createElement('button');
    highlightButton.className = 'ub-action-button';
    highlightButton.innerHTML = '🖌️';
    highlightButton.title = 'Highlight text';
    highlightButton.addEventListener('click', () => {
      // Store the current selection range
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        this.selectedRange = selection.getRangeAt(0).cloneRange();
      }

      // Show color picker and remove selection menu
      this.showColorPicker(position);
      this.removeSelectionMenu();
    });

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'ub-action-button';
    copyButton.innerHTML = '📋';
    copyButton.title = 'Copy text';
    copyButton.addEventListener('click', () => {
      // Get the selection
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        // Process the selection for copying
        const processedText = this.processSelectionForCopy(selection);

        // Copy the processed text
        navigator.clipboard
          .writeText(processedText)
          .then(() => {
            alert(
              `Copied: "${processedText.substring(0, 30)}${processedText.length > 30 ? '...' : ''}"`
            );
          })
          .catch(err => {
            console.error('Failed to copy text:', err);
          });
      } else {
        // Fallback to the stored selected text
        navigator.clipboard
          .writeText(this.selectedText)
          .then(() => {
            alert(
              `Copied: "${this.selectedText.substring(0, 30)}${
                this.selectedText.length > 30 ? '...' : ''
              }"`
            );
          })
          .catch(err => {
            console.error('Failed to copy text:', err);
          });
      }

      this.removeSelectionMenu();
    });

    // Create note button
    const noteButton = document.createElement('button');
    noteButton.className = 'ub-action-button';
    noteButton.innerHTML = '📝';
    noteButton.title = 'Add note';
    noteButton.addEventListener('click', () => {
      // Add note (in a real app, this would add a note)
      alert(`Note added for: "${this.selectedText}"`);
      this.removeSelectionMenu();
    });

    // Create quote button
    const quoteButton = document.createElement('button');
    quoteButton.className = 'ub-action-button';
    quoteButton.innerHTML = '💬';
    quoteButton.title = 'Save quote';
    quoteButton.addEventListener('click', () => {
      // Add quote (in a real app, this would save a quote)
      alert(`Quote saved: "${this.selectedText}"`);
      this.removeSelectionMenu();
    });

    // Add buttons to menu
    this.selectionMenu.appendChild(highlightButton);
    this.selectionMenu.appendChild(copyButton);
    this.selectionMenu.appendChild(noteButton);
    this.selectionMenu.appendChild(quoteButton);

    // Add menu to document
    document.body.appendChild(this.selectionMenu);
  }

  /**
   * Show color picker
   * @param position - The position of the color picker
   */
  private showColorPicker(position: { top: number; left: number }): void {
    // Remove existing color picker if any
    this.removeColorPicker();

    // Create color picker element
    this.colorPicker = document.createElement('div');
    this.colorPicker.className = 'ub-color-picker';
    this.colorPicker.style.top = `${position.top}px`;
    this.colorPicker.style.left = `${position.left}px`;

    // Create color options
    this.colors.forEach(color => {
      // Skip colors that are mode-specific
      if (this.isDarkMode() && color.lightModeOnly) return;
      if (!this.isDarkMode() && color.darkModeOnly) return;

      const colorOption = document.createElement('div');
      colorOption.className = `ub-color-option`;
      if (color.name === 'none') {
        colorOption.classList.add('ub-color-none');
        colorOption.title = color.displayName || 'Remove highlight';
      } else {
        colorOption.title = color.displayName || color.name;
        colorOption.style.backgroundColor = this.isDarkMode()
          ? color.darkModeColor
          : color.lightModeColor;
      }

      colorOption.addEventListener('click', () => {
        this.applyHighlight(color.name);
        this.removeColorPicker();
      });
      this.colorPicker?.appendChild(colorOption);
    });

    // Add toggle switch for showing/hiding highlights
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'ub-toggle-switch';

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.id = 'ub-toggle-highlights';
    toggleInput.checked = this.showHighlights;
    toggleInput.addEventListener('change', () => {
      this.showHighlights = toggleInput.checked;
      this.updateHighlightVisibility();
    });

    const toggleLabel = document.createElement('label');
    toggleLabel.htmlFor = 'ub-toggle-highlights';
    toggleLabel.textContent = 'Toggle highlights';

    const toggleText = document.createElement('span');
    toggleText.textContent = 'Show highlights';

    toggleContainer.appendChild(toggleInput);
    toggleContainer.appendChild(toggleLabel);
    toggleContainer.appendChild(toggleText);

    this.colorPicker.appendChild(document.createElement('hr'));
    this.colorPicker.appendChild(toggleContainer);

    // Add color picker to document
    document.body.appendChild(this.colorPicker);
  }

  /**
   * Update highlight visibility based on showHighlights setting
   */
  public updateHighlightVisibility(): void {
    if (this.showHighlights) {
      document.body.classList.remove('ub-highlights-hidden');
    } else {
      document.body.classList.add('ub-highlights-hidden');
    }
  }

  /**
   * Apply highlight to selected text
   * @param colorName - The name of the color to apply
   */
  public applyHighlight(colorName: string): void {
    // Use the stored range if available
    if (!this.selectedRange) {
      console.error('No selection range available');
      return;
    }

    try {
      // If the color is 'none', remove any existing highlights in the selection
      if (colorName === 'none') {
        this.removeHighlightsInRange(this.selectedRange);

        // Clear selection
        window.getSelection()?.removeAllRanges();

        // Call the onHighlight callback
        this.onHighlight({
          text: this.selectedText,
          color: null,
          range: this.selectedRange,
        });

        // Reset stored range
        this.selectedRange = null;

        console.log('Removed highlight');
        return;
      }

      // Create a class name for the highlight
      const className = `ub-highlight ub-highlight-${colorName}`;

      // Create a document fragment to hold the highlighted content
      const fragment = document.createDocumentFragment();

      // Clone the range to avoid modifying the original
      const rangeClone = this.selectedRange.cloneRange();

      // Extract the contents of the range
      const contents = rangeClone.extractContents();

      // Process the extracted contents to apply highlighting
      this.processContentsForHighlighting(contents, className);

      // Append the processed contents to the fragment
      fragment.appendChild(contents);

      // Insert the fragment back into the document
      rangeClone.insertNode(fragment);

      // Clear selection
      window.getSelection()?.removeAllRanges();

      // Call the onHighlight callback
      this.onHighlight({
        text: this.selectedText,
        color: colorName,
        range: this.selectedRange,
      });

      // Reset stored range
      this.selectedRange = null;

      console.log(`Applied highlight with color: ${colorName}`);
    } catch (error) {
      console.error('Error applying highlight:', error);
      alert('Could not apply highlight: ' + (error as Error).message);
    }
  }

  /**
   * Process contents for highlighting
   * @param contents - The contents to process
   * @param className - The class name to apply
   */
  private processContentsForHighlighting(contents: DocumentFragment, className: string): void {
    // Create a TreeWalker to iterate through all text nodes
    // Create a filter for the TreeWalker
    const filter: NodeFilter = {
      acceptNode(node: Node): number {
        // Skip empty text nodes
        if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    };

    // Create a TreeWalker to iterate through all text nodes
    const walker = document.createTreeWalker(contents, NodeFilter.SHOW_TEXT, filter);

    // Collect all text nodes
    const textNodes: Node[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    // Process each text node
    textNodes.forEach(textNode => {
      // Skip if the text node is already inside a highlight
      const parent = textNode.parentNode;
      if (parent && (parent as HTMLElement).classList?.contains('ub-highlight')) {
        // Update the class of the existing highlight
        (parent as HTMLElement).className = className;
        return;
      }

      // Create a highlight span
      const highlightSpan = document.createElement('span');
      highlightSpan.className = className;

      // Replace the text node with the highlight span
      parent?.insertBefore(highlightSpan, textNode);
      highlightSpan.appendChild(textNode);
    });
  }

  /**
   * Remove all highlights within a range
   * @param range - The range to remove highlights from
   */
  private removeHighlightsInRange(range: Range): void {
    // Extract the contents of the range
    const contents = range.extractContents();

    // Create a filter for the TreeWalker
    const filter: NodeFilter = {
      acceptNode(node: Node): number {
        return NodeFilter.FILTER_ACCEPT;
      },
    };

    // Create a TreeWalker to iterate through all text nodes
    const walker = document.createTreeWalker(contents, NodeFilter.SHOW_TEXT, filter);

    // Collect all text nodes
    const textNodes: Node[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    // Process each text node
    textNodes.forEach(textNode => {
      // Check if the parent is a highlight
      const parent = textNode.parentNode;
      if (parent && (parent as HTMLElement).classList?.contains('ub-highlight')) {
        // Replace the highlight with the text node
        parent.parentNode?.insertBefore(textNode, parent);
        parent.parentNode?.removeChild(parent);
      }
    });

    // Insert the processed contents back into the document
    range.insertNode(contents);
  }

  /**
   * Get all text nodes within a range
   * @param range - The range to get text nodes from
   * @returns Array of text nodes
   */
  private getTextNodesInRange(range: Range): Node[] {
    const textNodes: Node[] = [];

    // Get the common ancestor
    const commonAncestor = range.commonAncestorContainer;

    // If the common ancestor is a text node, return it
    if (commonAncestor.nodeType === Node.TEXT_NODE) {
      return [commonAncestor];
    }

    // Create a filter for the TreeWalker
    const filter: NodeFilter = {
      acceptNode(node: Node): number {
        // Skip empty text nodes
        if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;

        // Create a range for the node
        const nodeRange = document.createRange();
        nodeRange.selectNode(node);

        // Check if the node intersects with the range
        if (range.intersectsNode(node)) {
          return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_REJECT;
      },
    };

    // Create a TreeWalker to iterate through all text nodes
    const walker = document.createTreeWalker(commonAncestor, NodeFilter.SHOW_TEXT, filter);

    // Collect all text nodes
    let node: Node | null;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    return textNodes;
  }

  /**
   * Remove selection menu
   */
  private removeSelectionMenu(): void {
    if (this.selectionMenu) {
      document.body.removeChild(this.selectionMenu);
      this.selectionMenu = null;
    }
  }

  /**
   * Remove color picker
   */
  private removeColorPicker(): void {
    if (this.colorPicker) {
      document.body.removeChild(this.colorPicker);
      this.colorPicker = null;
    }
  }

  /**
   * Set whether to show highlights
   * @param show - Whether to show highlights
   */
  public setShowHighlights(show: boolean): void {
    this.showHighlights = show;
    this.updateHighlightVisibility();
  }

  /**
   * Toggle highlight visibility
   * @returns The new visibility state
   */
  public toggleHighlights(): boolean {
    this.showHighlights = !this.showHighlights;
    this.updateHighlightVisibility();
    return this.showHighlights;
  }

  /**
   * Destroy the highlight manager
   * Removes event listeners and cleans up
   */
  public destroy(): void {
    // Remove event listeners
    this.container.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.removeEventListener('contextmenu', this.handleContextMenu.bind(this));
    this.container.removeEventListener('copy', this.handleCopy.bind(this));
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));

    // Remove UI elements
    this.removeSelectionMenu();
    this.removeColorPicker();
  }
}
