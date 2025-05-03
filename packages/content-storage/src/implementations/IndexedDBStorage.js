/**
 * IndexedDB Storage Implementation
 *
 * This module provides an implementation of the storage interface using IndexedDB.
 */
/**
 * IndexedDB storage implementation
 */
export class IndexedDBStorage {
    /**
     * Constructor
     * @param storeName Name of the object store
     * @param db IndexedDB database instance
     * @param keyPath Primary key path
     */
    constructor(storeName, db, keyPath = 'id') {
        this.db = null;
        this.storeName = storeName;
        this.db = db;
        this.keyPath = keyPath;
    }
    /**
     * Get an item by ID
     * @param id Item ID
     * @returns Promise resolving to the item or null if not found
     */
    async getItem(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);
            request.onsuccess = () => {
                resolve(request.result || null);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    /**
     * Get multiple items by their IDs
     * @param ids Array of item IDs
     * @returns Promise resolving to an array of found items
     */
    async getItems(ids) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const items = [];
            let completed = 0;
            ids.forEach(id => {
                const request = store.get(id);
                request.onsuccess = () => {
                    if (request.result) {
                        items.push(request.result);
                    }
                    completed++;
                    if (completed === ids.length) {
                        resolve(items);
                    }
                };
                request.onerror = () => {
                    reject(request.error);
                };
            });
            // Handle empty array case
            if (ids.length === 0) {
                resolve([]);
            }
        });
    }
    /**
     * Get all items
     * @returns Promise resolving to an array of all items
     */
    async getAllItems() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    /**
     * Query items based on criteria
     * @param query Query options
     * @returns Promise resolving to an array of matching items
     */
    async queryItems(query) {
        const allItems = await this.getAllItems();
        let result = allItems;
        // Apply filter
        if (query.filter) {
            result = result.filter(query.filter);
        }
        // Apply sort
        if (query.sort) {
            result = result.sort(query.sort);
        }
        // Apply pagination
        if (query.offset !== undefined || query.limit !== undefined) {
            const offset = query.offset || 0;
            const limit = query.limit !== undefined ? offset + query.limit : result.length;
            result = result.slice(offset, limit);
        }
        // Apply field selection
        if (query.fields && query.fields.length > 0) {
            result = result.map(item => {
                const newItem = {};
                query.fields.forEach(field => {
                    newItem[field] = item[field];
                });
                return newItem;
            });
        }
        return result;
    }
    /**
     * Add a new item
     * @param item Item to add
     * @returns Promise resolving to the added item
     */
    async addItem(item) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(item);
            request.onsuccess = () => {
                resolve(item);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    /**
     * Add multiple items
     * @param items Array of items to add
     * @returns Promise resolving to an array of added items
     */
    async addItems(items) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            let completed = 0;
            const errors = [];
            items.forEach(item => {
                const request = store.add(item);
                request.onsuccess = () => {
                    completed++;
                    if (completed === items.length) {
                        if (errors.length > 0) {
                            reject(new Error(`Failed to add ${errors.length} items`));
                        }
                        else {
                            resolve(items);
                        }
                    }
                };
                request.onerror = () => {
                    errors.push(request.error || new Error('Unknown error'));
                    completed++;
                    if (completed === items.length) {
                        reject(new Error(`Failed to add ${errors.length} items`));
                    }
                };
            });
            // Handle empty array case
            if (items.length === 0) {
                resolve([]);
            }
        });
    }
    /**
     * Update an existing item
     * @param id Item ID
     * @param item Updated item data
     * @returns Promise resolving to the updated item
     */
    async updateItem(id, item) {
        return new Promise(async (resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            // Get the existing item
            const existingItem = await this.getItem(id);
            if (!existingItem) {
                reject(new Error(`Item with ID ${id} not found`));
                return;
            }
            // Merge the existing item with the updates
            const updatedItem = Object.assign(Object.assign({}, existingItem), item);
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(updatedItem);
            request.onsuccess = () => {
                resolve(updatedItem);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    /**
     * Delete an item
     * @param id Item ID
     * @returns Promise resolving to true if successful
     */
    async deleteItem(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);
            request.onsuccess = () => {
                resolve(true);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    /**
     * Delete multiple items
     * @param ids Array of item IDs
     * @returns Promise resolving to the number of deleted items
     */
    async deleteItems(ids) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            let completed = 0;
            let deleted = 0;
            ids.forEach(id => {
                const request = store.delete(id);
                request.onsuccess = () => {
                    deleted++;
                    completed++;
                    if (completed === ids.length) {
                        resolve(deleted);
                    }
                };
                request.onerror = () => {
                    completed++;
                    if (completed === ids.length) {
                        resolve(deleted);
                    }
                };
            });
            // Handle empty array case
            if (ids.length === 0) {
                resolve(0);
            }
        });
    }
    /**
     * Clear all items
     * @returns Promise resolving to true if successful
     */
    async clearItems() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();
            request.onsuccess = () => {
                resolve(true);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    /**
     * Count items
     * @param query Optional query to count matching items
     * @returns Promise resolving to the count
     */
    async countItems(query) {
        if (query) {
            // If there's a query, we need to get all items and filter them
            const items = await this.queryItems(query);
            return items.length;
        }
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            const transaction = this.db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.count();
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
}
/**
 * IndexedDB transaction implementation
 */
export class IndexedDBTransaction {
    /**
     * Constructor
     * @param transaction IndexedDB transaction
     */
    constructor(transaction) {
        this.transaction = transaction;
    }
    /**
     * Commit the transaction
     * @returns Promise resolving to true if successful
     */
    async commit() {
        return new Promise(resolve => {
            this.transaction.oncomplete = () => {
                resolve(true);
            };
            this.transaction.onerror = () => {
                resolve(false);
            };
            // No explicit commit method in IndexedDB, it auto-commits
        });
    }
    /**
     * Abort the transaction
     * @returns Promise resolving to true if successful
     */
    async abort() {
        try {
            this.transaction.abort();
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
/**
 * IndexedDB storage service implementation
 */
export class IndexedDBStorageService {
    /**
     * Constructor
     * @param options IndexedDB storage options
     */
    constructor(options = {}) {
        this.db = null;
        this.storageInstances = new Map();
        this.options = Object.assign({ databaseName: 'ub-ecosystem-storage', databaseVersion: 1, entitySchemas: {} }, options);
    }
    /**
     * Initialize the storage
     * @returns Promise resolving to true if successful
     */
    async initialize() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.options.databaseName, this.options.databaseVersion);
            request.onupgradeneeded = event => {
                const db = request.result;
                // Create object stores based on entity schemas
                for (const [entityName, schema] of Object.entries(this.options.entitySchemas || {})) {
                    if (!db.objectStoreNames.contains(entityName)) {
                        const store = db.createObjectStore(entityName, {
                            keyPath: schema.keyPath || 'id',
                        });
                        // Create indexes
                        if (schema.indexes) {
                            for (const index of schema.indexes) {
                                store.createIndex(index.name, index.keyPath, index.options);
                            }
                        }
                    }
                }
            };
            request.onsuccess = () => {
                this.db = request.result;
                resolve(true);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    /**
     * Get a storage instance for a specific entity type
     * @param entityName Name of the entity
     * @returns Storage interface for the entity
     */
    getStorage(entityName) {
        var _a;
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        if (!this.db.objectStoreNames.contains(entityName)) {
            throw new Error(`Entity ${entityName} does not exist`);
        }
        if (!this.storageInstances.has(entityName)) {
            const schema = (_a = this.options.entitySchemas) === null || _a === void 0 ? void 0 : _a[entityName];
            const keyPath = (schema === null || schema === void 0 ? void 0 : schema.keyPath) || 'id';
            const storage = new IndexedDBStorage(entityName, this.db, keyPath);
            this.storageInstances.set(entityName, storage);
        }
        return this.storageInstances.get(entityName);
    }
    /**
     * Start a transaction
     * @param entityNames Names of entities to include in the transaction
     * @returns Promise resolving to a transaction object
     */
    async startTransaction(entityNames) {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        const transaction = this.db.transaction(entityNames, 'readwrite');
        return new IndexedDBTransaction(transaction);
    }
    /**
     * Check if the storage is available
     * @returns Promise resolving to true if available
     */
    async isAvailable() {
        return new Promise(resolve => {
            if (!window.indexedDB) {
                resolve(false);
                return;
            }
            const request = indexedDB.open('__test__');
            request.onsuccess = () => {
                request.result.close();
                indexedDB.deleteDatabase('__test__');
                resolve(true);
            };
            request.onerror = () => {
                resolve(false);
            };
        });
    }
    /**
     * Get storage statistics
     * @returns Promise resolving to storage statistics
     */
    async getStatistics() {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        const stats = {
            totalSizeBytes: 0,
            freeSpaceBytes: 0,
            entityCount: this.db.objectStoreNames.length,
            entities: {},
        };
        // Get entity statistics
        for (let i = 0; i < this.db.objectStoreNames.length; i++) {
            const entityName = this.db.objectStoreNames[i];
            const storage = this.getStorage(entityName);
            const itemCount = await storage.countItems();
            const items = await storage.getAllItems();
            // Estimate size by serializing items
            let sizeBytes = 0;
            for (const item of items) {
                sizeBytes += new Blob([JSON.stringify(item)]).size;
            }
            stats.entities[entityName] = {
                itemCount,
                sizeBytes,
            };
            stats.totalSizeBytes += sizeBytes;
        }
        // Estimate free space (not accurate)
        if (navigator.storage && navigator.storage.estimate) {
            try {
                const estimate = await navigator.storage.estimate();
                stats.freeSpaceBytes = (estimate.quota || 0) - (estimate.usage || 0);
            }
            catch (error) {
                stats.freeSpaceBytes = 0;
            }
        }
        return stats;
    }
    /**
     * Clear all data
     * @returns Promise resolving to true if successful
     */
    async clearAll() {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        const entityNames = Array.from(this.db.objectStoreNames);
        for (const entityName of entityNames) {
            const storage = this.getStorage(entityName);
            await storage.clearItems();
        }
        return true;
    }
}
//# sourceMappingURL=IndexedDBStorage.js.map