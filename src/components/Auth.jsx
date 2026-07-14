import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple basic checks
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && !formData.name) {
      setError('Please provide your name to register.');
      return;
    }

    try {
      if (isLogin) {
        // Mock Login
        login(formData.email, formData.password);
      } else {
        // Mock Signup
        signup(formData.name, formData.email, formData.password);
      }
      
      // Redirect to home page on success
      navigate('/');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Close button */}
        <button
          className="close-btn"
          onClick={() => navigate('/')} 
        >
          &times;
        </button>

        <h2>{isLogin ? 'Login to Inkspire' : 'Create an Account'}</h2>

        {error && <div className="auth-error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Full Name input for sign up only */}
          {!isLogin && (
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
          )}
          
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleInputChange}
            required 
          />
          
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
