import { memo } from "react";
import styles from "./ProductCard.module.css";
import { useFavorites } from "../context/FavoritesContext.jsx";

function ProductCard({ product, onAddToCart, onSelectProduct }) {
  const { toggleFavorite, isFavorite } = useFavorites();
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
        />

        <button
          type="button"
          className={styles.favoriteButton}
          onClick={() => {
            const success = toggleFavorite(product);

            if (!success) {
              alert("Please login first to add favorites.");
            }
          }}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorite}
        >
          {favorite ? "❤️" : "♡"}
        </button>
      </div>

       {/* Kategorija na proizvodot */}
      <div className={styles.categoryWrapper}>
        <span className={styles.categoryBadge}>
          {product.category || "Other"}
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
        View Details
      </button>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => {
          const success = onAddToCart(product);

          if (!success) {
            alert("Please login first to add products to your cart.");
          }
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default memo(ProductCard);
