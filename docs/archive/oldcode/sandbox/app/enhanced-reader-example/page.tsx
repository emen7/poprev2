/**
 * Enhanced Reader Example Page
 * 
 * This page demonstrates the enhanced Reader component with the new
 * navigation and settings features.
 */

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for the Reader example
// This is necessary because the Reader component uses browser APIs
const EnhancedReaderExample = dynamic(() => import('../../../examples/enhanced-reader-example'), {
  ssr: false
});

/**
 * Enhanced Reader Example Page Component
 */
export default function EnhancedReaderExamplePage() {
  return (
    <div className="enhanced-reader-example-page">
      <EnhancedReaderExample />
    </div>
  );
}
