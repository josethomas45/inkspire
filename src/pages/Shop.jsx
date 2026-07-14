import React, { useState, useEffect } from "react"; 
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom"; 
import products from "../data/products"; 
import { useCart } from "../context/CartContext";
import "./Shop.css";

const Shop = () => {
  const navigate = useNavigate(); 
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  // Helper to categorize products
  const getCategory = (product) => {
    const name = product.name.toLowerCase();
    const desc = product.description.toLowerCase();
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
    return "Other";
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const category = getCategory(product);
    const matchesCategory = selectedCategory === "All" || category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Apparel", "Drawings", "Posters", "Phone Cases"];

  return (
    <>
      <Header />
      <div className="shop-page-wrapper">
        <div className="shop-header-section">
          <h2>SHOP OUR CREATIVE COLLECTION</h2>
          <p>Handcrafted visual arts and premium customized merchandise.</p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="shop-controls">
          <div className="search-bar-wrapper">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shop-search-input"
            />
          </div>
          <div className="category-filters">
            {categories.map((cat) => (
              <button 
                key={cat} 
                className={`filter-tab ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="shop-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-container" onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <div className="product-card-actions">
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
            ))
          ) : (
            <div className="no-products-found">
              <p>No products match your filters. Try searching for something else!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
