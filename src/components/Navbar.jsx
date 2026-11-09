import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems, isLoggedIn, logout } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ShopZone
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="cart-link">
            Cart
            <span className="cart-badge">{totalItems}</span>
          </Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="auth-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

