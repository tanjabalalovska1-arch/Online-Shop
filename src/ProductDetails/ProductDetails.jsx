import heroImage from "../assets/hero.png";
import styles from "./ProductDetails.module.css";
import { useLanguage } from "../context/LanguageContext.jsx";

// Komponenta za prikazuvanje detalji za eden proizvod
function ProductDetails({ product, onBack, onAddToCart }) {
  const { t, tCategory } = useLanguage();

  return (
    <section className={styles.detailsPage}>
      {/* Kopce za vrakjanje - nadvor od kartickata */}
      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
      >
        {t("product.backToProducts")}
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
            onError={(event) => {
              if (event.currentTarget.dataset.fallbackApplied) return;

              event.currentTarget.dataset.fallbackApplied = "true";
              event.currentTarget.src = heroImage;
            }}
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
              <dt>{t("product.price")}</dt>
              <dd>${product.price}</dd>
            </div>

            <div>
              <dt>{t("product.brand")}</dt>
              <dd>{product.brand || t("product.notSpecified")}</dd>
            </div>

            <div>
              <dt>{t("product.category")}</dt>
              <dd>{tCategory(product.category, product.category)}</dd>
            </div>
          </dl>

          {/* Kopce za dodavanje vo kosnickata */}
          <button
            type="button"
            className={styles.addButton}
            onClick={() => {
              const success = onAddToCart(product);

              if (!success) {
                alert(t("product.loginForCart"));
              }
            }}
            aria-label={t("product.addToCartAria", {
              title: product.title,
            })}
          >
            {t("product.addToCart")}
          </button>
        </div>
      </article>
    </section>
  );
}

export default ProductDetails;