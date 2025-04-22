import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
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
      setActiveSection(""); // Reset if no section is visible
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Trigger on initial load
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
    navigate("/"); // Ensure you're on the homepage
    setTimeout(() => {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <header className="site-header">
      <div className="logo" onClick={() => navigate("/")}>
        INK<span>SPIRE</span>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <button
              className={`nav-btn ${isActive("/") ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              HOME
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("/shop") ? "active" : ""}`}
              onClick={() => navigate("/shop")}
            >
              SHOP
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("#About") ? "active" : ""}`}
              onClick={() => scrollToSection("#About")}
            >
              ABOUT
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("#categories") ? "active" : ""}`}
              onClick={() => scrollToSection("#categories")}
            >
              CATEGORIES
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("#services") ? "active" : ""}`}
              onClick={() => scrollToSection("#services")}
            >
              CUSTOM
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("#contact") ? "active" : ""}`}
              onClick={() => scrollToSection("#contact")}
            >
              CONTACT
            </button>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button onClick={() => navigate("/auth")} className="auth-btn">
          Login / Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
