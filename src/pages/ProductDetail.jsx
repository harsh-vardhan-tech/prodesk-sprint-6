import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to retrieve product details");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.thumbnail || (data.images && data.images[0]) || "");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="status-container">
        <div className="spinner"></div>
        <p>Loading product #{id}...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="status-container error-box">
        <h3>Product Not Found</h3>
        <p>{error || "The requested item does not exist in inventory."}</p>
        <button onClick={() => navigate("/shop")} className="btn-primary">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/shop">Shop</Link> &gt;{" "}
        <span>{product.title}</span>
      </div>

      <div className="detail-layout">
        <div className="detail-media">
          <div className="main-image-container">
            <img
              src={selectedImage}
              alt={product.title}
              className="detail-main-image"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnail-strip">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={
                    selectedImage === imgUrl
                      ? "thumb-btn active"
                      : "thumb-btn"
                  }
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <span className="detail-category-badge">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-meta">
            <span className="rating-pill">Rating: {product.rating || "4.5"} / 5</span>
            {product.stock && (
              <span className="stock-pill">
                In Stock ({product.stock} available)
              </span>
            )}
          </div>

          <div className="detail-price-box">
            <span className="detail-price">${product.price}</span>
            {product.discountPercentage && (
              <span className="discount-tag">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="purchase-controls">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="qty-control-group">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={isAdded ? "btn-add-main added" : "btn-add-main"}
            >
              {isAdded ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>

          <div className="detail-features">
            <div className="feature-item">
              <strong>Warranty:</strong> {product.warrantyInformation || "1 Year Official Warranty"}
            </div>
            <div className="feature-item">
              <strong>Shipping:</strong> {product.shippingInformation || "Free standard shipping (3-5 business days)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
