/**
 * Base Repository
 *
 * This module provides a base repository implementation that can be extended
 * for specific entity types.
 */
import { StorageInterface, StorageService } from '../interfaces';
/**
 * Base repository options
 */
export interface BaseRepositoryOptions {
    /**
     * Entity name in storage
     */
    entityName: string;
    /**
     * Storage service
     */
    storageService: StorageService;
}
/**
 * Base repository implementation
 */
export declare class BaseRepository<T> {
    protected storage: StorageInterface<T>;
    protected entityName: string;
    protected storageService: StorageService;
    /**
     * Constructor
     * @param options Repository options
     */
    constructor(options: BaseRepositoryOptions);
    /**
     * Get the entity name
     * @returns Entity name
     */
    getEntityName(): string;
    /**
     * Get an entity by ID
     * @param id Entity ID
     * @returns Promise resolving to the entity or null if not found
     */
    getById(id: string): Promise<T | null>;
    /**
     * Get multiple entities by their IDs
     * @param ids Array of entity IDs
     * @returns Promise resolving to an array of found entities
     */
    getByIds(ids: string[]): Promise<T[]>;
    /**
     * Get all entities
     * @returns Promise resolving to an array of all entities
     */
    getAll(): Promise<T[]>;
    /**
     * Find entities by a filter function
     * @param filterFn Filter function
     * @returns Promise resolving to an array of matching entities
     */
    find(filterFn: (item: T) => boolean): Promise<T[]>;
    /**
     * Create a new entity
     * @param entity Entity to create
     * @returns Promise resolving to the created entity
     */
    create(entity: T): Promise<T>;
    /**
     * Create multiple entities
     * @param entities Array of entities to create
     * @returns Promise resolving to an array of created entities
     */
    createMany(entities: T[]): Promise<T[]>;
    /**
     * Update an entity
     * @param id Entity ID
     * @param updates Partial entity with updates
     * @returns Promise resolving to the updated entity
     */
    update(id: string, updates: Partial<T>): Promise<T>;
    /**
     * Delete an entity
     * @param id Entity ID
     * @returns Promise resolving to true if successful
     */
    delete(id: string): Promise<boolean>;
    /**
     * Delete multiple entities
     * @param ids Array of entity IDs
     * @returns Promise resolving to the number of deleted entities
     */
    deleteMany(ids: string[]): Promise<number>;
    /**
     * Count all entities
     * @returns Promise resolving to the count
     */
    count(): Promise<number>;
    /**
     * Count entities matching a filter
     * @param filterFn Filter function
     * @returns Promise resolving to the count
     */
    countWhere(filterFn: (item: T) => boolean): Promise<number>;
    /**
     * Clear all entities
     * @returns Promise resolving to true if successful
     */
    clear(): Promise<boolean>;
}
//# sourceMappingURL=BaseRepository.d.ts.map