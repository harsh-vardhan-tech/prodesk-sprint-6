import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [details, setDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="checkout-success">
        <h2>Order Confirmed!</h2>
        <p>Thank you for shopping with ShopZone. Your order has been placed successfully.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Secure Checkout</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>No items in cart to checkout.</p>
          <Link to="/shop" className="btn-primary">
            Browse Store
          </Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <h3>Shipping Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={details.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street"
                value={details.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Mumbai"
                  value={details.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="400001"
                  value={details.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary btn-block">
              Place Order (${totalPrice.toFixed(2)})
            </button>
          </form>

          <div className="checkout-summary">
            <h3>Order Items ({cart.length})</h3>
            <div className="checkout-items-list">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <span>
                    {item.title} &times; {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="summary-line total-line">
              <strong>Total Amount</strong>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

