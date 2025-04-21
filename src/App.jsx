import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing
import { useEffect } from 'react';

// Import components
import Auth from './components/Auth'; // Import Auth component for login/signup
import Featured from './Featured.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Categories from './Category.jsx';
import Perks from './Perks.jsx';
import Services from './Services.jsx';
import Contact from './Contact.jsx';

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
      {/* Define routes */}
      <Route path="/" element={
        <>
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
      <Route path="/auth" element={<Auth />} /> {/* This will render the Auth component */}
    </Routes>
  );
}

export default App;
