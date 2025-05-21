import React from 'react';
import './SnapPointIndicator.css';

export interface SnapPointIndicatorProps {
  /**
   * The current height of the pullup panel
   */
  currentHeight: number;
  
  /**
   * The snap points configuration
   */
  snapPoints: {
    collapsed: number;
    half: number;
    full: number;
  };
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SnapPointIndicator Component
 * 
 * Visual indicators for the snap points of the pullup panel.
 * Shows which snap point is currently active.
 * 
 * @example
 * ```tsx
 * <SnapPointIndicator
 *   currentHeight={300}
 *   snapPoints={{
 *     collapsed: 100,
 *     half: 300,
 *     full: 600,
 *   }}
 * />
 * ```
 */
export function SnapPointIndicator({ 
  currentHeight, 
  snapPoints, 
  className = '' 
}: SnapPointIndicatorProps) {
  // Determine which snap point is active
  const getActivePoint = () => {
    const points = Object.values(snapPoints);
    const closestPoint = points.reduce((prev, curr) => {
      return Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev;
    });
    
    if (closestPoint === snapPoints.collapsed) return 'collapsed';
    if (closestPoint === snapPoints.half) return 'half';
    if (closestPoint === snapPoints.full) return 'full';
    return null;
  };
  
  const activePoint = getActivePoint();
  
  // Determine container classes
  const containerClasses = ['snap-point-indicator', className].filter(Boolean).join(' ');
  
  return (
    <div className={containerClasses}>
      <div 
        className={`indicator ${activePoint === 'collapsed' ? 'active' : ''}`}
        title="Collapsed"
        aria-label="Collapsed snap point"
      />
      <div 
        className={`indicator ${activePoint === 'half' ? 'active' : ''}`}
        title="Half expanded"
        aria-label="Half expanded snap point"
      />
      <div 
        className={`indicator ${activePoint === 'full' ? 'active' : ''}`}
        title="Fully expanded"
        aria-label="Fully expanded snap point"
      />
    </div>
  );
}

export default SnapPointIndicator;
