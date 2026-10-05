'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Wrapper from '@/components/Wrapper';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import StatusBanner from '@/components/StatusBanner';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { Search, ShoppingBag, Layers, Filter, CheckCircle2 } from 'lucide-react';

/**
 * Page 2: Dashboard / Products List Page
 * 
 * Demonstrates:
 * 1. Asynchronous GET fetch from https://dummyjson.com/products using async/await & useEffect
 * 2. Parent-to-Child data passing via props to <ProductCard product={...} />
 * 3. Child-to-Parent communication via callback props (onAddToCart)
 * 4. Composition using <Wrapper> and <HeroSection>
 * 5. Dynamic search and category filtering
 * 6. Responsive UI with loading, error, and empty states
 */
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Asynchronous State Handlers
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Cart interaction state (Parent tracking child action)
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // 1. Fetch available categories on initial mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const catData = await fetchCategories();
        // DummyJSON categories can be strings or objects with slug/name
        const normalized = Array.isArray(catData)
          ? catData.map((c) => (typeof c === 'string' ? { slug: c, name: c } : { slug: c.slug, name: c.name }))
          : [];
        setCategories(normalized);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    loadCategories();
  }, []);

  // 2. Fetch products asynchronously whenever filter or search query changes
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await fetchProducts({
        search: searchQuery,
        category: selectedCategory,
        limit: 24,
      });
      setProducts(data.products || []);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to fetch products. Check internet connection.');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    // Debounce search slightly to prevent excessive API calls while typing
    const timeoutId = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [loadProducts]);

  // Child-to-Parent callback handler
  const handleAddToCart = (product) => {
    setCartItemsCount((prev) => prev + 1);
    setLastAddedItem(product.title);
    setTimeout(() => {
      setLastAddedItem(null);
    }, 2500);
  };

  return (
    <div>
      {/* Reusable HeroSection with Parent-configured Props */}
      <HeroSection
        badge="Page 2 • Public DummyJSON API"
        title="Curated Products"
        highlight="Catalog"
        description="Fetch live product records using clean async/await in React useEffect, rendered into modular ProductCard child components via props."
        primaryCta={null}
        secondaryCta={null}
        stats={[
          { label: 'Products Displayed', value: products.length },
          { label: 'Active Category', value: selectedCategory === 'all' ? 'All' : selectedCategory },
          { label: 'Cart Items Added', value: cartItemsCount },
        ]}
      />

      {/* Main Content Container wrapped in generic Wrapper */}
      <Wrapper size="lg">
        {/* Floating Cart Notification Banner */}
        {lastAddedItem && (
          <div className="status-banner info" style={{ borderColor: 'var(--accent-emerald)', color: '#6ee7b7' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--accent-emerald)' }} />
            <p>
              Parent received child event: <strong>"{lastAddedItem}"</strong> added to cart! Total: {cartItemsCount}
            </p>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="toolbar-card">
          <div className="search-input-box">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search products by title or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-search"
            />
          </div>

          <div className="filter-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} style={{ color: 'var(--text-muted)' }} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-category"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                loadProducts();
              }}
              className="btn-refresh"
              title="Reset Filters"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Loading State Banner */}
        {isLoading && (
          <StatusBanner
            type="loading"
            title="Fetching products from DummyJSON..."
            message="Executing async GET request to https://dummyjson.com/products without freezing the UI."
          />
        )}

        {/* Error State with Retry Callback */}
        {!isLoading && errorMessage && (
          <StatusBanner
            type="error"
            title="Failed to Load Products"
            message={errorMessage}
            onRetry={loadProducts}
          />
        )}

        {/* Empty State */}
        {!isLoading && !errorMessage && products.length === 0 && (
          <StatusBanner
            type="empty"
            title="No Products Found"
            message={`No products matched your search "${searchQuery}". Try selecting another category or clearing your query.`}
          />
        )}

        {/* Products Grid: Rendering Modular Child ProductCard Components */}
        {!isLoading && !errorMessage && products.length > 0 && (
          <div className="products-grid">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
}
