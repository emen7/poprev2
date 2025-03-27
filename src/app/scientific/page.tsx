/**
 * Scientific Content Homepage
 * 
 * This page serves as the entry point for the scientific content site.
 */

import Link from 'next/link';

/**
 * Scientific homepage component
 * 
 * @returns React component
 */
export default function ScientificHomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Scientific Content</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore scientific papers, research, and analysis related to The Urantia Book cosmology and other topics.
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Search Scientific Content</h2>
          <p className="mb-4 text-gray-600">
            Use our search tool to find scientific content by keyword, author, or topic.
          </p>
          <div className="flex">
            <Link
              href="/search?type=scientific"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Search Scientific Content
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Cosmology</h3>
            <p className="text-gray-600 mb-4">
              Explore papers on cosmological principles, universe structure, and astronomical observations.
            </p>
            <Link
              href="/search?q=cosmology&type=scientific"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse Cosmology Papers →
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Physics</h3>
            <p className="text-gray-600 mb-4">
              Discover research on physics concepts, energy systems, and physical laws.
            </p>
            <Link
              href="/search?q=physics&type=scientific"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse Physics Papers →
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Mathematics</h3>
            <p className="text-gray-600 mb-4">
              Explore mathematical concepts, models, and applications in scientific research.
            </p>
            <Link
              href="/search?q=mathematics&type=scientific"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse Mathematics Papers →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Featured Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h3 className="font-bold mb-2">
              <Link
                href="/search?q=timescape&type=scientific"
                className="text-blue-600 hover:text-blue-800"
              >
                Exploring the Timescape Model
              </Link>
            </h3>
            <p className="text-sm text-gray-600">
              An analysis of the Timescape Model and its relation to Urantia Book cosmology, with implications for the distance to Andromeda.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h3 className="font-bold mb-2">
              <Link
                href="/search?q=quantum&type=scientific"
                className="text-blue-600 hover:text-blue-800"
              >
                Quantum Computing: Principles and Applications
              </Link>
            </h3>
            <p className="text-sm text-gray-600">
              An overview of quantum computing principles and their potential applications in solving complex computational problems.
            </p>
          </div>
        </div>
      </div>
      
      <footer className="text-center text-gray-500 text-sm">
        <p>Scientific Content Portal - Part of the PopRev2 Project</p>
      </footer>
    </div>
  );
}