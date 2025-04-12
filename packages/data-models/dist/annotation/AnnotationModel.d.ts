/**
 * Annotation Model
 *
 * This module defines the annotation model interfaces for the UB Ecosystem.
 */
/**
 * Base annotation model interface
 */
export interface AnnotationModel {
  /**
   * Unique identifier for the annotation
   */
  id: string;
  /**
   * User ID of the annotation creator
   */
  userId: string;
  /**
   * Publication ID the annotation belongs to
   */
  publicationId: string;
  /**
   * Document ID the annotation belongs to
   */
  documentId: string;
  /**
   * Section ID the annotation belongs to (optional)
   */
  sectionId?: string;
  /**
   * Paragraph ID the annotation belongs to (optional)
   */
  paragraphId?: string;
  /**
   * Type of annotation
   */
  type: 'highlight' | 'note' | 'bookmark';
  /**
   * Date the annotation was created
   */
  createdAt: string;
  /**
   * Date the annotation was last updated
   */
  updatedAt: string;
  /**
   * Whether the annotation is shared with others
   */
  isShared: boolean;
  /**
   * Tags associated with the annotation
   */
  tags?: string[];
  /**
   * Color of the annotation (for highlights)
   */
  color?: string;
}
/**
 * Highlight annotation model
 */
export interface HighlightModel extends AnnotationModel {
  /**
   * Type of annotation (always 'highlight' for this model)
   */
  type: 'highlight';
  /**
   * Text that is highlighted
   */
  text: string;
  /**
   * Start position in the paragraph text
   */
  startPosition: number;
  /**
   * End position in the paragraph text
   */
  endPosition: number;
}
/**
 * Note annotation model
 */
export interface NoteModel extends AnnotationModel {
  /**
   * Type of annotation (always 'note' for this model)
   */
  type: 'note';
  /**
   * Note content
   */
  content: string;
  /**
   * Referenced text (if applicable)
   */
  referencedText?: string;
  /**
   * Start position in the paragraph text (if applicable)
   */
  startPosition?: number;
  /**
   * End position in the paragraph text (if applicable)
   */
  endPosition?: number;
}
/**
 * Bookmark annotation model
 */
export interface BookmarkModel extends AnnotationModel {
  /**
   * Type of annotation (always 'bookmark' for this model)
   */
  type: 'bookmark';
  /**
   * Bookmark title
   */
  title: string;
  /**
   * Bookmark description
   */
  description?: string;
  /**
   * Position information for restoring the exact location
   */
  position: {
    /**
     * Scroll position
     */
    scrollPosition?: number;
    /**
     * Section ID
     */
    sectionId?: string;
    /**
     * Paragraph ID
     */
    paragraphId?: string;
  };
}
//# sourceMappingURL=AnnotationModel.d.ts.map
