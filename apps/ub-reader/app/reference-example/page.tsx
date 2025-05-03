import Link from &apos;next/link';
import React from &apos;react';

import ReferenceExampleClient from './client';

export default function ReferenceExamplePage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-blue-600 hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 size-5"
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

      <h1 className="mb-6 text-3xl font-bold">UB Reference Detection Example</h1>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
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
