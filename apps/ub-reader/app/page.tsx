'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          UB Reader
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Reader UI Development
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/reader-ui-demo"
              className="block p-4 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Reader UI Demo</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Explore different layout options for the UB Reader interface.
              </p>
            </Link>
            <Link
              href="/simple-example"
              className="block p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Simple Example</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                A basic example of the reader components.
              </p>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Content Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/paper/1"
              className="block p-4 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
                Paper 1: The Universal Father
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Read Paper 1 in the standard reader interface.
              </p>
            </Link>
            <Link
              href="/contents"
              className="block p-4 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Contents</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Browse the table of contents for the Urantia Book.
              </p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Other Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/theme-example"
              className="block p-4 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
              <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Theme Example</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Explore different theme options.
              </p>
            </Link>
            <Link
              href="/enhanced-reader-example"
              className="block p-4 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
              <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">
                Enhanced Reader
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Try the enhanced reader features.
              </p>
            </Link>
            <Link
              href="/traditional-reader/0"
              className="block p-4 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
              <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">
                Traditional Reader
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                View the foreword in traditional format.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
