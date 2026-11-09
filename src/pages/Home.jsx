import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to ShopZone</h1>
        <p>Discover top trending electronics, fashion, and lifestyle products at best prices.</p>
        <Link to="/shop" className="btn-primary">
          Explore Products
        </Link>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered swiftly and reliably across the country.</p>
        </div>
        <div className="feature-card">
          <h3>Quality Assured</h3>
          <p>Only authentic items directly sourced from top verified suppliers.</p>
        </div>
        <div className="feature-card">
          <h3>24/7 Support</h3>
          <p>We are here around the clock to solve any queries you might have.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

