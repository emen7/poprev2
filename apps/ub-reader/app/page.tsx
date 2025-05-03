'use client';

import Link from &apos;next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          UB Reader - Work Links
        </h1>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Current Work
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/contents"
              className="block rounded-lg bg-green-100 p-4 transition-colors hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800"
            >
              <h3 className="mb-2 font-bold text-green-800 dark:text-green-300">Contents</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Browse the table of contents for the Urantia Book.
              </p>
            </Link>

            <Link
              href="/index.html"
              className="block rounded-lg bg-blue-100 p-4 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
            >
              <h3 className="mb-2 font-bold text-blue-800 dark:text-blue-300">
                Paper 1 Test Page (index.html)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                View the Paper 1 test page for mobile testing.
              </p>
            </Link>

            <Link
              href="/improved-demo.html"
              className="block rounded-lg bg-blue-100 p-4 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
            >
              <h3 className="mb-2 font-bold text-blue-800 dark:text-blue-300">
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
