/**
 * Markdown Transformer
 *
 * This module handles the transformation of markdown content into the standardized
 * internal representation using the unified.js ecosystem (remark/rehype).
 */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
/**
 * Extract metadata from markdown frontmatter if present
 *
 * @param content The markdown content
 * @returns An object containing the extracted metadata and the content without frontmatter
 */
function extractFrontmatter(content) {
    // Simple frontmatter extraction (YAML between --- delimiters)
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);
    if (!match) {
        return { metadata: {}, content };
    }
    const frontmatter = match[1];
    const contentWithoutFrontmatter = content.slice(match[0].length);
    // Parse YAML frontmatter
    const metadata = {};
    frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            const value = valueParts.join(':').trim();
            metadata[key.trim()] = value;
        }
    });
    return { metadata, content: contentWithoutFrontmatter };
}
/**
 * Transform markdown content into the standardized internal representation
 *
 * @param content The markdown content to transform
 * @returns A promise that resolves to the transformed content
 */
export async function transformMarkdown(content) {
    // Extract frontmatter metadata if present
    const { metadata, content: contentWithoutFrontmatter } = extractFrontmatter(content);
    // Parse markdown to AST
    const markdownAST = unified()
        .use(remarkParse)
        .parse(contentWithoutFrontmatter);
    // Convert to HTML for preview/display purposes
    const html = String(await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(contentWithoutFrontmatter));
    // Convert the remark AST to our internal representation
    const transformedContent = convertRemarkAstToInternalFormat(markdownAST);
    return {
        content: transformedContent,
        metadata,
        html
    };
}
/**
 * Convert a remark AST to our internal document representation format
 *
 * @param ast The remark AST to convert
 * @returns The converted AST in our internal format
 */
function convertRemarkAstToInternalFormat(ast) {
    // Start with the root node
    const root = {
        type: 'root',
        children: []
    };
    // Process each child node
    if (ast.children && Array.isArray(ast.children)) {
        root.children = ast.children.map(convertNode);
    }
    return root;
}
/**
 * Convert a single remark node to our internal format
 *
 * @param node The remark node to convert
 * @returns The converted node in our internal format
 */
function convertNode(node) {
    // Base node structure
    const convertedNode = {
        type: node.type
    };
    // Copy relevant properties based on node type
    switch (node.type) {
        case 'heading':
            convertedNode.depth = node.depth;
            break;
        case 'list':
            convertedNode.ordered = node.ordered;
            if (node.start !== null && node.start !== undefined) {
                convertedNode.start = node.start;
            }
            break;
        case 'link':
            convertedNode.url = node.url;
            if (node.title) {
                convertedNode.title = node.title;
            }
            break;
        case 'image':
            convertedNode.url = node.url;
            if (node.alt) {
                convertedNode.alt = node.alt;
            }
            if (node.title) {
                convertedNode.title = node.title;
            }
            break;
        case 'code':
            if (node.lang) {
                convertedNode.lang = node.lang;
            }
            if (node.meta) {
                convertedNode.meta = node.meta;
            }
            convertedNode.value = node.value;
            break;
        case 'inlineCode':
        case 'text':
            convertedNode.value = node.value;
            break;
        case 'table':
            if (node.align) {
                convertedNode.align = node.align;
            }
            break;
    }
    // Process children recursively
    if (node.children && Array.isArray(node.children)) {
        convertedNode.children = node.children.map(convertNode);
    }
    return convertedNode;
}
//# sourceMappingURL=markdown-transformer.js.map