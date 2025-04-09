import { transformPerplexity } from '../perplexity-transformer';

describe('Perplexity Transformer', () => {
  // Sample Perplexity response
  const samplePerplexityResponse = `What is the capital of France?

Paris is the capital and most populous city of France. It is located on the Seine River, in the north of the country, at the heart of the Île-de-France region.

Paris is known for its art, culture, and history. It is home to many famous landmarks such as the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.

Sources:
https://en.wikipedia.org/wiki/Paris
https://www.britannica.com/place/Paris`;

  describe('transformPerplexity', () => {
    it('should transform a Perplexity response into the standardized format', async () => {
      const result = await transformPerplexity(samplePerplexityResponse);

      // Check that the result has the expected structure
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('metadata');
      expect(result).toHaveProperty('html');
      expect(result).toHaveProperty('text');

      // Check metadata
      expect(result.metadata.title).toBe('What is the capital of France?');
      expect(result.metadata.author).toBe('Perplexity AI');
      expect(result.metadata.categories).toEqual(['AI', 'Perplexity']);
      expect(result.metadata.tags).toEqual(['perplexity', 'ai-response']);
      expect(result.metadata.relatedContent).toEqual([
        'https://en.wikipedia.org/wiki/Paris',
        'https://www.britannica.com/place/Paris',
      ]);

      // Check content structure
      expect(result.content.type).toBe('root');
      expect(Array.isArray(result.content.children)).toBe(true);

      // Check that the question is included as a heading
      const headingNode = result.content.children?.find(
        node =>
          node.type === 'heading' && node.children?.[0]?.value === 'What is the capital of France?'
      );
      expect(headingNode).toBeDefined();

      // Check that the response is included as paragraphs
      const paragraphNodes = result.content.children?.filter(node => node.type === 'paragraph');
      expect(paragraphNodes?.length).toBeGreaterThan(0);

      // Check that the sources are included
      const sourcesHeading = result.content.children?.find(
        node => node.type === 'heading' && node.children?.[0]?.value === 'Sources'
      );
      expect(sourcesHeading).toBeDefined();

      // Check HTML generation
      expect(result.html).toContain('<h1>What is the capital of France?</h1>');
      expect(result.html).toContain('<p>Paris is the capital');
      expect(result.html).toContain('<h2>Sources</h2>');
      expect(result.html).toContain('<a href="https://en.wikipedia.org/wiki/Paris"');

      // Check that the original text is preserved
      expect(result.text).toBe(samplePerplexityResponse);
    });

    it('should handle JSON format if provided', async () => {
      const jsonResponse = JSON.stringify({
        question: 'What is the capital of France?',
        response: 'Paris is the capital of France.',
        sources: ['https://example.com/paris'],
      });

      const result = await transformPerplexity(jsonResponse);

      expect(result.metadata.title).toBe('What is the capital of France?');
      expect(
        result.content.children?.some(
          node =>
            node.type === 'paragraph' &&
            node.children?.[0]?.value === 'Paris is the capital of France.'
        )
      ).toBe(true);
    });

    it('should handle responses without questions or sources', async () => {
      const simpleResponse = 'Paris is the capital of France.';

      const result = await transformPerplexity(simpleResponse);

      expect(result.metadata.title).toBe('Perplexity Response');
      expect(
        result.content.children?.some(
          node =>
            node.type === 'paragraph' &&
            node.children?.[0]?.value === 'Paris is the capital of France.'
        )
      ).toBe(true);
    });
  });
});
