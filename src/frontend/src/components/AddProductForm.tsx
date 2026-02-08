import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../data/products';
import { extractNumericPrice } from '../lib/price';

/**
 * Add Product form component for Admin Mode.
 * Provides inputs for product name, price (accepts alphanumeric), and image URL with validation.
 * Preserves alphanumeric price text for display while extracting numeric value for WhatsApp.
 */

interface AddProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export function AddProductForm({ onAddProduct }: AddProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    imageUrl?: string;
  }>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Product name is required';
    }

    // Validate price - extract numeric value from alphanumeric input
    if (!price.trim()) {
      newErrors.price = 'Price is required';
    } else {
      const numericPrice = extractNumericPrice(price);
      if (numericPrice === null) {
        newErrors.price = 'Price must be a valid number greater than 0';
      }
    }

    // Validate image URL
    if (!imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Extract numeric price from alphanumeric input
    const numericPrice = extractNumericPrice(price);
    if (numericPrice === null) {
      return;
    }

    // Create new product with both numeric price and display text
    onAddProduct({
      name: name.trim(),
      price: numericPrice,
      priceDisplay: price.trim(), // Store the original alphanumeric input
      imageUrl: imageUrl.trim()
    });

    // Reset form
    setName('');
    setPrice('');
    setImageUrl('');
    setErrors({});
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setName('');
    setPrice('');
    setImageUrl('');
    setErrors({});
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <div className="container mx-auto px-4 mb-8">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full py-4 bg-neon-green/10 border-2 border-neon-green/30 border-dashed rounded-lg hover:bg-neon-green/20 hover:border-neon-green transition-all flex items-center justify-center gap-2 text-neon-green font-semibold neon-glow-hover"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="bg-black border-2 border-neon-green rounded-lg p-6 cyber-card">
        <h3 className="text-xl font-bold text-neon-green mb-4 neon-glow">
          Add New Product
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="product-name" className="block text-sm font-medium text-gray-300 mb-2">
              Product Name *
            </label>
            <input
              id="product-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={`w-full px-4 py-3 bg-black border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-neon-green/30 focus:border-neon-green focus:ring-neon-green/50'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Price - accepts alphanumeric */}
          <div>
            <label htmlFor="product-price" className="block text-sm font-medium text-gray-300 mb-2">
              Price (₹) *
            </label>
            <input
              id="product-price"
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors({ ...errors, price: undefined });
              }}
              className={`w-full px-4 py-3 bg-black border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                errors.price
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-neon-green/30 focus:border-neon-green focus:ring-neon-green/50'
              }`}
              placeholder="Enter price (e.g., 50 or A50)"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-400">{errors.price}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="product-image" className="block text-sm font-medium text-gray-300 mb-2">
              Image URL *
            </label>
            <input
              id="product-image"
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                if (errors.imageUrl) setErrors({ ...errors, imageUrl: undefined });
              }}
              className={`w-full px-4 py-3 bg-black border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                errors.imageUrl
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-neon-green/30 focus:border-neon-green focus:ring-neon-green/50'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-400">{errors.imageUrl}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-neon-green-bright transition-all neon-glow-button"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 border border-neon-green/30 text-white rounded-lg hover:bg-neon-green/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
