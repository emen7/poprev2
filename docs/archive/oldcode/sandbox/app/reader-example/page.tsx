/**
 * Reader Example Page
 * 
 * This page demonstrates the Reader component with the Scientific extension.
 */

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for the Reader example
// This is necessary because the Reader component uses browser APIs
const ReaderExample = dynamic(() => import('../../examples/reader-example'), {
  ssr: false
});

/**
 * Reader Example Page Component
 */
export default function ReaderExamplePage() {
  return (
    <div className="reader-example-page">
      <ReaderExample />
    </div>
  );
}