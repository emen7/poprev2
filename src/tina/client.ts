import { createClient } from "tinacms";
import { queries } from "./__generated__/types";

/**
 * TinaCMS Client
 * 
 * This client connects to the TinaCMS backend and provides methods for fetching content.
 * It's used by the TinaCMSProvider to make the client available throughout the application.
 */

// Initialize the TinaCMS client with the generated queries
export const client = createClient({
  url: process.env.NEXT_PUBLIC_TINA_GRAPHQL_URL || "https://content.tinajs.io/content/c9d9f9f9-9c9c-9c9c-9c9c-9c9c9c9c9c9c/github/main",
  token: process.env.TINA_TOKEN,
  queries,
  // Enable local mode for development without requiring a token
  // This will use local content from the content directory
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
});

/**
 * Fetch a document by its relative path and collection name
 * 
 * @param relativePath The relative path to the document
 * @param collection The collection name (post, scientific, lectionary, ubgems, ubcatechism)
 * @returns The document data and query variables
 */
export async function fetchDocument(relativePath: string, collection: string) {
  try {
    // Use the appropriate query based on the collection
    let query;
    let variables: Record<string, any> = { relativePath };

    switch (collection) {
      case 'post':
        query = queries.post;
        break;
      case 'scientific':
        query = queries.scientific;
        break;
      case 'lectionary':
        query = queries.lectionary;
        break;
      case 'ubgems':
        query = queries.ubgems;
        break;
      case 'ubcatechism':
        query = queries.ubcatechism;
        break;
      default:
        throw new Error(`Unknown collection: ${collection}`);
    }

    // Execute the query
    const result = await client.request({
      query,
      variables,
    });

    return {
      data: result.data,
      query,
      variables,
    };
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

/**
 * Fetch a list of documents from a collection
 * 
 * @param collection The collection name (post, scientific, lectionary, ubgems, ubcatechism)
 * @returns The list of documents
 */
export async function fetchDocumentList(collection: string) {
  try {
    // Use the appropriate query based on the collection
    let query;

    switch (collection) {
      case 'post':
        query = queries.postConnection;
        break;
      case 'scientific':
        query = queries.scientificConnection;
        break;
      case 'lectionary':
        query = queries.lectionaryConnection;
        break;
      case 'ubgems':
        query = queries.ubgemsConnection;
        break;
      case 'ubcatechism':
        query = queries.ubcatechismConnection;
        break;
      default:
        throw new Error(`Unknown collection: ${collection}`);
    }

    // Execute the query
    const result = await client.request({
      query,
      variables: {
        first: 100, // Limit to 100 documents
      },
    });

    return result.data;
  } catch (error) {
    console.error('Error fetching document list:', error);
    throw error;
  }
}