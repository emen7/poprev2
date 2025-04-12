'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TinaCMSProvider } from '../../../packages/ui/src/tina';
import { fetchDocumentList } from '../../tina/client';

/**
 * Scientific Documents Index Page
 *
 * This page displays a list of all scientific documents available in the system.
 * It fetches the list from TinaCMS and provides links to individual document pages.
 */
export default function ScientificIndexPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        // Fetch the list of scientific documents from TinaCMS
        const data = await fetchDocumentList('scientific');

        if (!data || !data.scientificConnection || !data.scientificConnection.edges) {
          throw new Error('Failed to load documents');
        }

        // Extract the documents from the response
        const docs = data.scientificConnection.edges.map((edge: any) => edge.node);
        setDocuments(docs);
      } catch (err) {
        console.error('Error loading documents:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  return (
    <TinaCMSProvider>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Scientific Documents</h1>

        {loading && (
          <div className="text-center py-8">
            <p>Loading documents...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Error: {error}</p>
            <p className="mt-2">Using fallback document list for demonstration purposes.</p>
          </div>
        )}

        {/* If we have documents from TinaCMS, display them */}
        {!loading && documents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map(doc => (
              <Link
                key={doc._sys.filename}
                href={`/scientific/${doc._sys.filename}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <h2 className="text-xl font-bold mb-2">{doc.title}</h2>
                  {doc.author && <p className="text-gray-600 mb-2">By: {doc.author}</p>}
                  {doc.date && (
                    <p className="text-gray-500 text-sm mb-2">
                      {new Date(doc.date).toLocaleDateString()}
                    </p>
                  )}
                  {doc.abstract && (
                    <p className="text-gray-700 mt-2 line-clamp-3">{doc.abstract}</p>
                  )}
                  <div className="mt-4">
                    <span className="text-blue-500 hover:underline">Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Fallback for demonstration or when no documents are available */}
        {(!loading && documents.length === 0) || error ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example document 1 */}
            <Link href="/scientific/quantum-computing-advances" className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h2 className="text-xl font-bold mb-2">Quantum Computing Advances</h2>
                <p className="text-gray-600 mb-2">By: Dr. Jane Smith</p>
                <p className="text-gray-500 text-sm mb-2">March 15, 2025</p>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  Recent advances in quantum computing have led to significant breakthroughs in
                  algorithm efficiency and error correction.
                </p>
                <div className="mt-4">
                  <span className="text-blue-500 hover:underline">Read more →</span>
                </div>
              </div>
            </Link>

            {/* Example document 2 */}
            <Link href="/scientific/climate-change-research" className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h2 className="text-xl font-bold mb-2">Climate Change Research</h2>
                <p className="text-gray-600 mb-2">By: Dr. Michael Johnson</p>
                <p className="text-gray-500 text-sm mb-2">February 28, 2025</p>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  New research on climate change impacts reveals accelerating effects on global
                  ecosystems and potential mitigation strategies.
                </p>
                <div className="mt-4">
                  <span className="text-blue-500 hover:underline">Read more →</span>
                </div>
              </div>
            </Link>
          </div>
        ) : null}

        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New Scientific Document
          </Link>
        </div>
      </div>
    </TinaCMSProvider>
  );
}
