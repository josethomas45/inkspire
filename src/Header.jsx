function Header() {
    return(
            <header className="site-header">
      <div className="logo">INK<span>SPIRE</span></div>
      <nav className="header-nav">
        <ul>
          <li><a href="#" className="active">HOME</a></li>
          <li><a href="#">SHOP</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">COLLECTIONS</a></li>
          <li><a href="#">CART</a></li>
          <li><a href="#">CONTACT</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
  <button className="auth-btn">Login / Sign Up</button>
</div>

    </header>
    );

}

export default Header;