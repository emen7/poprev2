/**
 * Metadata Enricher
 *
 * This module handles the extraction and enhancement of metadata from document content.
 * It identifies and extracts key information such as title, author, date, and categories.
 */
/**
 * Enrich the document with metadata
 *
 * @param content The content to enrich
 * @param options Optional configuration for the enrichment process
 * @returns A promise that resolves to the enriched content
 */
export async function enrichMetadata(content, options = {}) {
    // Get existing metadata
    const existingMetadata = content.metadata || {};
    // Extract additional metadata from content if not already present
    const extractedMetadata = extractMetadataFromContent(content.content);
    // Merge existing and extracted metadata, with existing taking precedence
    const mergedMetadata = Object.assign(Object.assign({}, extractedMetadata), existingMetadata);
    // Return the enriched content
    return Object.assign(Object.assign({}, content), { metadata: mergedMetadata });
}
/**
 * Extract metadata from document content
 *
 * @param rootNode The root node of the document
 * @returns The extracted metadata
 */
function extractMetadataFromContent(rootNode) {
    const metadata = {};
    // Extract title from first heading if not already set
    if (!metadata.title) {
        const firstHeading = findFirstHeading(rootNode);
        if (firstHeading) {
            metadata.title = getTextContent(firstHeading);
        }
    }
    // Extract categories and tags from content
    const { categories, tags } = extractCategoriesAndTags(rootNode);
    if (categories.length > 0) {
        metadata.categories = categories;
    }
    if (tags.length > 0) {
        metadata.tags = tags;
    }
    // Extract date from content if possible
    const extractedDate = extractDateFromContent(rootNode);
    if (extractedDate && !metadata.date) {
        metadata.date = extractedDate;
    }
    return metadata;
}
/**
 * Find the first heading in the document
 *
 * @param rootNode The root node of the document
 * @returns The first heading node, or undefined if none found
 */
function findFirstHeading(rootNode) {
    const children = rootNode.children || [];
    // Look for the first heading node
    for (const child of children) {
        if (child.type === 'heading') {
            return child;
        }
    }
    // If no heading found at the top level, search recursively
    for (const child of children) {
        if (child.children && child.children.length > 0) {
            const heading = findFirstHeadingRecursive(child);
            if (heading) {
                return heading;
            }
        }
    }
    return undefined;
}
/**
 * Recursively find the first heading in a node
 *
 * @param node The node to search
 * @returns The first heading node, or undefined if none found
 */
function findFirstHeadingRecursive(node) {
    if (node.type === 'heading') {
        return node;
    }
    if (node.children && node.children.length > 0) {
        for (const child of node.children) {
            const heading = findFirstHeadingRecursive(child);
            if (heading) {
                return heading;
            }
        }
    }
    return undefined;
}
/**
 * Get the text content of a node
 *
 * @param node The node to extract text from
 * @returns The text content of the node
 */
function getTextContent(node) {
    if (node.type === 'text' && node.value) {
        return node.value;
    }
    if (node.children && node.children.length > 0) {
        return node.children.map(getTextContent).join('');
    }
    return '';
}
/**
 * Extract categories and tags from the document content
 *
 * @param rootNode The root node of the document
 * @returns The extracted categories and tags
 */
function extractCategoriesAndTags(rootNode) {
    const categories = [];
    const tags = [];
    // Look for sections that might contain categories or tags
    const children = rootNode.children || [];
    for (let i = 0; i < children.length; i++) {
        const node = children[i];
        // Check for headings that might indicate categories or tags
        if (node.type === 'heading') {
            const headingText = getTextContent(node).toLowerCase();
            if (headingText.includes('categor') || headingText.includes('topic')) {
                // The next node might contain categories
                if (i + 1 < children.length) {
                    const nextNode = children[i + 1];
                    if (nextNode.type === 'list') {
                        // Extract categories from list items
                        const listItems = nextNode.children || [];
                        for (const item of listItems) {
                            if (item.type === 'listItem') {
                                const category = getTextContent(item).trim();
                                if (category) {
                                    categories.push(category);
                                }
                            }
                        }
                    }
                    else if (nextNode.type === 'paragraph') {
                        // Extract categories from paragraph text
                        const text = getTextContent(nextNode);
                        const possibleCategories = text.split(/[,;]/).map(s => s.trim());
                        for (const category of possibleCategories) {
                            if (category) {
                                categories.push(category);
                            }
                        }
                    }
                }
            }
            else if (headingText.includes('tag') || headingText.includes('keyword')) {
                // The next node might contain tags
                if (i + 1 < children.length) {
                    const nextNode = children[i + 1];
                    if (nextNode.type === 'list') {
                        // Extract tags from list items
                        const listItems = nextNode.children || [];
                        for (const item of listItems) {
                            if (item.type === 'listItem') {
                                const tag = getTextContent(item).trim();
                                if (tag) {
                                    tags.push(tag);
                                }
                            }
                        }
                    }
                    else if (nextNode.type === 'paragraph') {
                        // Extract tags from paragraph text
                        const text = getTextContent(nextNode);
                        const possibleTags = text.split(/[,;#]/).map(s => s.trim().replace(/^#/, ''));
                        for (const tag of possibleTags) {
                            if (tag) {
                                tags.push(tag);
                            }
                        }
                    }
                }
            }
        }
    }
    return { categories, tags };
}
/**
 * Extract a date from the document content
 *
 * @param rootNode The root node of the document
 * @returns The extracted date in ISO format (YYYY-MM-DD), or undefined if none found
 */
function extractDateFromContent(rootNode) {
    // Common date formats
    const dateRegexes = [
        // ISO format: 2023-01-15
        /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/,
        // US format: January 15, 2023 or Jan 15, 2023
        /\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.,]?\s+(\d{1,2})(?:st|nd|rd|th)?[.,]?\s+(\d{4})\b/i,
        // European format: 15 January 2023 or 15 Jan 2023
        /\b(\d{1,2})(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.,]?\s+(\d{4})\b/i,
        // Numeric format: 01/15/2023 or 15/01/2023
        /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/
    ];
    // Get all text content
    const allText = getAllText(rootNode);
    // Try each regex
    for (const regex of dateRegexes) {
        const match = allText.match(regex);
        if (match) {
            // Try to parse the date
            try {
                const date = new Date(match[0]);
                if (!isNaN(date.getTime())) {
                    return date.toISOString().split('T')[0];
                }
            }
            catch (e) {
                // Ignore parsing errors and try the next regex
            }
        }
    }
    return undefined;
}
/**
 * Get all text content from a document
 *
 * @param rootNode The root node of the document
 * @returns All text content concatenated
 */
function getAllText(rootNode) {
    let text = '';
    function traverse(node) {
        if (node.type === 'text' && node.value) {
            text += node.value + ' ';
        }
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                traverse(child);
            }
        }
    }
    const children = rootNode.children || [];
    for (const child of children) {
        traverse(child);
    }
    return text;
}
//# sourceMappingURL=metadata-enricher.js.map