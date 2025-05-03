/**
 * Storage Interface
 *
 * This module defines the interfaces for the storage service.
 */
/**
 * Generic storage interface for CRUD operations
 */
export interface StorageInterface<T> {
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
     * @param query Query object
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
 * Query options for filtering items
 */
export interface QueryOptions<T> {
    /**
     * Filter function
     */
    filter?: (item: T) => boolean;
    /**
     * Sort function
     */
    sort?: (a: T, b: T) => number;
    /**
     * Maximum number of items to return
     */
    limit?: number;
    /**
     * Number of items to skip
     */
    offset?: number;
    /**
     * Fields to include in the results
     */
    fields?: (keyof T)[];
}
/**
 * Storage transaction interface
 */
export interface StorageTransaction {
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
 * Storage service interface
 */
export interface StorageService {
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
/**
 * Storage statistics interface
 */
export interface StorageStatistics {
    /**
     * Total size in bytes
     */
    totalSizeBytes: number;
    /**
     * Free space in bytes
     */
    freeSpaceBytes: number;
    /**
     * Number of entities
     */
    entityCount: number;
    /**
     * Entity statistics
     */
    entities: {
        [entityName: string]: {
            /**
             * Number of items
             */
            itemCount: number;
            /**
             * Size in bytes
             */
            sizeBytes: number;
        };
    };
}
//# sourceMappingURL=StorageInterface.d.ts.map