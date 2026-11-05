import styles from "./ProductDetails.module.css";

// Komponenta za prikazuvanje detalji za eden proizvod
function ProductDetails({ product, onBack, onAddToCart }) {
  return (
    <section className={styles.detailsPage}>
      {/* Kopce za vrakjanje - nadvor od kartickata */}
      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
      >
        ← Back to Products
      </button>

      {/* Glavna karticka */}
      <article
        className={styles.productDetails}
        aria-labelledby="product-title"
      >
        {/* Leva strana - slika */}
        <div className={styles.imageSection}>
          <img
            className={styles.productImage}
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        {/* Desna strana - informacii */}
        <div className={styles.productContent}>
          <header>
            <h2 id="product-title">{product.title}</h2>
          </header>

          <p className={styles.description}>
            {product.description}
          </p>

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
            onClick={() => {
              const success = onAddToCart(product);

              if (!success) {
                alert("Please login first to add products to your cart.");
              }
            }}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </section>
  );
}

export default ProductDetails;