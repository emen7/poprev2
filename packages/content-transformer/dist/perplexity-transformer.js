/**
 * Perplexity Transformer
 *
 * This module handles the transformation of Perplexity AI responses into the standardized
 * internal representation.
 */
/**
 * Transform Perplexity content into the standardized internal representation
 *
 * @param content The Perplexity content as a string
 * @returns A promise that resolves to the transformed content
 */
export async function transformPerplexity(content) {
    // Parse the Perplexity response format
    const parsedContent = parsePerplexityFormat(content);
    // Extract metadata (question, sources, etc.)
    const metadata = extractPerplexityMetadata(parsedContent);
    // Convert to our internal document format
    const transformedContent = convertToInternalFormat(parsedContent);
    // Generate HTML for preview
    const html = generateHtml(transformedContent);
    return {
        content: transformedContent,
        metadata,
        html,
        text: content
    };
}
/**
 * Parse the Perplexity response format
 *
 * @param content The raw Perplexity content
 * @returns The parsed content
 */
function parsePerplexityFormat(content) {
    try {
        // Check if the content is already in JSON format
        try {
            return JSON.parse(content);
        }
        catch (e) {
            // Not JSON, continue with text parsing
        }
        // Parse the Perplexity response format
        // Typically, Perplexity responses have a question, answer, and sources
        const questionMatch = content.match(/^(.*?)\n\n/);
        const question = questionMatch ? questionMatch[1].trim() : '';
        // Extract sources if they exist (typically at the end of the response)
        const sourcesMatch = content.match(/Sources:\s*\n([\s\S]*?)(?:\n\n|$)/);
        const sourcesText = sourcesMatch ? sourcesMatch[1] : '';
        const sources = sourcesText
            .split('\n')
            .map(source => source.trim())
            .filter(source => source.length > 0);
        // The main response is everything between the question and sources
        let response = content;
        if (questionMatch) {
            response = response.substring(questionMatch[0].length);
        }
        if (sourcesMatch) {
            response = response.substring(0, response.indexOf(sourcesMatch[0]));
        }
        response = response.trim();
        return {
            question,
            response,
            sources
        };
    }
    catch (error) {
        console.error('Error parsing Perplexity format:', error);
        // Return a basic structure if parsing fails
        return {
            question: '',
            response: content,
            sources: []
        };
    }
}
/**
 * Extract metadata from Perplexity content
 *
 * @param parsedContent The parsed Perplexity content
 * @returns The extracted metadata
 */
function extractPerplexityMetadata(parsedContent) {
    return {
        title: parsedContent.question || 'Perplexity Response',
        author: 'Perplexity AI',
        date: new Date().toISOString().split('T')[0],
        categories: ['AI', 'Perplexity'],
        tags: ['perplexity', 'ai-response'],
        relatedContent: parsedContent.sources || []
    };
}
/**
 * Convert parsed Perplexity content to our internal format
 *
 * @param parsedContent The parsed Perplexity content
 * @returns The content in our internal format
 */
function convertToInternalFormat(parsedContent) {
    // Create the root node with guaranteed children array
    const rootNode = {
        type: 'root',
        children: [] // Initialize with empty array
    };
    // Add the question as a heading
    if (parsedContent.question && rootNode.children) {
        rootNode.children.push({
            type: 'heading',
            depth: 1,
            children: [{
                    type: 'text',
                    value: parsedContent.question
                }]
        });
    }
    // Process the response content
    const paragraphs = parsedContent.response.split('\n\n');
    for (const paragraph of paragraphs) {
        if (!paragraph.trim())
            continue;
        // Check if this is a heading (starts with # or ##)
        const headingMatch = paragraph.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch && rootNode.children) {
            rootNode.children.push({
                type: 'heading',
                depth: headingMatch[1].length,
                children: [{
                        type: 'text',
                        value: headingMatch[2].trim()
                    }]
            });
            continue;
        }
        // Check if this is a list
        if (paragraph.match(/^[\*\-]\s+/m) && rootNode.children) {
            const listItems = paragraph.split(/\n/).filter((line) => line.trim());
            const listNode = {
                type: 'list',
                ordered: false,
                children: [] // Initialize with empty array
            };
            for (const item of listItems) {
                const itemMatch = item.match(/^[\*\-]\s+(.*)/);
                if (itemMatch && listNode.children) {
                    listNode.children.push({
                        type: 'listItem',
                        children: [{
                                type: 'paragraph',
                                children: [{
                                        type: 'text',
                                        value: itemMatch[1].trim()
                                    }]
                            }]
                    });
                }
            }
            rootNode.children.push(listNode);
            continue;
        }
        // Regular paragraph
        if (rootNode.children) {
            rootNode.children.push({
                type: 'paragraph',
                children: [{
                        type: 'text',
                        value: paragraph.trim()
                    }]
            });
        }
    }
    // Add sources if available
    if (parsedContent.sources && parsedContent.sources.length > 0 && rootNode.children) {
        rootNode.children.push({
            type: 'heading',
            depth: 2,
            children: [{
                    type: 'text',
                    value: 'Sources'
                }]
        });
        const listNode = {
            type: 'list',
            ordered: false,
            children: [] // Initialize with empty array
        };
        for (const source of parsedContent.sources) {
            // Check if the source is a URL
            const urlMatch = source.match(/^(https?:\/\/[^\s]+)(?:\s+(.*))?$/);
            if (urlMatch && listNode.children) {
                const url = urlMatch[1];
                const description = urlMatch[2] || url;
                listNode.children.push({
                    type: 'listItem',
                    children: [{
                            type: 'paragraph',
                            children: [{
                                    type: 'link',
                                    url,
                                    title: description,
                                    children: [{
                                            type: 'text',
                                            value: description
                                        }]
                                }]
                        }]
                });
            }
            else if (listNode.children) {
                listNode.children.push({
                    type: 'listItem',
                    children: [{
                            type: 'paragraph',
                            children: [{
                                    type: 'text',
                                    value: source
                                }]
                        }]
                });
            }
        }
        if (rootNode.children) {
            rootNode.children.push(listNode);
        }
    }
    return rootNode;
}
/**
 * Generate HTML from the internal format
 *
 * @param content The content in internal format
 * @returns The HTML representation
 */
function generateHtml(content) {
    // Simple HTML generation for preview purposes
    let html = '';
    function processNode(node) {
        switch (node.type) {
            case 'root':
                return node.children ? node.children.map(processNode).join('') : '';
            case 'heading':
                const level = node.depth || 1;
                return `<h${level}>${node.children ? node.children.map(processNode).join('') : ''}</h${level}>`;
            case 'paragraph':
                return `<p>${node.children ? node.children.map(processNode).join('') : ''}</p>`;
            case 'text':
                return node.value || '';
            case 'list':
                const tag = node.ordered ? 'ol' : 'ul';
                return `<${tag}>${node.children ? node.children.map(processNode).join('') : ''}</${tag}>`;
            case 'listItem':
                return `<li>${node.children ? node.children.map(processNode).join('') : ''}</li>`;
            case 'link':
                return `<a href="${node.url}" title="${node.title || ''}">${node.children ? node.children.map(processNode).join('') : ''}</a>`;
            default:
                return node.children ? node.children.map(processNode).join('') : '';
        }
    }
    html = processNode(content);
    return html;
}
//# sourceMappingURL=perplexity-transformer.js.map