import { useMemo, useCallback } from "react";
import { getProducts } from "../api/products";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const fetchProducts = useCallback((signal) => getProducts(100, signal), []);

  const { data: products, loading, error } = useApi(fetchProducts);

  const categories = useMemo(() => {
    if (!products) return [];

    const categoryMap = {};

    products.forEach((product) => {
      if (!product.category) return;

      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          slug: product.category,
          name: product.category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          count: 0,
        };
      }

      categoryMap[product.category].count += 1;
    });

    return Object.values(categoryMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [products]);

  return (
    <main className="un-home">
      <section className="un-hero">
        <div className="un-copy">
          <span className="un-eyebrow">
            <span className="un-eyebrow-dot" />
            WELCOME TO URBAN NEST
          </span>

          <h1>
            Good finds.
            <br />
            <em>Every day.</em>
          </h1>

          <p className="un-description">
            Discover products for your everyday life. Find something you love,
            all in one place.
          </p>

          <button className="un-shop-button" onClick={() => navigate("/shop")}>
            Explore the shop
            <span>↗</span>
          </button>

          <div className="un-divider" />

          <div className="un-category-heading">
            <span>EXPLORE BY CATEGORY</span>
            <span>01 — 03</span>
          </div>

          <div className="un-category-list">
            {loading ? (
              <p className="un-status">Loading categories...</p>
            ) : error ? (
              <p className="un-status">
                Categories are temporarily unavailable.
              </p>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <button
                  className="un-category-row"
                  key={category.slug}
                  onClick={() =>
                    navigate(
                      `/shop?category=${encodeURIComponent(category.slug)}`,
                    )
                  }
                >
                  <span className="un-category-index">0{index + 1}</span>

                  <span className="un-category-name">{category.name}</span>

                  <span className="un-category-arrow">↗</span>
                </button>
              ))
            ) : (
              <p className="un-status">
                Categories are temporarily unavailable.
              </p>
            )}
          </div>
        </div>

        <div className="un-visual">
          <img
            className="un-hero-image"
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85"
            alt="Carefully selected products and everyday essentials"
          />

          <div className="un-image-overlay" />

          <div className="un-image-top">
            <span>URBAN NEST</span>
            <span>DISCOVER MORE ↗</span>
          </div>

          <div className="un-image-caption">
            <span className="un-caption-line" />
            <p>Everyday essentials.</p>
            <h2>Find your next favourite.</h2>
          </div>

          <div className="un-image-index">
            <span>01</span>
            <span className="un-index-line" />
            <span>03</span>
          </div>
        </div>
      </section>

      <footer className="un-footer">
        <span>URBAN NEST</span>
        <span>GOOD FINDS FOR EVERYDAY LIVING.</span>
      </footer>
    </main>
  );
}

export default Home;
