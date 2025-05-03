'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { transformContent } from '@ub-ecosystem/content-transformer';
import { useEffect, useState } from 'react';
import { DocumentReader } from '../document-reader';
import { useTina } from './tina-provider';
export function TinaDocumentLoader({ relativePath, documentType }) {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { client } = useTina();
    useEffect(() => {
        async function loadDocument() {
            try {
                // Inline implementation of fetchDocument to avoid import issues
                // This is a temporary solution until the proper import path is established
                const tinaData = await client.request({
                    query: client.queries[documentType],
                    variables: { relativePath },
                });
                if (!tinaData || !tinaData.data) {
                    throw new Error(`Failed to load document: ${relativePath}`);
                }
                // Extract the content from the Tina response
                // The structure depends on the collection type
                const documentData = tinaData.data[documentType];
                if (!documentData) {
                    throw new Error(`Document not found: ${relativePath}`);
                }
                // Convert the Tina document to markdown
                // This is a simplified approach - in a production environment,
                // you would use a more robust conversion process
                let markdownContent = '';
                // Add frontmatter
                markdownContent += '---\n';
                markdownContent += `title: ${documentData.title || 'Untitled'}\n`;
                if (documentData.author)
                    markdownContent += `author: ${documentData.author}\n`;
                if (documentData.date)
                    markdownContent += `date: ${documentData.date}\n`;
                if (documentData.categories && documentData.categories.length > 0) {
                    markdownContent += `categories: [${documentData.categories.join(', ')}]\n`;
                }
                if (documentData.tags && documentData.tags.length > 0) {
                    markdownContent += `tags: [${documentData.tags.join(', ')}]\n`;
                }
                markdownContent += '---\n\n';
                // Add body content
                if (documentData.body) {
                    markdownContent += documentData.body;
                }
                // Transform the content using the content-transformer package
                const transformedDocument = await transformContent(markdownContent, 'markdown');
                // Set the document
                setDocument(transformedDocument);
            }
            catch (err) {
                console.error('Error loading document:', err);
                setError(err instanceof Error ? err.message : String(err));
            }
            finally {
                setLoading(false);
            }
        }
        loadDocument();
    }, [relativePath, documentType, client]);
    // If loading, show a loading message
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    // If there's an error, show an error message
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    // If there's no document, show an error message
    if (!document) {
        return _jsx("div", { children: "Document not found" });
    }
    // Render the document using our DocumentReader component
    return (_jsx("div", { children: _jsx(DocumentReader, { document: document }) }));
}
//# sourceMappingURL=tina-document-loader.js.map