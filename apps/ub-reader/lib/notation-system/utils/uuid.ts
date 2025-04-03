/**
 * UUID Generator
 *
 * A simple utility to generate UUIDs without external dependencies.
 */

/**
 * Generate a UUID v4 (random)
 * This is a simplified implementation and not cryptographically secure,
 * but sufficient for our needs in this application.
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
