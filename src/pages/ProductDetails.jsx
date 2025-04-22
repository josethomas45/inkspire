// /App.jsx
import { Routes, Route } from 'react-router-dom'; // Import routing components
import React from 'react';
import Shop from './pages/Shop'; // Shop page
import ProductDetails from './pages/ProductDetails'; // ProductDetails page
import Header from './Header';
import Footer from './Footer';
import './index.css'; // Import global CSS styles


function App() {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/product/:productId" element={<ProductDetails />} /> {/* Dynamic product details route */}
    </Routes>
  );
}

export default App;
