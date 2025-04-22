import React, { useState } from 'react';
import Header from '../Header';  // Assuming you have a Header component
import Footer from '../Footer';  // Assuming you have a Footer component
import './index.css'; // Assuming you have a CSS file for styling the Cart component


const Cart = () => {
  // Assuming you have a cart stored in the localStorage or a global state
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];  // Example of getting items from localStorage

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. Start adding items!</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-total">
          <h3>Total: ₹{calculateTotal()}</h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
