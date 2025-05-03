import { useEffect, useRef, RefObject } from 'react';

/**
 * Hook to manage focus when a component mounts
 *
 * @param shouldFocus - Whether the element should receive focus
 * @returns A ref to attach to the element that should receive focus
 */
export const useFocusOnMount = <T extends HTMLElement>(
  shouldFocus: boolean = true
): RefObject<T> => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (shouldFocus && elementRef.current) {
      elementRef.current.focus();
    }
  }, [shouldFocus]);

  return elementRef;
};

/**
 * Hook to restore focus to a previously focused element when a component unmounts
 *
 * @returns A function to save the currently focused element
 */
export const useRestoreFocus = (): (() => void) => {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const saveFocus = (): void => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
  };

  useEffect(() => {
    return () => {
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, []);

  return saveFocus;
};

/**
 * Gets all focusable elements within a container
 *
 * @param container - The container element
 * @returns An array of focusable elements
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  const elements = container.querySelectorAll(focusableSelectors.join(','));
  return Array.from(elements) as HTMLElement[];
};

/**
 * Creates a focus trap within a container
 *
 * @param containerRef - Reference to the container element
 * @param isActive - Whether the focus trap is active
 * @returns An object with functions to activate and deactivate the focus trap
 */
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  isActive: boolean = false
): { activate: () => void; deactivate: () => void } => {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const activate = (): void => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    if (containerRef.current) {
      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        containerRef.current.focus();
      }
    }
  };

  const deactivate = (): void => {
    if (previouslyFocusedElement.current) {
      previouslyFocusedElement.current.focus();
    }
  };

  useEffect(() => {
    if (isActive) {
      activate();
    }

    return () => {
      if (isActive) {
        deactivate();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return { activate, deactivate };
};
