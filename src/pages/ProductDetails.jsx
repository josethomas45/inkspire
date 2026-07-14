import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';
import Header from '../Header';
import Footer from '../Footer';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  if (!product) {
    return (
      <>
        <Header />
        <div className="not-found-container">
          <h2>PRODUCT NOT FOUND</h2>
          <p>The product you are looking for does not exist or has been removed.</p>
          <button className="details-back-btn" onClick={() => navigate('/shop')}>
            Return to Shop
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Determine category for display tag
  const getCategory = (item) => {
    const name = item.name.toLowerCase();
    const desc = item.description.toLowerCase();
    if (
      name.includes("tshirt") || 
      name.includes("t-shirt") || 
      name.includes("apparel") || 
      name.includes("jacket") || 
      name.includes("pants") || 
      name.includes("hoodie")
    ) {
      return "Apparel";
    }
    if (name.includes("poster")) {
      return "Posters";
    }
    if (
      name.includes("drawing") || 
      name.includes("painting") || 
      name.includes("sketch") || 
      desc.includes("watercolor") || 
      desc.includes("pencil sketch") || 
      desc.includes("painting") ||
      name.includes("watercolour")
    ) {
      return "Drawings";
    }
    if (name.includes("case")) {
      return "Phone Cases";
    }
    return "Merchandise";
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optionally open the cart drawer or give visual feedback
  };

  return (
    <>
      <Header />
      <div className="details-page-wrapper">
        <div className="details-container">
          
          {/* Left - Image Column */}
          <div className="details-image-section">
            <div className="details-image-card">
              <img
                src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                alt={product.name}
              />
            </div>
          </div>

          {/* Right - Product Details Column */}
          <div className="details-content-section">
            <span className="details-category-tag">{getCategory(product)}</span>
            <h2>{product.name}</h2>
            <p className="details-price">₹{product.price}</p>
            
            <hr className="details-divider" />

            <div className="details-description-block">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>

            <div className="details-review-block">
              <h4>Artist Review</h4>
              <p>"{product.review}"</p>
            </div>

            <hr className="details-divider" />

            {/* Quantity Selector controls */}
            <div className="details-quantity-selector">
              <span>Quantity</span>
              <div className="qty-controls">
                <button className="qty-btn" onClick={handleDecrement}>-</button>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) setQuantity(val);
                  }}
                  min="1"
                />
                <button className="qty-btn" onClick={handleIncrement}>+</button>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="details-actions">
              <button className="details-add-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="details-back-btn" onClick={() => navigate('/shop')}>
                Back to Shop
              </button>
            </div>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;