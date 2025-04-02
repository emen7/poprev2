import React from 'react';

/**
 * Scientific Layout
 * 
 * This layout is used for the scientific section of the application.
 * It provides a consistent structure for all scientific document pages.
 */
export default function ScientificLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scientific-layout">
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Scientific Documents</h1>
          <p className="text-sm">Research papers, articles, and scientific content</p>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer className="bg-gray-100 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} PopRev2 Scientific Documents
          </p>
          <p className="text-sm mt-2">
            <a href="/admin" className="text-blue-500 hover:underline">
              Admin
            </a>
            {' | '}
            <a href="/" className="text-blue-500 hover:underline">
              Home
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export const metadata = {
  title: 'PopRev2 Scientific Documents',
  description: 'Research papers, articles, and scientific content',
};