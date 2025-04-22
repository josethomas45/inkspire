import { useNavigate } from 'react-router-dom';

function Featured() {
  const navigate = useNavigate();

  return (
    <section id="Featured" className="featured-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="product-grid">
        {/* Product 1 */}
        <div className="product-card">
          <img src="images/jack1.webp" alt="Product 1" />
          <h3>Custom Tshirt</h3>
          <p>₹1000</p>
          {/* Navigation to details page */}
          <button className="view-btn" onClick={() => navigate('/details')}>Details</button><br />
          <button className="buy-btn">Buy Now</button>
        </div>

        {/* Product 2 */}
        <div className="product-card">
          <img src="images/9.heic" alt="Product 2" />
          <h3>Blue Light Collective</h3><br />
          <p>₹1499</p><br />
          <button className="view-btn" onClick={() => navigate('/details')}>Details</button><br />
          <button className="buy-btn">Buy Now</button>
        </div>

        {/* Product 3 */}
        <div className="product-card">
          <img src="images/poster.jpg" alt="Product 3" />
          <h3>Minimal Poster</h3>
          <p>₹499</p>
          <button className="view-btn" onClick={() => navigate('/details')}>Details</button><br />
          <button className="buy-btn">Buy Now</button>
        </div>
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
