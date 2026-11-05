import { useMemo, useCallback } from "react";
import { getProducts } from "../api/products";
import { useApi } from "../hooks/useApi";
import { useNavigate , NavLink } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchProducts = useCallback((signal) => getProducts(100, signal), []);

  const { data: products, loading, error } = useApi(fetchProducts);

  // Get all available categories from the products
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

    return Object.values(categoryMap).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [products]);

  // Navigate to the selected category in the Shop page
  function selectCategory(slug) {
    navigate(`/shop?category=${encodeURIComponent(slug)}`);
  }

  return (
    <main className="un-home">
      <div className={`un-layout ${user ? "no-sidebar" : ""}`}>
        {/* LEFT SIDEBAR - USER ACCOUNT */}
        {!user && (
          <aside className="un-sidebar">
            <p className="un-sidebar-label">YOUR ACCOUNT</p>

            <h2>Welcome to Nexora</h2>

            <p className="un-status">
              Login or create an account to enjoy your shopping experience.
            </p>

            <NavLink to="/login" className="un-category-row">
              <span className="un-category-name">Login</span>
              <span className="un-category-arrow">↗</span>
            </NavLink>

            <NavLink to="/register" className="un-category-row">
              <span className="un-category-name">Register</span>
              <span className="un-category-arrow">↗</span>
            </NavLink>
          </aside>
        )}

        {/* RIGHT MAIN CONTENT */}
        <div className="un-main">
          <section className="un-hero">
            <div className="un-copy">
              {/* <span className="un-eyebrow">
                <span className="un-eyebrow-dot" />
                WELCOME TO NEXORA
              </span> */}

              <h1>
                Good finds.
                <br />
                <em>Every day.</em>
              </h1>

              <p className="un-description">
                Discover products for your everyday life. Find something you
                love, all in one place.
              </p>

              <button
                type="button"
                className="un-shop-button"
                onClick={() => navigate("/shop")}
              >
                Explore the shop
                <span>↗</span>
              </button>
            </div>

            <div className="un-visual">
              <img
                className="un-hero-image"
                src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85"
                alt="Carefully selected products and everyday essentials"
                width="1200"
                height="900"
              />

              <div className="un-image-overlay" />

              {/* <div className="un-image-top">
                <span>NEXORA</span>
                <span>DISCOVER MORE ↗</span>
              </div> */}

              <div className="un-image-caption">
                <span className="un-caption-line" />
                <p>Everyday essentials.</p>
                <h2>Find your next favourite.</h2>
              </div>

              {/* <div className="un-image-index">
                <span>01</span>
                <span className="un-index-line" />
                <span>03</span>
              </div> */}
            </div>
          </section>
        </div>
      </div>

      <footer className="un-footer">
        
        <span>GOOD FINDS FOR EVERYDAY LIVING.</span>
      </footer>
    </main>
  );
}

export default Home;
