import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-row">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-img"
              />
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.title}
                </Link>
                <p className="cart-item-price">${item.price}</p>
              </div>

              <div className="cart-qty-controls">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          ))}
          <button onClick={clearCart} className="btn-clear">
            Clear Entire Cart
          </button>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="summary-line total-line">
            <strong>Total</strong>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="btn-checkout"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

