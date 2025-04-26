import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import Header from '../Header';
import Footer from '../Footer';

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '5rem', color: 'white' }}>
          <h2>Product not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{
        padding: '2rem',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        {/* Product Image with hover effect */}
        <div style={{ overflow: 'hidden', width: '300px', height: 'auto', marginBottom: '1.5rem' }}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            style={{
              width: '100%',
              height: 'auto',
              transition: 'transform 0.5s ease',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Product Details */}
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>{product.name}</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#ccc' }}>Price: ₹{product.price}</p>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '1rem', marginBottom: '1rem', lineHeight: '1.5', color: '#ddd' }}>
            <strong>Description:</strong> {product.description}
          </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.5', color: '#bbb' }}>
            <strong>Review:</strong> {product.review}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          {/* Buy Now Button */}
          <button 
            style={{
              padding: '0.7rem 1.5rem',
              background: '#00FFAB',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '30px',
              fontWeight: '600',
              letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#00cc88';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#00FFAB';
              e.currentTarget.style.color = '#000';
            }}
            onClick={() => alert('Proceeding to buy...')}
          >
            Buy Now
          </button>

          {/* Back to Shop Button */}
          <button 
            style={{
              padding: '0.7rem 1.5rem',
              background: '#ffffff',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '30px',
              fontWeight: '600',
              letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '1px solid #fff';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.border = 'none';
            }}
            onClick={() => window.history.back()}
          >
            Back to Shop
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
