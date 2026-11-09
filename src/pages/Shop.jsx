import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products from server");
        }
        return res.json();
      })
      .then((data) => {
        const items = data.products || [];
        setProducts(items);
        setFilteredProducts(items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let list = products;
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }
    setFilteredProducts(list);
  }, [selectedCategory, searchTerm, products]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  if (loading) {
    return (
      <div className="status-container">
        <div className="spinner"></div>
        <p>Loading products from catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container error-box">
        <h3>Could not load products</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div>
          <h2>Explore Inventory</h2>
          <p className="shop-subtitle">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="shop-search-box">
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={
              selectedCategory === cat
                ? "category-pill active"
                : "category-pill"
            }
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-catalog">
          <p>No products match your search or filter.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="product-img-wrap">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />
                <span className="product-badge">{product.category}</span>
              </div>

              <div className="product-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description-snippet">
                  {product.description}
                </p>

                <div className="product-footer">
                  <div className="price-tag">
                    <span className="currency">$</span>
                    <span className="amount">{product.price}</span>
                  </div>

                  <div className="action-buttons">
                    <button
                      type="button"
                      onClick={() => handleProductClick(product.id)}
                      className="btn-view"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, product)}
                      className={
                        addedId === product.id ? "btn-add added" : "btn-add"
                      }
                    >
                      {addedId === product.id ? "Added!" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
