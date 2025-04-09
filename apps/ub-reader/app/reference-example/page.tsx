import React from 'react';
import Link from 'next/link';
import ReferenceExampleClient from './client';

export default function ReferenceExamplePage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">UB Reference Detection Example</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="mb-4">
          This page demonstrates the reference detection and linking functionality for the UB
          Reader. The component automatically detects references to The Urantia Book in text content
          and converts them to interactive links.
        </p>

        {/* Use the client component */}
        <div className="mt-8">
          <ReferenceExampleClient />
        </div>
      </div>
    </div>
  );
}
