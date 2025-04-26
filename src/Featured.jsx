import { useNavigate } from 'react-router-dom';

function Featured() {
  const navigate = useNavigate();

  // Product data to pass to the details page
  const products = [
    {
      id: 1,
      name: "Custom Tshirt",
      price: 1000,
      image: "images/jack1.webp",
      description: "A personalized t-shirt made with premium cotton and custom designs.",
      review: "Customers love the feel and design quality!",
    },
    {
      id: 2,
      name: "Blue Light Collective",
      price: 1499,
      image: "images/9.heic",
      description: "Exclusive Blue Light Collective merch with limited prints.",
      review: "Highly rated for its unique artwork and print quality.",
    },
    {
      id: 3,
      name: "Minimal Poster",
      price: 499,
      image: "images/poster.jpg",
      description: "A minimalistic poster that adds a sleek touch to any space.",
      review: "Simple, elegant, and affordable.",
    }
  ];

  return (
    <section id="Featured" className="featured-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            {/* Keep the same button alignment/position */}
            <div style={{ textAlign: 'center' }}>
              <button
                className="view-btn"
                onClick={() => navigate(`/product/${product.id}`)} // Pass product ID to navigate
                style={{ display: 'inline-block', marginBottom: '10px' }} // Keep same styling for alignment
              >
                Details
              </button><br />
              <button
                className="buy-btn"
                onClick={() => navigate('/checkout', { state: { product } })} // Pass product to checkout
                style={{ display: 'inline-block', marginTop: '10px' }} // Keep same styling for alignment
              >
                Buy Now
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
