import { useEffect } from 'react'
import Featured from './Featured.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import About from './About.jsx'
import Categories from './Category.jsx'
import Perks from './Perks.jsx'
import Services from './Services.jsx'
import Contact from './Contact.jsx'

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
    <>
      <Header />
      <Hero />
      <Featured />
      <About />
      <Categories/>
      <Perks />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
