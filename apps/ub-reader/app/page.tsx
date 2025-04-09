import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">UB Reader</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 border-blue-500">
          <h2 className="text-xl font-semibold mb-3">Traditional Reader</h2>
          <p className="mb-4">
            The primary UB Reader implementation with navigation functionality.
          </p>
          <Link
            href="/traditional-reader"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Traditional Reader
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Contents</h2>
          <p className="mb-4">
            Comprehensive table of contents with links to all papers and sections.
          </p>
          <Link
            href="/contents"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Contents
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Papers List</h2>
          <p className="mb-4">
            Complete list of all papers organized by parts with author information.
          </p>
          <Link
            href="/papers"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Papers List
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Reading History</h2>
          <p className="mb-4">View your reading history and quickly access recently read papers.</p>
          <Link
            href="/history"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View History
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Paper Example</h2>
          <p className="mb-4">View a sample paper with the enhanced reader interface.</p>
          <Link
            href="/paper/1"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Paper 1
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Theme Example</h2>
          <p className="mb-4">
            Demonstrates the Modern and Traditional themes with various content elements.
          </p>
          <Link
            href="/theme-example"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Example
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Reference Detection</h2>
          <p className="mb-4">
            Demonstrates automatic detection and linking of references to The Urantia Book.
          </p>
          <Link
            href="/reference-example"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Example
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md opacity-60">
          <div className="absolute top-2 right-2 bg-yellow-500 text-xs text-black px-2 py-1 rounded">
            Deprecated
          </div>
          <h2 className="text-xl font-semibold mb-3">Enhanced Reader Example</h2>
          <p className="mb-4">Legacy enhanced reader implementation (deprecated).</p>
          <Link
            href="/enhanced-reader-example"
            className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            View Example
          </Link>
        </div>
      </div>
    </div>
  );
}
