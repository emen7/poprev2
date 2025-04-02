import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">PopRev2 Platform Sandbox</h1>
        <p className="text-xl text-gray-600">
          A development playground and demonstration environment for the PopRev2 platform
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Example Page */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4">Document Example</h2>
          <p className="text-gray-600 mb-6">
            See a demonstration of the document transformation system and reader component.
          </p>
          <Link
            href="/example"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            View Example
          </Link>
        </div>

        {/* Scientific Test Page */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4">Scientific Document</h2>
          <p className="text-gray-600 mb-6">
            View a sample scientific document using the document reader component.
          </p>
          <Link
            href="/test"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View Scientific Document
          </Link>
        </div>

        {/* More examples can be added here as they are migrated */}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About the Sandbox</h2>
        <p className="mb-4">
          The Sandbox is a development playground and demonstration environment for the PopRev2 platform. 
          It contains examples, prototypes, and test implementations that showcase the capabilities of 
          the platform's components and utilities.
        </p>
        <p>
          This environment uses the shared packages from the PopRev2 monorepo, demonstrating how they 
          can be used together to create powerful document transformation and reading experiences.
        </p>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} PopRev2 Platform Sandbox
        </p>
      </footer>
    </div>
  );
}