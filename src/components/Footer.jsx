import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-brand-title">
            <span className="brand-icon">✦</span>
            <h2>Olivé</h2>
          </div>

          <p>
            Discover your style. Find your space. Quality products for your
            everyday life.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              📷
            </a>
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="TikTok">
              ♪
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Olivé. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;