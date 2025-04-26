import { Routes, Route } from 'react-router-dom'; // Import Link for navigation
import { useEffect } from 'react';

import Auth from './components/Auth'; // Login/signup component
import Featured from './Featured.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Categories from './Category.jsx';
import Perks from './Perks.jsx';
import Services from './Services.jsx';
import Contact from './Contact.jsx';

import Shop from './pages/Shop'; // Import Shop page
import ProductDetails from './pages/ProductDetails'; // Import ProductDetails page
import ScrollToHash from './components/ScrollToHash'; // Import ScrollToHash

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={
        <>
          <ScrollToHash /> {/* Scroll handler for hash navigation */}
          <Header />
          <Hero />
          <Featured />
          <About />
          <Categories />
          <Perks />
          <Services />
          <Contact />
          <Footer />
        </>
      } />

      {/* Auth page route */}
      <Route path="/auth" element={<Auth />} />

      {/* Shop route */}
      <Route path="/shop" element={<Shop />} />

      {/* Product Details route */}
      <Route path="/product/:productId" element={<ProductDetails />} /> {/* Dynamic product details route */}
    </Routes>
  );
}

export default App;
