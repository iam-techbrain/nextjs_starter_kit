'use client';

import React, { useState } from 'react';
import { Star, ShoppingCart, Check, Tag } from 'lucide-react';

/**
 * ProductCard Child Component
 * 
 * Demonstrates:
 * 1. Modular Child Component
 * 2. Receiving parent data via props (product, onAddToCart)
 * 3. Encapsulated internal UI state for interaction (e.g., added-to-cart confirmation)
 * 
 * @param {object} product - Product data object from parent
 * @param {function} onAddToCart - Optional callback function triggered when clicked
 */
export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    thumbnail,
    category,
    brand,
    stock,
  } = product;

  // Calculate original price before discount
  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  const handleAddToCart = () => {
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="product-card">
      <div className="product-card-image-box">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="product-image"
          />
        ) : (
          <div className="product-image-fallback">No Image</div>
        )}

        {discountPercentage > 0 && (
          <span className="badge-discount">
            -{Math.round(discountPercentage)}%
          </span>
        )}

        {category && (
          <span className="badge-category">
            <Tag size={10} /> {category}
          </span>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-meta-row">
          {brand && <span className="product-brand">{brand}</span>}
          {rating && (
            <div className="product-rating" title={`Rating: ${rating} out of 5`}>
              <Star size={13} className="star-icon" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <h3 className="product-title" title={title}>
          {title}
        </h3>

        <p className="product-description" title={description}>
          {description}
        </p>

        <div className="product-footer">
          <div className="product-price-block">
            <span className="product-price">${price?.toFixed(2)}</span>
            {originalPrice && (
              <span className="product-old-price">${originalPrice}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn-add-cart ${isAdded ? 'added' : ''}`}
            title="Add to cart"
            disabled={stock <= 0}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : stock <= 0 ? (
              <span>Out of stock</span>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
