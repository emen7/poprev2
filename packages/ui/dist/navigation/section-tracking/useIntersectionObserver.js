import { useEffect, useRef, useState } from 'react';
/**
 * Custom hook for using the Intersection Observer API
 *
 * @param options - IntersectionObserver options
 * @param onIntersect - Callback function to run when intersection occurs
 * @returns A tuple containing the ref to attach to the target element and a boolean indicating if the element is intersecting
 */
export function useIntersectionObserver(options = {}, onIntersect) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting && onIntersect) {
                onIntersect(entry);
            }
        }, {
            root: options.root || null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0,
        });
        observer.observe(current);
        return () => {
            observer.disconnect();
        };
    }, [options.root, options.rootMargin, options.threshold, onIntersect]);
    return [ref, isIntersecting];
}
export default useIntersectionObserver;
//# sourceMappingURL=useIntersectionObserver.js.map