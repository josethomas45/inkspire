import { useNavigate } from 'react-router-dom';
import products from './data/products.js';
import { useCart } from './context/CartContext.jsx';

function Featured() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Display first 3 items as featured products
  const featuredProducts = products.slice(0, 3);

  return (
    <section id="Featured" className="featured-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper" onClick={() => navigate(`/product/${product.id}`)}>
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="product-price">₹{product.price}</p>

            <div className="product-actions">
              <button
                className="view-btn"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Details
              </button>
              <button
                className="buy-btn"
                onClick={() => addToCart(product, 1)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Button to navigate to the shop page */}
      <div className="view-more-btn-container">
        <button className="view-more-btn" onClick={() => navigate("/shop")}>
          View More Products
        </button>
      </div>
    </section>
  );
}

export default Featured;
