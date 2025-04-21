function Featured() {
  return(
    <section id="Featured" className="featured-section">
  <h2 className="section-title">Featured Products</h2>
  <div className="product-grid">
    <div className="product-card">
      <img src="images/jack1.webp" alt="Product 1" />
      <h3>Custome Tshirt</h3>
      <p>₹799</p>
      <button className="view-btn">Details</button><br></br>
      <button className="buy-btn">Buy Now</button>
    </div>

    <div className="product-card">
      <img src="images/jack2.webp" alt="Product 2" />
      <h3>Inkspire Hoodie</h3>
      <p>₹1499</p>
      <button className="view-btn">Details</button><br></br>
      <button className="buy-btn">Buy Now</button>
    </div>

    <div className="product-card">
      <img src="images/jack3.webp" alt="Product 3" />
      <h3>Minimal Poster Pack</h3>
      <p>₹499</p>
      <button className="view-btn">Details</button><br></br>
      <button className="buy-btn">Buy Now</button>
    </div>
  </div>

  <div className="view-more-btn-container">
        <button className="view-more-btn">View More Products</button>
      </div>
</section>

  );
}

export default Featured;