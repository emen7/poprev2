import React, { ReactNode, forwardRef } from 'react';
import './ContentContainer.css';

export interface ContentContainerProps {
  /**
   * The content to be rendered
   */
  children: ReactNode;

  /**
   * Width setting for the content
   * @default 'medium'
   */
  width?: 'narrow' | 'medium' | 'wide';

  /**
   * Whether to center the content horizontally
   * @default true
   */
  centered?: boolean;

  /**
   * Additional padding around the content
   * @default 'normal'
   */
  padding?: 'none' | 'small' | 'normal' | 'large';

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether to enable virtualized scrolling for large content
   * @default false
   */
  virtualized?: boolean;
}

/**
 * ContentContainer Component
 *
 * A container for reader content that provides:
 * - Configurable width settings
 * - Horizontal centering
 * - Padding options
 * - Optional virtualized scrolling for large content
 */
export const ContentContainer = forwardRef<HTMLDivElement, ContentContainerProps>(
  function ContentContainer(
    {
      children,
      width = 'medium',
      centered = true,
      padding = 'normal',
      className = '',
      virtualized = false,
    }: ContentContainerProps,
    ref
  ) {
    const containerClasses = [
      'content-container',
      `content-width-${width}`,
      centered ? 'content-centered' : '',
      `content-padding-${padding}`,
      virtualized ? 'content-virtualized' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses} ref={ref}>
        {children}
      </div>
    );
  }
);

export default ContentContainer;
