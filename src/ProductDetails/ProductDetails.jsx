
import styles from "./ProductDetails.module.css";

// Komponenta za prikazuvanje detalji za eden proizvod
function ProductDetails({ product, onBack, onAddToCart }) {
  return (
    <article
      className={styles.productDetails}
      aria-labelledby="product-title"
    >
      {/* Kopce za vrakjanje kon listata so proizvodi */}
      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
      >
        ← Back to Products
      </button>

      {/* Slika na proizvodot */}
      <img
        className={styles.productImage}
        src={product.thumbnail}
        alt={product.title}
      />

      {/* Naslov na proizvodot */}
      <header>
        <h2 id="product-title">{product.title}</h2>
      </header>

      {/* Opis na proizvodot */}
      <p>{product.description}</p>

      {/* Semanticki organizirani podatoci za proizvodot */}
      <dl className={styles.productInfo}>
        <div>
          <dt>Price</dt>
          <dd>${product.price}</dd>
        </div>

        <div>
          <dt>Brand</dt>
          <dd>{product.brand || "Not specified"}</dd>
        </div>

        <div>
          <dt>Category</dt>
          <dd>{product.category}</dd>
        </div>
      </dl>

      {/* Kopce za dodavanje vo kosnickata */}
      <button
        type="button"
        className={styles.addButton}
        onClick={() => onAddToCart(product)}
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default ProductDetails;
