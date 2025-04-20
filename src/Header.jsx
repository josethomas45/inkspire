function Header() {
    return(
            <header className="site-header">
      <div className="logo">INK<span>SPIRE</span></div>
      <nav className="header-nav">
        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">Pages</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="header-search">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
    </header>
    );

}

export default Header;