/**
 * Unique ID generator for frontend-only product creation.
 * Uses crypto.randomUUID() when available, with a fallback for older browsers.
 */

/**
 * Generate a unique ID for a new product
 */
export function generateUniqueId(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback: timestamp + random string
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
