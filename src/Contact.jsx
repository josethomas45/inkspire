function Contact() {
    return (
      <section className="contact-section" id="contact">
        <h2 className="section-title">Contact</h2>
        <div className="contact-container">
          {/* Left - Contact Info */}
          <div className="contact-info">
            <h3 className="contact-subtitle">Contact the Artist</h3>
            <p><strong>Email:</strong> <a href="mailto:inkspireart@gmail.com">inkspireart@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
        
            <div className="social-icons">
              <a href="https://www.instagram.com/drippy.canvas" target="_blank" rel="noreferrer">
                <img src="images/instagram.png" alt="Instagram" />
              </a>
              <a href="https://www.behance.net/edwinthomas9" target="_blank" rel="noreferrer">
                <img src="images/behance.png" alt="WhatsApp" />
              </a>
              <a href="https://dribbble.com/drippy_canvas" target="_blank" rel="noreferrer">
                <img src="images/dribble.png" alt="Email" />
              </a>
            </div>
          </div>
  
          {/* Right - Message Form */}
          <div className="contact-form-wrapper">
            <h3 className="contact-subtitle">Send Message for Custom Order</h3>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="send-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
  
  export default Contact;
  