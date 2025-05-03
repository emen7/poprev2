/**
 * IndexedDB Storage Implementation
 *
 * This module provides an implementation of the storage interface using IndexedDB.
 */
import { StorageInterface, QueryOptions, StorageService, StorageTransaction, StorageStatistics } from '../interfaces/StorageInterface';
/**
 * IndexedDB storage options
 */
export interface IndexedDBStorageOptions {
    /**
     * Database name
     * @default 'ub-ecosystem-storage'
     */
    databaseName?: string;
    /**
     * Database version
     * @default 1
     */
    databaseVersion?: number;
    /**
     * Entity schemas
     */
    entitySchemas?: {
        [entityName: string]: {
            /**
             * Primary key path
             * @default 'id'
             */
            keyPath?: string;
            /**
             * Indexes to create
             */
            indexes?: {
                /**
                 * Index name
                 */
                name: string;
                /**
                 * Key path for the index
                 */
                keyPath: string | string[];
                /**
                 * Index options
                 */
                options?: IDBIndexParameters;
            }[];
        };
    };
}
/**
 * IndexedDB storage implementation
 */
export declare class IndexedDBStorage<T> implements StorageInterface<T> {
    private db;
    private storeName;
    private keyPath;
    /**
     * Constructor
     * @param storeName Name of the object store
     * @param db IndexedDB database instance
     * @param keyPath Primary key path
     */
    constructor(storeName: string, db: IDBDatabase, keyPath?: string);
    /**
     * Get an item by ID
     * @param id Item ID
     * @returns Promise resolving to the item or null if not found
     */
    getItem(id: string): Promise<T | null>;
    /**
     * Get multiple items by their IDs
     * @param ids Array of item IDs
     * @returns Promise resolving to an array of found items
     */
    getItems(ids: string[]): Promise<T[]>;
    /**
     * Get all items
     * @returns Promise resolving to an array of all items
     */
    getAllItems(): Promise<T[]>;
    /**
     * Query items based on criteria
     * @param query Query options
     * @returns Promise resolving to an array of matching items
     */
    queryItems(query: QueryOptions<T>): Promise<T[]>;
    /**
     * Add a new item
     * @param item Item to add
     * @returns Promise resolving to the added item
     */
    addItem(item: T): Promise<T>;
    /**
     * Add multiple items
     * @param items Array of items to add
     * @returns Promise resolving to an array of added items
     */
    addItems(items: T[]): Promise<T[]>;
    /**
     * Update an existing item
     * @param id Item ID
     * @param item Updated item data
     * @returns Promise resolving to the updated item
     */
    updateItem(id: string, item: Partial<T>): Promise<T>;
    /**
     * Delete an item
     * @param id Item ID
     * @returns Promise resolving to true if successful
     */
    deleteItem(id: string): Promise<boolean>;
    /**
     * Delete multiple items
     * @param ids Array of item IDs
     * @returns Promise resolving to the number of deleted items
     */
    deleteItems(ids: string[]): Promise<number>;
    /**
     * Clear all items
     * @returns Promise resolving to true if successful
     */
    clearItems(): Promise<boolean>;
    /**
     * Count items
     * @param query Optional query to count matching items
     * @returns Promise resolving to the count
     */
    countItems(query?: QueryOptions<T>): Promise<number>;
}
/**
 * IndexedDB transaction implementation
 */
export declare class IndexedDBTransaction implements StorageTransaction {
    private transaction;
    /**
     * Constructor
     * @param transaction IndexedDB transaction
     */
    constructor(transaction: IDBTransaction);
    /**
     * Commit the transaction
     * @returns Promise resolving to true if successful
     */
    commit(): Promise<boolean>;
    /**
     * Abort the transaction
     * @returns Promise resolving to true if successful
     */
    abort(): Promise<boolean>;
}
/**
 * IndexedDB storage service implementation
 */
export declare class IndexedDBStorageService implements StorageService {
    private db;
    private options;
    private storageInstances;
    /**
     * Constructor
     * @param options IndexedDB storage options
     */
    constructor(options?: IndexedDBStorageOptions);
    /**
     * Initialize the storage
     * @returns Promise resolving to true if successful
     */
    initialize(): Promise<boolean>;
    /**
     * Get a storage instance for a specific entity type
     * @param entityName Name of the entity
     * @returns Storage interface for the entity
     */
    getStorage<T>(entityName: string): StorageInterface<T>;
    /**
     * Start a transaction
     * @param entityNames Names of entities to include in the transaction
     * @returns Promise resolving to a transaction object
     */
    startTransaction(entityNames: string[]): Promise<StorageTransaction>;
    /**
     * Check if the storage is available
     * @returns Promise resolving to true if available
     */
    isAvailable(): Promise<boolean>;
    /**
     * Get storage statistics
     * @returns Promise resolving to storage statistics
     */
    getStatistics(): Promise<StorageStatistics>;
    /**
     * Clear all data
     * @returns Promise resolving to true if successful
     */
    clearAll(): Promise<boolean>;
}
//# sourceMappingURL=IndexedDBStorage.d.ts.map