/**
 * Enhanced Reader Example Page (DEPRECATED)
 *
 * This page demonstrates the deprecated Enhanced Reader component.
 * It is kept for reference purposes but should not be used in new development.
 *
 * Please use the Traditional Reader implementation instead, which provides
 * a more streamlined and focused reading experience that better matches
 * the improved-demo.html design.
 */

import dynamic from &apos;next/dynamic';
import Link from &apos;next/link';
import React from &apos;react';

// Use dynamic import with SSR disabled for the Reader example
// This is necessary because the Reader component uses browser APIs
const EnhancedReaderExample = dynamic(() => import('../../examples/enhanced-reader-example'), {
  ssr: false,
});

/**
 * Enhanced Reader Example Page Component (DEPRECATED)
 */
export default function EnhancedReaderExamplePage() {
  return (
    <div className="enhanced-reader-example-page">
      <div className="fixed inset-x-0 top-0 z-50 bg-yellow-500 p-2 text-center text-black">
        <strong>DEPRECATED:</strong> This example uses the deprecated Enhanced Reader. Please use
        the{' '}
        <Link href="/traditional-test" className="font-bold underline">
          Traditional Reader
        </Link>{' '}
        instead.
      </div>
      <div className="pt-12">
        <EnhancedReaderExample />
      </div>
    </div>
  );
}
