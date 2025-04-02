import React from 'react';
import { TinaDocumentLoader } from '../../components/tina-document-loader';

// This page demonstrates how to use TinaCMS with our document transformation system
export default function TinaExamplePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">TinaCMS Document Example</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TinaDocumentLoader
          relativePath="hello-world.md"
          documentType="post"
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">About This Example</h2>
        <p className="mb-4">
          This page demonstrates how to use TinaCMS with our document transformation system.
          The document above is fetched from the content directory and transformed to our internal format.
        </p>
        <p className="mb-4">
          To edit this document, go to the <a href="/admin" className="text-blue-500 hover:underline">TinaCMS admin interface</a>.
        </p>
        <p className="mb-4">
          To learn more about TinaCMS, check out the <a href="https://tina.io/docs" className="text-blue-500 hover:underline">TinaCMS documentation</a>.
        </p>
        <p>
          <strong>Note:</strong> This example is using a simplified approach for demonstration purposes.
          In a production environment, you would use the TinaCMS client to fetch content directly from the TinaCMS API.
        </p>
      </div>
    </div>
  );
}