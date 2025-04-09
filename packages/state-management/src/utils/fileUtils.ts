/**
 * Utility functions for file operations
 */

/**
 * Load a JSON file
 * @param path Path to the JSON file
 * @returns Promise that resolves to the parsed JSON data
 */
export async function loadJsonFile<T>(path: string): Promise<T> {
  try {
    // In a browser environment, we need to use fetch
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load JSON file: ${path}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading JSON file: ${path}`, error);
    throw error;
  }
}

/**
 * Check if a file exists
 * @param path Path to the file
 * @returns Promise that resolves to true if the file exists, false otherwise
 */
export async function fileExists(path: string): Promise<boolean> {
  try {
    // In a browser environment, we can use fetch with HEAD method
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Error checking if file exists: ${path}`, error);
    return false;
  }
}
