/**
 * Perplexity Example Page
 *
 * This page demonstrates the Perplexity transformer in action.
 */

import { transformContent } from '../../../packages/content-transformer/src';
import { DocumentReader } from '../../components/document-reader';

// Sample Perplexity response
const samplePerplexityResponse = `What is the Urantia Book?

The Urantia Book is a spiritual and philosophical text that was first published in 1955 by the Urantia Foundation. It claims to have been authored by celestial beings as a revelation to Earth (referred to as "Urantia" in the book).

The book is divided into four parts:
- The Central and Superuniverses
- The Local Universe
- The History of Urantia
- The Life and Teachings of Jesus

The Urantia Book presents a complex cosmology, describing the origin and structure of the universe, the relationship between God and humans, and provides an extensive rewriting of human history and a detailed narrative of Jesus's life not found in the Bible.

The text combines elements of science, philosophy, and religion, attempting to reconcile religious faith with scientific facts and philosophical understandings. It presents itself as a revelation meant to expand cosmic consciousness and enhance spiritual perception.

While it has a dedicated following around the world, the Urantia Book is not generally recognized as scripture by mainstream religious organizations. The exact authorship remains controversial, with the Urantia Foundation maintaining it was authored by celestial beings, while critics suggest it was written by humans, possibly by a Chicago psychiatrist named William S. Sadler or others in his circle.

Sources:
https://www.urantia.org/urantia-book/read-urantia-book-online
https://en.wikipedia.org/wiki/The_Urantia_Book`;

export default async function PerplexityExamplePage() {
  // Transform the sample Perplexity response
  const transformedDocument = await transformContent(samplePerplexityResponse, 'perplexity');

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Perplexity Transformer Example</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <DocumentReader document={transformedDocument} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Raw Transformed Data</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(transformedDocument, null, 2)}
        </pre>
      </div>
    </div>
  );
}
