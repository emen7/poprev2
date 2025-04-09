# UB Ecosystem Content Storage

This package provides storage services for the UB Ecosystem, enabling offline-first content management with synchronization capabilities.

## Overview

The content storage package provides:

- Abstract storage interfaces for CRUD operations
- IndexedDB implementation for browser-based storage
- Transaction support for atomic operations
- Query capabilities for filtering and sorting
- Statistics for monitoring storage usage

## Usage

```typescript
import {
  IndexedDBStorageService,
  StorageInterface,
  QueryOptions,
} from '@ub-ecosystem/content-storage';
import { DocumentModel } from '@ub-ecosystem/data-models';

// Initialize the storage service
const storageService = new IndexedDBStorageService({
  databaseName: 'ub-reader',
  databaseVersion: 1,
  entitySchemas: {
    documents: {
      keyPath: 'id',
      indexes: [
        { name: 'publicationId', keyPath: 'publicationId' },
        { name: 'type', keyPath: 'type' },
      ],
    },
    publications: {
      keyPath: 'id',
    },
  },
});

// Initialize the database
await storageService.initialize();

// Get a storage instance for documents
const documentStorage = storageService.getStorage<DocumentModel>('documents');

// Add a document
const document = {
  id: 'paper1',
  type: 'paper',
  publicationId: 'ub',
  number: 1,
  title: 'The Universal Father',
  sections: [],
  metadata: {},
};

await documentStorage.addItem(document);

// Query documents
const papers = await documentStorage.queryItems({
  filter: item => item.type === 'paper' && item.publicationId === 'ub',
  sort: (a, b) => a.number - b.number,
});

// Update a document
await documentStorage.updateItem('paper1', {
  title: 'The Universal Father - Updated',
});

// Delete a document
await documentStorage.deleteItem('paper1');

// Get storage statistics
const stats = await storageService.getStatistics();
console.log(`Total storage used: ${stats.totalSizeBytes} bytes`);
```

## Storage Interfaces

The package provides the following interfaces:

- `StorageInterface<T>`: Generic interface for CRUD operations on a specific entity type
- `StorageService`: Interface for managing storage instances and transactions
- `StorageTransaction`: Interface for atomic transactions
- `QueryOptions<T>`: Interface for query parameters (filtering, sorting, pagination)

## Implementations

The package includes the following implementations:

- `IndexedDBStorage<T>`: Implementation of `StorageInterface<T>` using IndexedDB
- `IndexedDBStorageService`: Implementation of `StorageService` using IndexedDB
- `IndexedDBTransaction`: Implementation of `StorageTransaction` using IndexedDB

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Lint the code
npm run lint
```
