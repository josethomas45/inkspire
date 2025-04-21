function Categories() {
    return (
      <section id="categories" className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="images/5.jpg" alt="Posters" />
            <h3>Drawings</h3>
          </div>
          <div className="category-card">
            <img src="images/jack2.webp" alt="Apparel" />
            <h3>Apparel</h3>
          </div>
          <div className="category-card">
            <img src="images/6.heic" alt="Stickers" />
            <h3>Phone cases</h3>
          </div>
          <div className="category-card">
            <img src="images/1.jpg" alt="Digital Art" />
            <h3>Digital Art</h3>
          </div>
        </div>
      </section>
    );
  }
  
  export default Categories;
  