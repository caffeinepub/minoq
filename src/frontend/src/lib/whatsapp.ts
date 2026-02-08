/**
 * WhatsApp link builder utility.
 * Generates wa.me URLs with properly encoded messages.
 */

const WHATSAPP_NUMBER = '918240316884';

/**
 * Build WhatsApp Buy Now link for a product
 * Format: https://wa.me/918240316884?text=I%20want%20to%20buy%20[PRODUCT_NAME]%20for%20₹[PRICE]%20from%20minoQ
 */
export function buildBuyNowLink(productName: string, price: number): string {
  const message = `I want to buy ${productName} for ₹${price} from minoQ`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Build WhatsApp Help/Feedback link
 * Format: https://wa.me/918240316884?text=Hi%20I%20need%20help%20from%20minoQ
 */
export function buildHelpLink(): string {
  const message = 'Hi I need help from minoQ';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
