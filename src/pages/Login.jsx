import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Login() {
  const { isLoggedIn, loginAsGuest, logout } = useCart();
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate("/checkout");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Account Login</h2>
        <p>Log in to access your checkout and saved account details.</p>

        {isLoggedIn ? (
          <div className="logged-in-state">
            <p className="status-text">You are currently logged in as <strong>Guest User</strong>.</p>
            <div className="login-actions">
              <button onClick={() => navigate("/checkout")} className="btn-primary">
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
              <input type="email" placeholder="guest@shopzone.com" disabled />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value="********" disabled />
            </div>
            <button onClick={handleGuestLogin} className="btn-primary btn-block">
              Login as Guest
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

