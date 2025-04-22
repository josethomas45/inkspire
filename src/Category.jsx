import { Link } from 'react-router-dom'; // Import Link for routing

function Categories() {
  return (
    <section id="categories" className="categories-section">
      <h2 className="section-title">CATEGORIES YOU CAN FIND HERE</h2>
      <div className="category-grid">
        <div className="category-card">
          <img src="images/5.jpg" alt="Drawings" />
          <h3>Drawings</h3>
        </div>
        <div className="category-card">
          <img src="images/jack2.webp" alt="Apparel" />
          <h3>Apparel</h3>
        </div>
        <div className="category-card">
          <img src="images/6.heic" alt="Phone cases" />
          <h3>Phone cases</h3>
        </div>
        <div className="category-card">
          <img src="images/1.jpg" alt="Digital Art" />
          <h3>Digital Art</h3>
        </div>
      </div>

      {/* View More Products Button */}
      <div className="view-more-container">
        <Link to="/shop" className="view-more-btn">View Products</Link>
      </div>
    </section>
  );
}

export default Categories;
