import React, { useEffect, useState } from 'react';
import './ResponsiveHeader.css';

export interface ResponsiveHeaderProps {
  /**
   * The content to be rendered in the header
   */
  children: React.ReactNode;

  /**
   * Whether to auto-hide the header on scroll (mobile only)
   * @default true
   */
  autoHide?: boolean;

  /**
   * Threshold in pixels for when to start hiding the header
   * @default 50
   */
  scrollThreshold?: number;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ResponsiveHeader Component
 *
 * A header component that adapts to different screen sizes:
 * - On mobile: Can auto-hide when scrolling down and reappear when scrolling up
 * - On desktop: Remains fixed at the top of the viewport
 */
export function ResponsiveHeader({
  children,
  autoHide = true,
  scrollThreshold = 50,
  className = '',
}: ResponsiveHeaderProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < scrollThreshold) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsHidden(true);
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

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const diff = touchY - touchStartY;

      // If swiping down near the top of the screen, show the header
      if (diff > 30 && window.scrollY < 100) {
        setIsHidden(false);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile, autoHide]);

  return (
    <header
      className={`responsive-header ${isHidden ? 'hidden' : ''} ${className}`}
      data-mobile={isMobile}
      data-auto-hide={autoHide}
    >
      {children}
    </header>
  );
}

export default ResponsiveHeader;
