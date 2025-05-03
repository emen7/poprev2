/**
 * Base Repository
 *
 * This module provides a base repository implementation that can be extended
 * for specific entity types.
 */
/**
 * Base repository implementation
 */
export class BaseRepository {
    /**
     * Constructor
     * @param options Repository options
     */
    constructor(options) {
        this.entityName = options.entityName;
        this.storageService = options.storageService;
        this.storage = this.storageService.getStorage(this.entityName);
    }
    /**
     * Get the entity name
     * @returns Entity name
     */
    getEntityName() {
        return this.entityName;
    }
    /**
     * Get an entity by ID
     * @param id Entity ID
     * @returns Promise resolving to the entity or null if not found
     */
    async getById(id) {
        return this.storage.getItem(id);
    }
    /**
     * Get multiple entities by their IDs
     * @param ids Array of entity IDs
     * @returns Promise resolving to an array of found entities
     */
    async getByIds(ids) {
        return this.storage.getItems(ids);
    }
    /**
     * Get all entities
     * @returns Promise resolving to an array of all entities
     */
    async getAll() {
        return this.storage.getAllItems();
    }
    /**
     * Find entities by a filter function
     * @param filterFn Filter function
     * @returns Promise resolving to an array of matching entities
     */
    async find(filterFn) {
        return this.storage.queryItems({ filter: filterFn });
    }
    /**
     * Create a new entity
     * @param entity Entity to create
     * @returns Promise resolving to the created entity
     */
    async create(entity) {
        return this.storage.addItem(entity);
    }
    /**
     * Create multiple entities
     * @param entities Array of entities to create
     * @returns Promise resolving to an array of created entities
     */
    async createMany(entities) {
        return this.storage.addItems(entities);
    }
    /**
     * Update an entity
     * @param id Entity ID
     * @param updates Partial entity with updates
     * @returns Promise resolving to the updated entity
     */
    async update(id, updates) {
        return this.storage.updateItem(id, updates);
    }
    /**
     * Delete an entity
     * @param id Entity ID
     * @returns Promise resolving to true if successful
     */
    async delete(id) {
        return this.storage.deleteItem(id);
    }
    /**
     * Delete multiple entities
     * @param ids Array of entity IDs
     * @returns Promise resolving to the number of deleted entities
     */
    async deleteMany(ids) {
        return this.storage.deleteItems(ids);
    }
    /**
     * Count all entities
     * @returns Promise resolving to the count
     */
    async count() {
        return this.storage.countItems();
    }
    /**
     * Count entities matching a filter
     * @param filterFn Filter function
     * @returns Promise resolving to the count
     */
    async countWhere(filterFn) {
        return this.storage.countItems({ filter: filterFn });
    }
    /**
     * Clear all entities
     * @returns Promise resolving to true if successful
     */
    async clear() {
        return this.storage.clearItems();
    }
}
//# sourceMappingURL=BaseRepository.js.map