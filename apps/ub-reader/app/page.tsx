'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          UB Reader - Work Links
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Current Work
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/contents"
              className="block p-4 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Contents</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Browse the table of contents for the Urantia Book.
              </p>
            </Link>

            <Link
              href="/index.html"
              className="block p-4 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                Paper 1 Test Page (index.html)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                View the Paper 1 test page for mobile testing.
              </p>
            </Link>

            <Link
              href="/improved-demo.html"
              className="block p-4 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                Improved Demo Page
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                View the improved demo with section row and other UI enhancements.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
