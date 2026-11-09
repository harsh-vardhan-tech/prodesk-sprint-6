import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Login() {
  const { isLoggedIn, loginAsGuest, logout } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from || "/checkout";

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(destination);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Account Login</h2>
        <p className="login-subtext">
          Access your checkout, saved order history, and account settings.
        </p>

        {location.state?.from && !isLoggedIn && (
          <div className="auth-alert">
            Please log in as guest to proceed to checkout.
          </div>
        )}

        {isLoggedIn ? (
          <div className="logged-in-state">
            <p className="status-text">
              You are currently authenticated as <strong>Guest User</strong>.
            </p>
            <div className="login-actions">
              <button
                onClick={() => navigate(destination)}
                className="btn-primary"
              >
                Go to Checkout
              </button>
              <button onClick={logout} className="btn-secondary">
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="login-form-area">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value="guest.shopper@shopzone.dev"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value="••••••••••••" readOnly />
            </div>

            <button
              onClick={handleGuestLogin}
              className="btn-primary btn-block"
            >
              Login as Guest
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
