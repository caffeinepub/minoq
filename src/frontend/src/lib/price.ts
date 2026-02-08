/**
 * Utility to extract numeric price from alphanumeric input and format display prices.
 * Strips letters and symbols, returns a valid positive number or null.
 */

export function extractNumericPrice(input: string): number | null {
  // Remove all non-digit and non-decimal characters
  const cleaned = input.replace(/[^\d.]/g, '');
  
  // Parse the cleaned string
  const parsed = parseFloat(cleaned);
  
  // Return valid positive number or null
  if (isNaN(parsed) || parsed <= 0) {
    return null;
  }
  
  return parsed;
}

/**
 * Get the display price string for UI rendering.
 * Uses priceDisplay if available, otherwise formats the numeric price.
 */
export function getDisplayPrice(price: number, priceDisplay?: string): string {
  if (priceDisplay && priceDisplay.trim()) {
    return priceDisplay.trim();
  }
  return price.toLocaleString('en-IN');
}
