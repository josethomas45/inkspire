import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [isProcessing, setIsProcessing] = useState(false);

  // Scroll to top when component is mounted
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  // Process payment simulation
  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment Successful!');
      navigate('/');
    }, 2000);
  };

  if (!product) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '5rem', color: 'white' }}>
          <h2>No product selected</h2>
          <button
            style={{
              marginTop: '2rem',
              padding: '0.7rem 1.5rem',
              background: '#333',
              color: '#fff',
              border: '1px solid #555',
              borderRadius: '30px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/shop')}
          >
            Return to Shop
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          padding: '3rem',
          color: 'white',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBottom: '2rem', fontSize: '2.2rem', letterSpacing: '1px' }}>CHECKOUT</h2>
        
        {/* Main Content */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '3rem', 
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: '1000px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {/* Product Preview */}
          <div 
            style={{ 
              flex: '1', 
              minWidth: '300px',
              background: 'rgba(26, 26, 26, 0.8)',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Order Summary</h3>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  overflow: 'hidden',
                  width: '100px',
                  height: '100px',
                  borderRadius: '12px',
                  marginRight: '1rem',
                }}
              >
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h4>
                <p style={{ color: '#8A2BE2', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{product.price}</p>
              </div>
            </div>
            <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '1.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <p>Subtotal</p>
              <p>₹{product.price}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <p>Tax</p>
              <p>₹{Math.round(product.price * 0.18)}</p>
            </div>
            <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '1.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <p>Total</p>
              <p>₹{Math.round(product.price * 1.18)}</p>
            </div>
          </div>
          
          {/* Payment Form */}
          <div 
            style={{ 
              flex: '1', 
              minWidth: '300px',
              background: 'rgba(26, 26, 26, 0.8)',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left',
            }}
          >
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Payment Details</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(50, 50, 50, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(50, 50, 50, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(50, 50, 50, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                Name on Card
              </label>
              <input
                type="text"
                placeholder="name"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(50, 50, 50, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                }}
              />
            </div>
            
            <button
              style={{
                width: '100%',
                padding: '1rem',
                background: '#8A2BE2',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#9932CC';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#8A2BE2';
              }}
              onClick={processPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span style={{ display: 'inline-block', width: '1em', height: '1em', borderRadius: '50%', 
                    border: '3px solid rgba(255, 255, 255, 0.3)', 
                    borderTopColor: 'white',
                    animation: 'spin 1s linear infinite' }}></span>
                  <style>{`
                    @keyframes spin {
                      to {transform: rotate(360deg);}
                    }
                  `}</style>
                  Processing...
                </>
              ) : (
                `Pay ₹${Math.round(product.price * 1.18)}`
              )}
            </button>
            
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>
              <p>* This is a demo. No actual payment will be processed.</p>
            </div>
          </div>
        </div>
        
        {/* Back button */}
        <button
          style={{
            marginTop: '2rem',
            padding: '0.7rem 1.5rem',
            background: 'transparent',
            color: '#ccc',
            border: '1px solid #444',
            borderRadius: '30px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ccc';
          }}
          onClick={() => window.history.back()}
        >
          RETURN
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
