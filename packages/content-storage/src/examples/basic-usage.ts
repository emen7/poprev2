/**
 * Basic Usage Example
 *
 * This example demonstrates how to use the content storage package.
 */

import { IndexedDBStorageService, ContentManager } from '../';

// Sample data
const samplePublication = {
  id: 'ub',
  title: 'The Urantia Book',
  shortTitle: 'UB',
  description: 'The Urantia Book is a spiritual, philosophical, and religious book.',
  language: 'en',
  version: '1.0.0',
  datePublished: '1955-10-12',
  lastUpdated: new Date().toISOString(),
  structure: {
    hasParts: true,
    parts: [
      {
        number: 1,
        title: 'The Central and Superuniverses',
        documentIds: ['paper1', 'paper2'],
      },
    ],
    hasForeword: true,
    hasAppendices: false,
  },
  config: {
    defaultFormatType: 'traditional',
    showParagraphNumbers: true,
    enableReferenceDetection: true,
    enableCrossPublicationReferences: false,
    enableAnnotations: true,
    enableSearch: true,
    enableOfflineAccess: true,
  },
};

const sampleDocuments = [
  {
    id: 'paper1',
    type: 'paper',
    publicationId: 'ub',
    number: 1,
    title: 'The Universal Father',
    author: 'Divine Counselor',
    sections: [
      {
        id: 'paper1-section1',
        documentId: 'paper1',
        number: 1,
        title: "The Father's Name",
        paragraphs: [
          {
            id: 'paper1-section1-paragraph1',
            documentId: 'paper1',
            sectionId: 'paper1-section1',
            number: 1,
            text: 'Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered.',
          },
          {
            id: 'paper1-section1-paragraph2',
            documentId: 'paper1',
            sectionId: 'paper1-section1',
            number: 2,
            text: "The First Father is known by various names in different universes and in different sectors of the same universe. The names which the creature assigns to the Creator are much dependent on the creature's concept of the Creator.",
          },
        ],
      },
    ],
    metadata: {
      part: 1,
      partTitle: 'The Central and Superuniverses',
    },
  },
  {
    id: 'paper2',
    type: 'paper',
    publicationId: 'ub',
    number: 2,
    title: 'The Nature of God',
    author: 'Divine Counselor',
    sections: [
      {
        id: 'paper2-section1',
        documentId: 'paper2',
        number: 1,
        title: 'The Infinity of God',
        paragraphs: [
          {
            id: 'paper2-section1-paragraph1',
            documentId: 'paper2',
            sectionId: 'paper2-section1',
            number: 1,
            text: 'God is everywhere present; the Universal Father rules the circle of eternity. But he rules in the local universes in the persons of his Paradise Creator Sons, even as he bestows life through these Sons.',
          },
        ],
      },
    ],
    metadata: {
      part: 1,
      partTitle: 'The Central and Superuniverses',
    },
  },
];

/**
 * Run the example
 */
async function runExample() {
  try {
    console.log('Initializing storage service...');

    // Initialize the storage service
    const storageService = new IndexedDBStorageService({
      databaseName: 'ub-content-example',
      databaseVersion: 1,
      entitySchemas: {
        publications: {
          keyPath: 'id',
          indexes: [{ name: 'language', keyPath: 'language' }],
        },
        documents: {
          keyPath: 'id',
          indexes: [
            { name: 'publicationId', keyPath: 'publicationId' },
            { name: 'type', keyPath: 'type' },
          ],
        },
      },
    });

    // Initialize the content manager
    const contentManager = new ContentManager({
      storageService,
    });

    await contentManager.initialize();
    console.log('Storage service initialized.');

    // Import the publication and documents
    console.log('Importing publication and documents...');
    await contentManager.importPublication(samplePublication, sampleDocuments);
    console.log('Publication and documents imported.');

    // Get the publication repository
    const publicationRepository = contentManager.getPublicationRepository();

    // Get all publications
    const publications = await publicationRepository.getAll();
    console.log(`Found ${publications.length} publications:`);
    publications.forEach(pub => {
      console.log(`- ${pub.title} (${pub.id})`);
    });

    // Get the document repository
    const documentRepository = contentManager.getDocumentRepository();

    // Get all documents for the publication
    const documents = await documentRepository.getByPublicationId('ub');
    console.log(`Found ${documents.length} documents for publication 'ub':`);
    documents.forEach(doc => {
      console.log(`- ${doc.title} (${doc.id})`);
    });

    // Get a specific document
    const paper1 = await documentRepository.getById('paper1');
    console.log(`\nDetails for document 'paper1':`);
    console.log(`Title: ${paper1?.title}`);
    console.log(`Author: ${paper1?.author}`);
    console.log(`Sections: ${paper1?.sections.length}`);

    // Get a specific section
    const section = await documentRepository.getSectionById('paper1', 'paper1-section1');
    console.log(`\nDetails for section 'paper1-section1':`);
    console.log(`Title: ${section?.title}`);
    console.log(`Paragraphs: ${section?.paragraphs.length}`);

    // Get a specific paragraph
    const paragraph = await documentRepository.getParagraphById(
      'paper1',
      'paper1-section1',
      'paper1-section1-paragraph1'
    );
    console.log(`\nDetails for paragraph 'paper1-section1-paragraph1':`);
    console.log(`Number: ${paragraph?.number}`);
    console.log(`Text: ${paragraph?.text}`);

    // Get storage statistics
    const stats = await contentManager.getStorageStatistics();
    console.log('\nStorage statistics:');
    console.log(`Total size: ${stats.totalSizeBytes} bytes`);
    console.log(`Entity count: ${stats.entityCount}`);
    console.log('Entities:');
    Object.entries(stats.entities).forEach(([name, info]: [string, any]) => {
      console.log(`- ${name}: ${info.itemCount} items, ${info.sizeBytes} bytes`);
    });

    console.log('\nExample completed successfully.');
  } catch (error) {
    console.error('Error running example:', error instanceof Error ? error.message : String(error));
  }
}

// Run the example when this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  window.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-example');
    if (runButton) {
      runButton.addEventListener('click', runExample);
    } else {
      console.log('Run button not found. Creating one...');
      const button = document.createElement('button');
      button.id = 'run-example';
      button.textContent = 'Run Example';
      button.addEventListener('click', runExample);
      document.body.appendChild(button);
    }
  });
} else {
  // Node.js environment
  runExample();
}
