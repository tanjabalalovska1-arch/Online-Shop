import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import "./SearchPage.css";
import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/SearchContext.jsx";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

import { useCart } from "../context/CartContext.jsx";

function SearchPage() {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products, loading, error, search } = useSearch();

  useEffect(() => {
    search(query);
  }, [query, search]);

  return (
    <div className="search-page">
      <h1>{t("search.title")}</h1>
      {query && <p>{t("search.term", { query })}</p>}

      {loading && <p>{t("search.loading")}</p>}

      {error && <p>{t("search.error", { message: error })}</p>}

      {!loading && !error && products.length === 0 && query && (
        <p>{t("search.noProducts")}</p>
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
