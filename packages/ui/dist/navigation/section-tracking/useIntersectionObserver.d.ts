import { RefObject } from 'react';
interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}
/**
 * Custom hook for using the Intersection Observer API
 *
 * @param options - IntersectionObserver options
 * @param onIntersect - Callback function to run when intersection occurs
 * @returns A tuple containing the ref to attach to the target element and a boolean indicating if the element is intersecting
 */
export declare function useIntersectionObserver<T extends Element>(
  options?: IntersectionObserverOptions,
  onIntersect?: (entry: IntersectionObserverEntry) => void
): [RefObject<T>, boolean];
export default useIntersectionObserver;
//# sourceMappingURL=useIntersectionObserver.d.ts.map
