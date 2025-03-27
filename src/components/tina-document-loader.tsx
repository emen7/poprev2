"use client";

import React, { useEffect, useState } from 'react';
import { DocumentReader } from './document-reader';
import { TransformedDocument } from '../lib/document-transformer/types';

interface TinaDocumentLoaderProps {
  relativePath: string;
  documentType: 'post' | 'scientific' | 'perplexity' | 'lectionary';
}

export function TinaDocumentLoader({ relativePath, documentType }: TinaDocumentLoaderProps) {
  const [document, setDocument] = useState<TransformedDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocument() {
      try {
        // For now, we'll use a simple fetch to get the content
        // In a production environment, you would use the TinaCMS client
        const response = await fetch(`/api/content?path=${documentType === 'post' ? 'posts' : documentType}/${relativePath}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load document: ${response.statusText}`);
        }
        
        const content = await response.text();
        
        // Import the transformation system
        const { transformDocument } = await import('../lib/document-transformer');
        
        // Transform the content
        const transformedDocument = await transformDocument(content, 'markdown');
        
        // Set the document
        setDocument(transformedDocument);
      } catch (err) {
        console.error('Error loading document:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    
    loadDocument();
  }, [relativePath, documentType]);

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If there's no document, show an error message
  if (!document) {
    return <div>Document not found</div>;
  }

  // Render the document using our DocumentReader component
  return (
    <div>
      <DocumentReader document={document} />
    </div>
  );
}