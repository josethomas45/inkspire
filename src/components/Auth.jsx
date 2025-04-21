import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Close button */}
        <button
          className="close-btn"
          onClick={() => navigate('/')} // Navigate to home page on close
        >
          &times;
        </button>

        <h2>{isLogin ? 'Login to Inkspire' : 'Create an Account'}</h2>

        <form className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p onClick={toggleForm} className="toggle-link">
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
}

export default Auth;
