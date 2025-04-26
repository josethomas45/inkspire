function Services() {
    return (
      <section id="services" className="services-section">
        <h2 className="section-title">Customizable Products</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src="images/r2.png" alt="Custom Portraits" />
            <h3>Custom Portraits</h3>
            <p>Get personalized portraits designed with your own unique style.</p>
            <small className="hover-hint">Hover to reveal</small>

          </div>
  
          <div className="service-card">
            <img src="images/jack3.webp" alt="Custom Apparel" />
            <h3>Custom Apparel</h3>
            <p>Design your own clothing — T-shirts, hoodies, and more!</p>
            <small className="hover-hint">Hover to reveal</small>
          </div>
  
          <div className="service-card" align="center">
            <img src="images/lastresult.png" alt="Custom Posters" />
            <h3>Cartoonised sketchs</h3>
            <p>Turn your favorite art or memories into cartoonised art.</p>
            <small className="hover-hint">Hover to reveal</small>
          </div>
        </div>
      </section>
    );
  }
  
  export default Services;
  

