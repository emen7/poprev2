/**
 * Collection Manager Component
 *
 * This component provides an interface for managing collections of highlights.
 * It allows creating, editing, and deleting collections, as well as adding and removing highlights.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useNotation } from '../hooks';
import { Collection, Highlight } from '../models';

interface CollectionManagerProps {
  /**
   * Whether the manager is open
   */
  isOpen: boolean;

  /**
   * Callback function called when the manager is closed
   */
  onClose: () => void;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * CollectionManager Component
 */
export function CollectionManager({ isOpen, onClose, className = '' }: CollectionManagerProps) {
  // Get notation context
  const notation = useNotation();

  // State for active collection
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for new collection form
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');

  // Get active collection
  const activeCollection = activeCollectionId
    ? notation.collections.find(c => c.id === activeCollectionId) || null
    : null;

  // Get highlights in active collection
  const collectionHighlights = activeCollection
    ? notation.highlights.filter(h => activeCollection.highlightIds.includes(h.id))
    : [];

  // Handle collection selection
  const handleCollectionSelect = (id: string) => {
    setActiveCollectionId(id);
    setIsEditing(false);
  };

  // Handle create new collection
  const handleCreateCollection = () => {
    setActiveCollectionId(null);
    setIsEditing(true);
    setNewCollectionName('');
    setNewCollectionDescription('');
  };

  // Handle edit collection
  const handleEditCollection = () => {
    if (activeCollection) {
      setNewCollectionName(activeCollection.name);
      setNewCollectionDescription(activeCollection.description || '');
      setIsEditing(true);
    }
  };

  // Handle save collection
  const handleSaveCollection = () => {
    if (isEditing) {
      if (activeCollectionId) {
        // Update existing collection
        notation.updateCollection(activeCollectionId, {
          name: newCollectionName,
          description: newCollectionDescription || undefined,
        });
      } else {
        // Create new collection
        const id = notation.addCollection({
          name: newCollectionName,
          description: newCollectionDescription || undefined,
          highlightIds: [],
        });
        setActiveCollectionId(id);
      }

      setIsEditing(false);
    }
  };

  // Handle delete collection
  const handleDeleteCollection = () => {
    if (activeCollectionId) {
      notation.removeCollection(activeCollectionId);
      setActiveCollectionId(null);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Handle remove highlight from collection
  const handleRemoveHighlight = (highlightId: string) => {
    if (activeCollection) {
      const newHighlightIds = activeCollection.highlightIds.filter(id => id !== highlightId);
      notation.updateCollection(activeCollection.id, { highlightIds: newHighlightIds });
    }
  };

  // Handle add highlight to collection
  const handleAddHighlight = (highlightId: string) => {
    if (activeCollection && !activeCollection.highlightIds.includes(highlightId)) {
      const newHighlightIds = [...activeCollection.highlightIds, highlightId];
      notation.updateCollection(activeCollection.id, { highlightIds: newHighlightIds });
    }
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // If manager is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`collection-manager ${isOpen ? 'open' : ''} ${className}`}>
      <div className="collection-manager-header">
        <h2 className="collection-manager-title">Collections</h2>

        <button className="collection-manager-close" onClick={onClose} title="Close">
          <span className="sr-only">Close</span>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="collection-manager-content">
        {/* Collections List */}
        <div className="collection-manager-sidebar">
          <button className="collection-manager-new-button" onClick={handleCreateCollection}>
            <span className="collection-manager-new-icon">+</span>
            <span>New Collection</span>
          </button>

          <div className="collection-manager-list">
            {notation.collections.length === 0 ? (
              <div className="collection-manager-empty">
                No collections yet. Create one to get started.
              </div>
            ) : (
              notation.collections.map(collection => (
                <div
                  key={collection.id}
                  className={`collection-manager-item ${
                    activeCollectionId === collection.id ? 'active' : ''
                  }`}
                  onClick={() => handleCollectionSelect(collection.id)}
                >
                  <div className="collection-manager-item-name">{collection.name}</div>
                  <div className="collection-manager-item-count">
                    {collection.highlightIds.length} highlights
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Collection Details */}
        <div className="collection-manager-details">
          {isEditing ? (
            <div className="collection-manager-edit">
              <h3 className="collection-manager-edit-title">
                {activeCollectionId ? 'Edit Collection' : 'New Collection'}
              </h3>

              <div className="collection-manager-edit-form">
                <div className="collection-manager-edit-field">
                  <label htmlFor="collection-name">Name</label>
                  <input
                    id="collection-name"
                    type="text"
                    value={newCollectionName}
                    onChange={e => setNewCollectionName(e.target.value)}
                    placeholder="Collection name"
                    required
                  />
                </div>

                <div className="collection-manager-edit-field">
                  <label htmlFor="collection-description">Description (optional)</label>
                  <textarea
                    id="collection-description"
                    value={newCollectionDescription}
                    onChange={e => setNewCollectionDescription(e.target.value)}
                    placeholder="Collection description"
                    rows={3}
                  />
                </div>

                <div className="collection-manager-edit-actions">
                  <button className="collection-manager-edit-cancel" onClick={handleCancelEdit}>
                    Cancel
                  </button>

                  <button
                    className="collection-manager-edit-save"
                    onClick={handleSaveCollection}
                    disabled={!newCollectionName.trim()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : activeCollection ? (
            <div className="collection-manager-view">
              <div className="collection-manager-view-header">
                <div className="collection-manager-view-info">
                  <h3 className="collection-manager-view-name">{activeCollection.name}</h3>

                  <div className="collection-manager-view-meta">
                    <span className="collection-manager-view-count">
                      {activeCollection.highlightIds.length} highlights
                    </span>
                    <span className="collection-manager-view-date">
                      Created {formatDate(activeCollection.createdAt)}
                    </span>
                  </div>

                  {activeCollection.description && (
                    <p className="collection-manager-view-description">
                      {activeCollection.description}
                    </p>
                  )}
                </div>

                <div className="collection-manager-view-actions">
                  <button
                    className="collection-manager-view-edit"
                    onClick={handleEditCollection}
                    title="Edit Collection"
                  >
                    <span className="sr-only">Edit Collection</span>
                    <span aria-hidden="true">✎</span>
                  </button>

                  <button
                    className="collection-manager-view-delete"
                    onClick={handleDeleteCollection}
                    title="Delete Collection"
                  >
                    <span className="sr-only">Delete Collection</span>
                    <span aria-hidden="true">🗑</span>
                  </button>
                </div>
              </div>

              <div className="collection-manager-highlights">
                <h4 className="collection-manager-highlights-title">
                  Highlights in this Collection
                </h4>

                {collectionHighlights.length === 0 ? (
                  <div className="collection-manager-highlights-empty">
                    No highlights in this collection yet.
                  </div>
                ) : (
                  <div className="collection-manager-highlights-list">
                    {collectionHighlights.map(highlight => (
                      <div
                        key={highlight.id}
                        className={`collection-manager-highlight ${highlight.color}`}
                      >
                        <div className="collection-manager-highlight-header">
                          <span className="collection-manager-highlight-paper">
                            Paper {highlight.paperNumber}
                          </span>

                          <button
                            className="collection-manager-highlight-remove"
                            onClick={() => handleRemoveHighlight(highlight.id)}
                            title="Remove from Collection"
                          >
                            <span className="sr-only">Remove from Collection</span>
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>

                        <div className="collection-manager-highlight-text">
                          "{highlight.selectedText}"
                        </div>

                        {highlight.tags.length > 0 && (
                          <div className="collection-manager-highlight-tags">
                            {highlight.tags.map((tag, index) => (
                              <span key={index} className="collection-manager-highlight-tag">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="collection-manager-placeholder">
              <div className="collection-manager-placeholder-icon">📚</div>
              <div className="collection-manager-placeholder-text">
                Select a collection or create a new one
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollectionManager;
