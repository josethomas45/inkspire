import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Icon library

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check for mobile screen size on mount and on resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener("resize", checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Add scrolled effect
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled more than 20px to add shadow effect
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Previous section detection code
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
    setMenuOpen(false); // close menu on mobile
    setTimeout(() => {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const handleAuthClick = () => {
    navigate("/auth");
    setMenuOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={() => { navigate("/"); setMenuOpen(false); }}>
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
                window.scrollTo(0, 0); // <-- Added scroll to top
                setMenuOpen(false); 
              }}
            >
              HOME
            </button>
          </li>
          <li>
            <button className={`nav-btn ${isActive("/shop") ? "active" : ""}`} onClick={() => { navigate("/shop"); setMenuOpen(false); }}>
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
          {/* Show Login button in the menu ONLY when in mobile view */}
          {isMobile && (
            <li className="mobile-auth">
              <button onClick={handleAuthClick} className="auth-btn">
                Login / Sign Up
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Auth + Hamburger */}
      <div className="auth-buttons">
        {/* Only show the auth button when NOT in mobile view */}
        {!isMobile && (
          <button onClick={handleAuthClick} className="auth-btn">
            Login / Sign Up
          </button>
        )}
        
        {/* Hamburger visible only on small screens */}
        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export default Header;