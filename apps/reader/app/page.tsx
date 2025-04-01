import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">UB Reader</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Pages</h2>
        
        <ul className="space-y-2">
          <li>
            <Link href="/test-preferences" className="text-blue-500 hover:underline">
              Test User Preferences
            </Link>
          </li>
          <li>
            <Link href="/paper/1" className="text-blue-500 hover:underline">
              Paper 1
            </Link>
          </li>
          <li>
            <Link href="/simple-example" className="text-blue-500 hover:underline">
              Simple Example
            </Link>
          </li>
          <li>
            <Link href="/enhanced-example" className="text-blue-500 hover:underline">
              Enhanced Reader Example
            </Link>
          </li>
          <li>
            <Link href="/perplexity-example" className="text-blue-500 hover:underline">
              Perplexity Transformer Example
            </Link>
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">New</span>
          </li>
          <li>
            <Link href="/perplexity-test" className="text-blue-500 hover:underline">
              Perplexity Test Page
            </Link>
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">New</span>
          </li>
        </ul>
      </div>
    </div>
  );
}