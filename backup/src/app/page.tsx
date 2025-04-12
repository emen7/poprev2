import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">PopRev2 Platform</h1>
        <p className="text-xl text-gray-600">
          A document transformation and reading system with TinaCMS integration
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Perplexity Example */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4">Perplexity Example</h2>
          <p className="text-gray-600 mb-6">
            See how the system transforms Perplexity AI responses into structured documents.
          </p>
          <Link
            href="/perplexity-example"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          >
            View Perplexity Example
          </Link>
        </div>

        {/* Scientific Documents */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4">Scientific Documents</h2>
          <p className="text-gray-600 mb-6">
            Browse research papers, articles, and scientific content managed through TinaCMS.
          </p>
          <Link
            href="/scientific"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View Scientific Documents
          </Link>
        </div>

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

        {/* TinaCMS Example */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4">TinaCMS Example</h2>
          <p className="text-gray-600 mb-6">
            See how TinaCMS integrates with our document transformation system.
          </p>
          <Link
            href="/tina-example"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            View TinaCMS Example
          </Link>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/admin"
          className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg"
        >
          TinaCMS Admin Interface
        </Link>
        <p className="mt-4 text-gray-500">
          Use the admin interface to create and edit content with TinaCMS.
        </p>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} PopRev2 Platform</p>
        <p className="mt-2">
          <Link href="/test" className="text-blue-500 hover:underline mr-4">
            Test Page
          </Link>
          <Link href="/perplexity-example" className="text-pink-500 hover:underline">
            Perplexity Example
          </Link>
        </p>
      </footer>
    </div>
  );
}
