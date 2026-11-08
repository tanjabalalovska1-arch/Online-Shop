import styles from "./Favorites.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const { favorites } = useFavorites();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("favorites.title")}</h1>

      <p className={styles.subtitle}>{t("favorites.subtitle")}</p>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>{t("favorites.empty")}</p>

          <button
            className={styles.shopButton}
            onClick={() => navigate("/shop")}
          >
            {t("favorites.explore")}
          </button>
        </div>
      ) : (
        <div className={styles.products}>
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onSelectProduct={(product) =>
                navigate(`/products/${product.id}`, {
                  state: {
                    from: location.pathname + location.search,
                  },
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
