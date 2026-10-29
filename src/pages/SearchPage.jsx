import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import "./SearchPage.css";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

import { useCart } from "../context/CartContext.jsx";

function SearchPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products, loading, error } = useProducts(query);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Search term: {query}</p>

      {loading && <p>Loading products...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && products.length === 0 && query && (
        <p>No products found.</p>
      )}

      <div className="search-products">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onSelectProduct={(selectedProduct) =>
              navigate(`/products/${selectedProduct.id}`, {
                state: {
                  from: `${location.pathname}${location.search}`,
                  scrollY: window.scrollY,
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
