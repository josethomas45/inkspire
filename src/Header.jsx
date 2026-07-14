import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Trash2, Plus, Minus, User, LogOut } from "lucide-react"; 
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Check for mobile screen size on mount and on resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Add scrolled effect & hash tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      const sections = ['About', 'categories', 'services', 'contact'];
      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${sec}`);
            return;
          }
        }
      }
      setActiveSection("");
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isActive = (pathOrHash) => {
    if (pathOrHash === "/") {
      return location.pathname === "/" && activeSection === "";
    }
    if (pathOrHash.startsWith("#")) {
      return location.pathname === "/" && activeSection === pathOrHash;
    }
    return location.pathname === pathOrHash;
  };

  const scrollToSection = (hash) => {
    navigate("/");
    setMenuOpen(false);
    setCartOpen(false);
    setTimeout(() => {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setCartOpen(false);
  };
  
  const toggleCart = () => {
    setCartOpen(!cartOpen);
    setMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/auth");
    }
    setMenuOpen(false);
    setCartOpen(false);
  };

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="logo" onClick={() => { navigate("/"); setMenuOpen(false); setCartOpen(false); }}>
          INK<span>SPIRE</span>
        </div>

        {/* Nav links */}
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <button 
                className={`nav-btn ${isActive("/") ? "active" : ""}`} 
                onClick={() => { 
                  navigate("/"); 
                  window.scrollTo(0, 0); 
                  setMenuOpen(false); 
                  setCartOpen(false);
                }}
              >
                HOME
              </button>
            </li>
            <li>
              <button className={`nav-btn ${isActive("/shop") ? "active" : ""}`} onClick={() => { navigate("/shop"); setMenuOpen(false); setCartOpen(false); }}>
                SHOP
              </button>
            </li>
            <li>
              <button className={`nav-btn ${isActive("#About") ? "active" : ""}`} onClick={() => scrollToSection("#About")}>
                ABOUT
              </button>
            </li>
            <li>
              <button className={`nav-btn ${isActive("#categories") ? "active" : ""}`} onClick={() => scrollToSection("#categories")}>
                CATEGORIES
              </button>
            </li>
            <li>
              <button className={`nav-btn ${isActive("#services") ? "active" : ""}`} onClick={() => scrollToSection("#services")}>
                CUSTOM
              </button>
            </li>
            <li>
              <button className={`nav-btn ${isActive("#contact") ? "active" : ""}`} onClick={() => scrollToSection("#contact")}>
                CONTACT
              </button>
            </li>
            
            {/* Mobile Auth and Status rendering */}
            {isMobile && (
              <>
                <li className="mobile-user-status">
                  {isAuthenticated ? (
                    <div className="user-info">
                      <User size={18} />
                      <span>{user.name}</span>
                    </div>
                  ) : null}
                </li>
                <li className="mobile-auth">
                  <button onClick={handleAuthClick} className="auth-btn">
                    {isAuthenticated ? "Logout" : "Login / Sign Up"}
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Auth + Cart Icon + Hamburger */}
        <div className="header-actions">
          {/* Cart Icon Toggle Button */}
          <button className="cart-toggle-btn" onClick={toggleCart}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Desktop Auth Section */}
          {!isMobile && (
            <div className="desktop-auth-wrapper">
              {isAuthenticated && (
                <div className="user-greeting">
                  <User size={16} />
                  <span>{user.name}</span>
                </div>
              )}
              <button onClick={handleAuthClick} className="auth-btn">
                {isAuthenticated ? <LogOut size={16} /> : "Login / Sign Up"}
              </button>
            </div>
          )}
          
          {/* Hamburger visible only on small screens */}
          <button className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Slide-out Cart Drawer Overlay */}
      <div className={`cart-drawer-overlay ${cartOpen ? "active" : ""}`} onClick={toggleCart}></div>

      {/* Slide-out Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h3>SHOPPING CART ({cartCount})</h3>
          <button className="close-cart-btn" onClick={toggleCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-drawer-item" key={item.id}>
                <div className="item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price}</p>
                  
                  <div className="item-qty-row">
                    <div className="qty-picker">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button className="delete-item-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart-drawer">
              <ShoppingCart size={48} />
              <p>Your cart is empty.</p>
              <button className="start-shopping-btn" onClick={() => { setCartOpen(false); navigate("/shop"); }}>
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="cart-summary-line tax">
              <span>Tax (GST 18% inclusive)</span>
              <span>₹{Math.round(cartSubtotal * 0.18)}</span>
            </div>
            <div className="cart-summary-line total">
              <span>Total</span>
              <span>₹{Math.round(cartSubtotal * 1.18)}</span>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckoutClick}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;