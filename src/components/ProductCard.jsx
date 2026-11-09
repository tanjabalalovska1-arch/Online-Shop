import { memo } from "react";
import heroImage from "../assets/hero.png";
import styles from "./ProductCard.module.css";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

function ProductCard({ product, onAddToCart, onSelectProduct }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t, tCategory } = useLanguage();
  const favorite = isFavorite(product.id);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width="300"
          height="150"
          onError={(event) => {
            if (event.currentTarget.dataset.fallbackApplied) return;

            event.currentTarget.dataset.fallbackApplied = "true";
            event.currentTarget.src = heroImage;
          }}
        />

        <button
          type="button"
          className={styles.favoriteButton}
          onClick={() => {
            const success = toggleFavorite(product);

            if (!success) {
              alert(t("product.loginForFavorites"));
            }
          }}
          aria-label={
            favorite
              ? t("product.removeFavorite")
              : t("product.addFavorite")
          }
          aria-pressed={favorite}
        >
          {favorite ? "❤️" : "♡"}
        </button>
      </div>

      {/* Kategorija na proizvodot */}
      <div className={styles.categoryWrapper}>
        <span className={styles.categoryBadge}>
          {tCategory(product.category, product.category)}
        </span>
      </div>

      <div>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>

      <button
        type="button"
        className={styles.detailsButton}
        onClick={() => onSelectProduct(product)}
      >
        {t("product.viewDetails")}
      </button>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => {
          const success = onAddToCart(product);

          if (!success) {
            alert(t("product.loginForCart"));
          }
        }}
      >
        {t("product.addToCart")}
      </button>
    </div>
  );
}

export default memo(ProductCard);
