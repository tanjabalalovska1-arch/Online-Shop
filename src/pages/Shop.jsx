
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import { useCart } from "../context/CartContext.jsx";

function Shop() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    new URLSearchParams(location.search).get("category") || "all"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products?limit=100").then((res) =>
        res.json()
      ),
      fetch("https://dummyjson.com/products/category-list").then((res) =>
        res.json()
      ),
    ])
      .then(([productData, categoryData]) => {
        setProducts(productData.products || []);
        setCategories(categoryData || []);
      })
      .catch((error) => console.error("Could not load products:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const category =
      new URLSearchParams(location.search).get("category") || "all";
    setSelectedCategory(category);
  }, [location.search]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  function selectProduct(product) {
    navigate(`/products/${product.id}`, {
      state: { from: location.pathname + location.search },
    });
  }

  return (
    <section className="shop-page">
      <div className="shop-heading">
        <p className="section-label">THE URBAN NEST COLLECTION</p>
        <h1>Find Your Favorites</h1>
        <p>Thoughtful finds for every corner of your home.</p>
      </div>

      <div className="shop-filters">
        <button
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => navigate("/shop")}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() =>
              navigate(`/shop?category=${encodeURIComponent(category)}`)
            }
          >
            {category.replaceAll("-", " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="shop-message">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="shop-message">No products found in this category.</p>
      ) : (
        <div className="shop-products">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onSelectProduct={selectProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Shop;
