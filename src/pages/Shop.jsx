import React, { useEffect } from "react"; 
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import products from "../data/products"; 
import "./Shop.css";

const Shop = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);
  
  return (
    <>
      <Header />
      <div className="shop-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            
            <button 
              className="view-btn" 
              onClick={() => navigate(`/product/${product.id}`)} // Navigate to product details page
            >
              Details
            </button><br />
            
            <button 
              className="buy-btn" 
              onClick={() => navigate(`/checkout`, { state: { product } })} // Navigate to checkout page with product info
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
