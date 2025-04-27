import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    const emailParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      message: formData.get("message"),
      to_email: "inkspireart@gmail.com", // Recipient email
    };

    // Send email using EmailJS
    emailjs
      .send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        emailParams,
        "your_user_id" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("Message sent successfully!", response.status, response.text);
          setIsSubmitting(false);
          alert("Your message has been sent!");
        },
        (err) => {
          console.error("Failed to send message.", err);
          setIsSubmitting(false);
          alert("Something went wrong. Please try again.");
        }
      );
  };

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
              <img src="/images/instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.behance.net/edwinthomas9" target="_blank" rel="noreferrer">
              <img src="/images/behance.png" alt="Behance" />
            </a>
            <a href="https://dribbble.com/drippy_canvas" target="_blank" rel="noreferrer">
              <img src="/images/dribble.png" alt="Dribbble" />
            </a>
          </div>
        </div>

        {/* Right - Message Form */}
        <div className="contact-form-wrapper">
          <h3 className="contact-subtitle">Send Message for Custom Order</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="send-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
