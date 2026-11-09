import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty-view">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your Cart is Currently Empty</h2>
        <p>You haven't added any products to your shopping cart yet.</p>
        <Link to="/shop" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <button onClick={clearCart} className="btn-text-danger">
          Clear All
        </button>
      </div>

      <div className="cart-grid">
        <div className="cart-items-column">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <Link to={`/product/${item.id}`} className="cart-item-thumb-link">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="cart-thumb"
                />
              </Link>

              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <div className="cart-unit-price">
                  Unit Price: ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="cart-quantity-control">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="qty-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="btn-item-remove"
                title="Remove item"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary-column">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items Count</span>
              <span>{cart.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Standard Shipping</span>
              <span className="free-tag">Free</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total Price</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="btn-checkout"
            >
              Proceed to Checkout
            </button>

            <Link to="/shop" className="continue-shopping-link">
              &larr; Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
