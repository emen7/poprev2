import React from 'react';
import { TinaDocumentLoader } from '../../../components/tina-document-loader';
import { TinaCMSProvider } from '../../../components/tina-provider';

/**
 * Scientific Document Page
 *
 * This page displays a scientific document fetched from TinaCMS.
 * It uses the TinaDocumentLoader component to fetch and transform the document.
 */
interface ScientificDocumentPageProps {
  params: {
    slug: string;
  };
}

export default function ScientificDocumentPage({ params }: ScientificDocumentPageProps) {
  const { slug } = params;

  return (
    <TinaCMSProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TinaDocumentLoader relativePath={`${slug}.md`} documentType="scientific" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About This Document</h2>
          <p className="mb-4">
            This scientific document is managed through TinaCMS and transformed using our document
            transformation system.
          </p>
          <p>
            <a href="/admin" className="text-blue-500 hover:underline">
              Edit this document
            </a>
          </p>
        </div>
      </div>
    </TinaCMSProvider>
  );
}

/**
 * Generate static params for the page
 *
 * In a production environment, you would fetch the list of documents from TinaCMS
 * and generate static params for each document.
 */
export async function generateStaticParams() {
  // For demonstration purposes, we'll return a static list
  // In a production environment, you would fetch this from TinaCMS
  return [{ slug: 'quantum-computing-advances' }, { slug: 'climate-change-research' }];
}
