import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // Payment Form State
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setPaymentData({ ...paymentData, cardNumber: formatted });
  };

  // Format Expiry (adds slash MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setPaymentData({ ...paymentData, expiry: value });
  };

  // Format CVV
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setPaymentData({ ...paymentData, cvv: value });
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'shipping') {
      setShippingData({ ...shippingData, [name]: value });
    } else {
      setPaymentData({ ...paymentData, [name]: value });
    }
    // Clear error for field when changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Shipping validations
    if (!shippingData.name.trim()) newErrors.name = 'Full name is required';
    if (!shippingData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!shippingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (shippingData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    if (!shippingData.address.trim()) newErrors.address = 'Street address is required';
    if (!shippingData.city.trim()) newErrors.city = 'City is required';
    if (!shippingData.state.trim()) newErrors.state = 'State is required';
    if (!shippingData.zip.trim()) {
      newErrors.zip = 'Postal code is required';
    } else if (shippingData.zip.replace(/\D/g, '').length < 5) {
      newErrors.zip = 'Postal code is invalid';
    }

    // Payment validations
    const cleanCard = paymentData.cardNumber.replace(/\s/g, '');
    if (!cleanCard) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cleanCard.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!paymentData.expiry) {
      newErrors.expiry = 'Expiry is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentData.expiry)) {
      newErrors.expiry = 'Expiry must be MM/YY';
    }

    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    if (!paymentData.cardName.trim()) newErrors.cardName = 'Name on card is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate order creation and payment
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId('INK-' + Math.floor(100000 + Math.random() * 900000));
      setShowModal(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearCart();
    navigate('/');
  };

  const totalTax = Math.round(cartSubtotal * 0.18);
  const totalAmount = Math.round(cartSubtotal * 1.18);

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="checkout-page-wrapper">
          <div className="empty-checkout-state">
            <h2>NO ITEMS IN CART</h2>
            <p>Your shopping cart is currently empty. Add products from the catalog to check out.</p>
            <button onClick={() => navigate('/shop')}>Go to Shop</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="checkout-page-wrapper">
        <h2>CHECKOUT</h2>
        
        <form onSubmit={handlePaySubmit} className="checkout-grid">
          {/* Left Side: Forms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Shipping Details */}
            <div className="checkout-card">
              <h3>Shipping Information</h3>
              <div className="checkout-form">
                <div className="form-field">
                  <label htmlFor="shipping-name">Full Name</label>
                  <input
                    id="shipping-name"
                    type="text"
                    name="name"
                    value={shippingData.name}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    placeholder="Recipient Name"
                  />
                  {errors.name && <span className="input-error">{errors.name}</span>}
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="shipping-email">Email Address</label>
                    <input
                      id="shipping-email"
                      type="email"
                      name="email"
                      value={shippingData.email}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      placeholder="email@example.com"
                    />
                    {errors.email && <span className="input-error">{errors.email}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="shipping-phone">Phone Number</label>
                    <input
                      id="shipping-phone"
                      type="tel"
                      name="phone"
                      value={shippingData.phone}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      placeholder="98765 43210"
                    />
                    {errors.phone && <span className="input-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="shipping-address">Street Address</label>
                  <input
                    id="shipping-address"
                    type="text"
                    name="address"
                    value={shippingData.address}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    placeholder="Flat / House No, Street, Locality"
                  />
                  {errors.address && <span className="input-error">{errors.address}</span>}
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="shipping-city">City</label>
                    <input
                      id="shipping-city"
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      placeholder="City Name"
                    />
                    {errors.city && <span className="input-error">{errors.city}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="shipping-state">State</label>
                    <input
                      id="shipping-state"
                      type="text"
                      name="state"
                      value={shippingData.state}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      placeholder="State Name"
                    />
                    {errors.state && <span className="input-error">{errors.state}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="shipping-zip">Postal Code</label>
                    <input
                      id="shipping-zip"
                      type="text"
                      name="zip"
                      value={shippingData.zip}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      placeholder="110001"
                    />
                    {errors.zip && <span className="input-error">{errors.zip}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="checkout-card">
              <h3>Payment Details</h3>
              <div className="checkout-form">
                <div className="form-field">
                  <label htmlFor="card-number">Card Number</label>
                  <input
                    id="card-number"
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && <span className="input-error">{errors.cardNumber}</span>}
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input
                      id="expiry-date"
                      type="text"
                      name="expiry"
                      value={paymentData.expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                    />
                    {errors.expiry && <span className="input-error">{errors.expiry}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="cvv-number">CVV</label>
                    <input
                      id="cvv-number"
                      type="password"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                    />
                    {errors.cvv && <span className="input-error">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="card-name">Name on Card</label>
                  <input
                    id="card-name"
                    type="text"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={(e) => handleInputChange(e, 'payment')}
                    placeholder="John Doe"
                  />
                  {errors.cardName && <span className="input-error">{errors.cardName}</span>}
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Order Summary */}
          <div className="checkout-card">
            <h3>Order Summary</h3>
            
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <div className="checkout-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="checkout-item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="checkout-item-price">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <hr className="checkout-divider" />

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>FREE</span>
            </div>
            <div className="checkout-summary-row">
              <span>Tax (inclusive GST 18%)</span>
              <span>₹{totalTax}</span>
            </div>

            <hr className="checkout-divider" />

            <div className="checkout-summary-row total">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>

            <button type="submit" className="pay-now-btn" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing Payment...
                </>
              ) : (
                `Pay ₹${totalAmount}`
              )}
            </button>
          </div>
        </form>

        <button className="checkout-back-btn" onClick={() => navigate('/shop')}>
          RETURN TO SHOP
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-success-icon">
              <Check size={36} />
            </div>
            <h3>PAYMENT SUCCESSFUL!</h3>
            <p>Thank you for your order. Your purchase has been processed.</p>
            
            <div className="receipt-summary">
              <div className="receipt-row">
                <span className="receipt-label">Order ID:</span>
                <span className="receipt-value">{orderId}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Ship To:</span>
                <span className="receipt-value">{shippingData.name}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Address:</span>
                <span className="receipt-value">{shippingData.address}, {shippingData.city}</span>
              </div>
              <div className="receipt-row total">
                <span className="receipt-label">Amount Paid:</span>
                <span className="receipt-value">₹{totalAmount}</span>
              </div>
            </div>

            <button className="modal-close-btn" onClick={handleCloseModal}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Checkout;
