import { jsx as _jsx } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import './ResponsiveFooter.css';
/**
 * ResponsiveFooter Component
 *
 * A footer component that adapts to different screen sizes:
 * - On mobile: Can auto-hide when scrolling down and reappear when scrolling up or tapping
 * - On desktop: Remains fixed at the bottom of the viewport
 */
export function ResponsiveFooter({
  children,
  autoHide = true,
  scrollThreshold = 50,
  className = '',
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Handle scroll events for auto-hiding on mobile
  useEffect(() => {
    if (!isMobile || !autoHide) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Check if we're near the bottom of the page
      const isBottom = windowHeight + currentScrollY > documentHeight - 100;
      setIsNearBottom(isBottom);
      // Always show footer when near the bottom of the page
      if (isBottom) {
        setIsHidden(false);
      } else {
        // Show footer when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY || currentScrollY < scrollThreshold) {
          setIsHidden(false);
        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
          setIsHidden(true);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, autoHide, lastScrollY, scrollThreshold]);
  // Handle touch events for swipe-to-show
  useEffect(() => {
    if (!isMobile || !autoHide) return;
    let touchStartY = 0;
    const handleTouchStart = e => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = e => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      // If swiping up near the bottom of the screen, show the footer
      if (diff > 30 && isNearBottom) {
        setIsHidden(false);
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile, autoHide, isNearBottom]);
  return _jsx('footer', {
    className: `responsive-footer ${isHidden ? 'hidden' : ''} ${className}`,
    'data-mobile': isMobile,
    'data-auto-hide': autoHide,
    children: children,
  });
}
export default ResponsiveFooter;
//# sourceMappingURL=ResponsiveFooter.js.map
