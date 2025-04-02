/**
 * Navigation Panel Component
 * 
 * This component renders a slide-in navigation panel with navigation items.
 */

'use client';

import React from 'react';
import { NavigationPanelProps } from './types';
import type { NavigationItem } from './types';

/**
 * Navigation Panel Component
 */
// Sample navigation items for demonstration
const sampleNavigationItems: NavigationItem[] = [
  {
    id: 'part1',
    title: 'Part I: Introduction',
    children: [
      {
        id: 'paper1',
        title: 'Paper 1: Overview',
        url: '#paper1'
      },
      {
        id: 'paper2',
        title: 'Paper 2: Concepts',
        url: '#paper2'
      }
    ]
  },
  {
    id: 'part2',
    title: 'Part II: Implementation',
    children: [
      {
        id: 'paper3',
        title: 'Paper 3: Architecture',
        url: '#paper3'
      },
      {
        id: 'paper4',
        title: 'Paper 4: Components',
        url: '#paper4',
        children: [
          {
            id: 'section1',
            title: 'Section 1: Navigation',
            url: '#section1'
          },
          {
            id: 'section2',
            title: 'Section 2: Settings',
            url: '#section2'
          }
        ]
      }
    ]
  }
];

export function NavigationPanel({
  isOpen,
  onClose,
  items = sampleNavigationItems,
  className = '' 
}: NavigationPanelProps) {
  return (
    <nav
      className={`er-navigation-panel ${isOpen ? 'er-open' : ''} ${className}`}
      aria-hidden={!isOpen}
      role="navigation"
    >
      {/* Panel Header */}
      <div className="er-panel-header">
        <h2 className="er-panel-title">Navigation</h2>
        <button
          className="er-panel-close-button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
      
      {/* Panel Content */}
      <div className="er-panel-content">
        {items.length > 0 ? (
          <ul className="er-navigation-list">
            {items.map(item => (
              <NavigationItem key={item.id} item={item} />
            ))}
          </ul>
        ) : (
          <p>No navigation items available.</p>
        )}
      </div>
    </nav>
  );
}

/**
 * Navigation Item Component
 */
function NavigationItem({ item }: { item: NavigationItem }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <li className="er-navigation-item">
      <div className="er-navigation-item-header">
        {item.url ? (
          <a href={item.url} className="er-navigation-item-link">
            {item.title}
          </a>
        ) : (
          <span className="er-navigation-item-text">{item.title}</span>
        )}
        
        {hasChildren && (
          <button 
            className={`er-navigation-item-toggle ${isExpanded ? 'er-expanded' : ''}`}
            onClick={toggleExpand}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <span aria-hidden="true">{isExpanded ? '▼' : '▶'}</span>
          </button>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <ul className="er-navigation-sublist">
          {item.children!.map(child => (
            <NavigationItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}