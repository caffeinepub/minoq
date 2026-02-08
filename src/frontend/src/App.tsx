import { useState } from 'react';
import { HamburgerMenu } from './components/HamburgerMenu';
import { ProductCard } from './components/ProductCard';
import { AdminAccessModal } from './components/AdminAccessModal';
import { AddProductForm } from './components/AddProductForm';
import { ChangeNotesPanel } from './components/ChangeNotesPanel';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { CyberVfxBackground } from './components/CyberVfxBackground';
import { products as initialProducts } from './data/products';
import { generateUniqueId } from './lib/id';
import type { Product } from './data/products';

/**
 * Main App component for minoQ storefront.
 * Single-page e-commerce site with WhatsApp ordering, admin mode, dynamic product management, and animated cyber VFX background.
 */
function App() {
  // Product state - starts with initial products, can be edited/added in admin mode
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  // Admin mode state - enabled after correct access code
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Modal state for admin access
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  // Hamburger menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Update a specific product's data
   */
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  /**
   * Add a new product to the products array
   */
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId: Product = {
      ...newProduct,
      id: generateUniqueId()
    };
    setProducts(prev => [...prev, productWithId]);
  };

  /**
   * Handle admin access modal success
   */
  const handleAdminAccessGranted = () => {
    setIsAdminMode(true);
    setIsAdminModalOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cyber VFX Background - fixed behind all content */}
      <CyberVfxBackground />

      {/* Content wrapper with relative positioning for proper stacking */}
      <div className="relative z-10">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neon-green/20">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <h1 className="text-2xl md:text-3xl font-bold text-neon-green neon-glow tracking-wider">
              minoQ
            </h1>
            
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-neon-green hover:text-neon-green-bright transition-colors p-2 neon-glow-hover"
              aria-label="Open menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neon-green neon-glow">
              Welcome to minoQ
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Your one-stop shop for premium electronics. Order directly via WhatsApp!
            </p>
            {isAdminMode && (
              <div className="mt-4 inline-block px-4 py-2 bg-neon-green/20 border border-neon-green rounded-lg">
                <p className="text-sm text-neon-green font-semibold">Admin Mode Active</p>
              </div>
            )}
          </section>

          {/* Add Product Form - Only visible in Admin Mode */}
          {isAdminMode && (
            <AddProductForm onAddProduct={addProduct} />
          )}

          {/* Products Grid */}
          <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdminMode={isAdminMode}
                  onUpdate={updateProduct}
                />
              ))}
            </div>
          </section>

          {/* Trust Section */}
          <TrustSection />

          {/* Change Notes Panel - Only visible in Admin Mode */}
          {isAdminMode && (
            <ChangeNotesPanel />
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Hamburger Menu */}
        <HamburgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpenAdminModal={() => {
            setIsAdminModalOpen(true);
            setIsMenuOpen(false);
          }}
        />

        {/* Admin Access Modal */}
        <AdminAccessModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onSuccess={handleAdminAccessGranted}
        />
      </div>
    </div>
  );
}

export default App;
