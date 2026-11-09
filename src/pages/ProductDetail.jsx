import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-message">
        <p>{error || "Product not found"}</p>
        <Link to="/shop" className="btn-secondary">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <Link to="/shop" className="back-link">
        &larr; Back to Shop
      </Link>
      <div className="detail-card">
        <div className="detail-image-box">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className="detail-image"
          />
        </div>
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-desc">{product.description}</p>
          
          <div className="detail-extra">
            {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
            {product.rating && <p><strong>Rating:</strong> {product.rating} / 5</p>}
          </div>

          <button
            onClick={handleAddToCart}
            className={added ? "btn-add added" : "btn-add"}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

