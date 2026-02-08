import { useState } from 'react';
import { buildBuyNowLink } from '../lib/whatsapp';
import type { Product } from '../data/products';
import { extractNumericPrice, getDisplayPrice } from '../lib/price';

/**
 * Product card component with image, name, price, and Buy Now button with tap animation.
 * In admin mode, shows inline editing controls that accept alphanumeric price input and preserve the display text.
 */

interface ProductCardProps {
  product: Product;
  isAdminMode: boolean;
  onUpdate: (id: string, updates: Partial<Product>) => void;
}

export function ProductCard({ product, isAdminMode, onUpdate }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  // Initialize with priceDisplay if available, otherwise use numeric price
  const [editedPrice, setEditedPrice] = useState(
    product.priceDisplay || product.price.toString()
  );
  const [editedImageUrl, setEditedImageUrl] = useState(product.imageUrl);
  const [imageError, setImageError] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSave = () => {
    // Extract numeric price from alphanumeric input
    const numericPrice = extractNumericPrice(editedPrice);
    
    if (numericPrice === null) {
      setPriceError('Price must be a valid number greater than 0');
      return;
    }

    // Save both numeric price and display text
    onUpdate(product.id, {
      name: editedName,
      price: numericPrice,
      priceDisplay: editedPrice.trim(),
      imageUrl: editedImageUrl
    });
    setIsEditing(false);
    setImageError(false);
    setPriceError(null);
  };

  const handleCancel = () => {
    setEditedName(product.name);
    setEditedPrice(product.priceDisplay || product.price.toString());
    setEditedImageUrl(product.imageUrl);
    setIsEditing(false);
    setPriceError(null);
  };

  const handleBuyNow = () => {
    // Trigger tap animation
    setIsAnimating(true);
    
    // Open WhatsApp link after short delay to show animation
    // Use numeric price only for WhatsApp message
    setTimeout(() => {
      const link = buildBuyNowLink(product.name, product.price);
      window.open(link, '_blank', 'noopener,noreferrer');
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="bg-black border border-neon-green/30 rounded-lg overflow-hidden hover:border-neon-green transition-all cyber-card group">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-900 relative">
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop' : product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        {isAdminMode && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 p-2 bg-neon-green text-black rounded-lg hover:bg-neon-green-bright transition-all neon-glow-button"
            title="Edit product"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {isEditing ? (
          // Edit Mode
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Product Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-neon-green/30 rounded text-white text-sm focus:outline-none focus:border-neon-green"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Price (₹)</label>
              <input
                type="text"
                value={editedPrice}
                onChange={(e) => {
                  setEditedPrice(e.target.value);
                  if (priceError) setPriceError(null);
                }}
                className={`w-full px-3 py-2 bg-black border rounded text-white text-sm focus:outline-none ${
                  priceError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-neon-green/30 focus:border-neon-green'
                }`}
              />
              {priceError && (
                <p className="mt-1 text-xs text-red-400">{priceError}</p>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Image URL</label>
              <input
                type="text"
                value={editedImageUrl}
                onChange={(e) => setEditedImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-neon-green/30 rounded text-white text-sm focus:outline-none focus:border-neon-green"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-neon-green text-black font-semibold rounded hover:bg-neon-green-bright transition-all text-sm"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-2 border border-neon-green/30 text-white rounded hover:bg-neon-green/10 transition-all text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // Display Mode - show alphanumeric price display
          <>
            <h3 className="text-lg font-semibold text-white group-hover:text-neon-green transition-colors">
              {product.name}
            </h3>
            <p className="text-2xl font-bold text-neon-green neon-glow">
              ₹{getDisplayPrice(product.price, product.priceDisplay)}
            </p>
            <button
              onClick={handleBuyNow}
              className={`w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-neon-green-bright transition-all neon-glow-button ${
                isAnimating ? 'buy-now-tap-pulse' : ''
              }`}
            >
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}
