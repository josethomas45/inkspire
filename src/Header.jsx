import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <header className="site-header">
      <div className="logo"><a href="#">INK<span>SPIRE</span></a></div>
      <nav className="header-nav">
        <ul>
          <li><a href="#" className="active">HOME</a></li>
          <li><a href="/shop">SHOP</a></li>
          <li><a href="/#About">ABOUT</a></li>
          <li><a href="/#categories">CATEGORIES</a></li>
          <li><a href="/#services">CUSTOM</a></li>
          <li><a href="/#contact">CONTACT</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {/* On button click, navigate to the /auth route */}
        <button 
          onClick={() => navigate('/auth')} // This will redirect to /auth when clicked
          className="auth-btn"
        >
          Login / Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
