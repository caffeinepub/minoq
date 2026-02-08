/**
 * Product data model and initial products array.
 * This is the single source of truth for product data (frontend-only, no backend).
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  priceDisplay?: string; // Optional alphanumeric display text (e.g., "A50", "MRP 299")
  imageUrl: string;
}

/**
 * Initial products array - can be edited via Admin Mode
 */
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 4999,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    price: 1999,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop'
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 899,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop'
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'
  }
];
