import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const generatedId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="checkout-success-card">
        <div className="success-icon">✓</div>
        <h2>Order Successfully Placed!</h2>
        <p className="order-id">
          Order Reference: <strong>{orderId}</strong>
        </p>
        <p className="success-message">
          Thank you, <strong>{formData.fullName}</strong>. A confirmation email
          has been sent to <strong>{formData.email || "your email"}</strong>.
        </p>
        <div className="success-actions">
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/" className="btn-secondary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty-view">
        <h2>Your Cart is Empty</h2>
        <p>Please add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn-primary">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Secure Checkout</h2>

      <div className="checkout-grid">
        <form onSubmit={handlePlaceOrder} className="checkout-form-card">
          <h3>Shipping & Customer Information</h3>

          <div className="form-group">
            <label>Recipient Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. rahul@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Shipping Street Address</label>
            <input
              type="text"
              name="address"
              placeholder="Flat / House No, Street name"
              value={formData.address}
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
                value={formData.city}
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
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h3>Payment Option</h3>
          <div className="payment-options">
            <label className="radio-label">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              <span>Cash on Delivery (Standard)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              <span>Credit / Debit Card (Mock Online)</span>
            </label>
          </div>

          <button type="submit" className="btn-submit-order">
            Complete Order (${totalPrice.toFixed(2)})
          </button>
        </form>

        <div className="checkout-sidebar">
          <div className="summary-card">
            <h3>Cart Review ({cart.length} unique items)</h3>
            <div className="checkout-item-list">
              {cart.map((item) => (
                <div key={item.id} className="checkout-preview-item">
                  <div className="item-meta">
                    <span className="title">{item.title}</span>
                    <span className="sub">
                      Qty: {item.quantity} &times; ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
