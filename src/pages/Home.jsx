import { Link } from "react-router-dom";

function Home() {
  const featuredCategories = [
    { name: "Beauty", path: "/shop" },
    { name: "Fragrances", path: "/shop" },
    { name: "Furniture", path: "/shop" },
    { name: "Groceries", path: "/shop" },
  ];

  return (
    <div className="home-container">
      <section className="hero-banner">
        <span className="hero-tag">Welcome to ShopZone 2026</span>
        <h1>Curated Essentials, Right at Your Doorstep</h1>
        <p>
          Explore top quality goods across beauty, home essentials, groceries,
          and lifestyle gear. Simple shopping with seamless navigation.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="btn-hero-primary">
            Explore All Products
          </Link>
          <Link to="/contact" className="btn-hero-secondary">
            Get Support
          </Link>
        </div>
      </section>

      <section className="categories-preview">
        <h2>Popular Collections</h2>
        <div className="categories-grid">
          {featuredCategories.map((cat, idx) => (
            <Link to={cat.path} key={idx} className="category-card">
              <h3>{cat.name}</h3>
              <span>Browse items &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-box">
          <div className="feature-icon">⚡</div>
          <h3>Instant Client-Side SPA</h3>
          <p>
            Experience lightning fast page-to-page navigation without full page
            reloads.
          </p>
        </div>

        <div className="feature-box">
          <div className="feature-icon">🛡️</div>
          <h3>Protected Checkout</h3>
          <p>
            Secure routing that guards your order process and remembers your
            session.
          </p>
        </div>

        <div className="feature-box">
          <div className="feature-icon">🔄</div>
          <h3>Synchronized State</h3>
          <p>
            Context-driven cart synced to your browser storage across all tabs
            and refreshes.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
