import styles from "./ProductCard.module.css";

function ProductCard({ product, onAddToCart, onSelectProduct }) {
  return (
    <div className={styles.card}>
      <div>
        <img src={product.thumbnail} alt={product.title} />

        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>

      <button
        className={styles.detailsButton}
        onClick={() => onSelectProduct(product)}
      >
        View Details
      </button>

      <button className={styles.addButton} onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
