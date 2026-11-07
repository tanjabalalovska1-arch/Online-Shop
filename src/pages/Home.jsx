import { useNavigate, NavLink } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <main className="un-home">
      <div className={`un-layout ${user ? "no-sidebar" : ""}`}>
        {/* LEFT SIDEBAR - USER ACCOUNT */}
        {!user && (
          <aside className="un-sidebar">
            <p className="un-sidebar-label">YOUR ACCOUNT</p>

            <h2>Welcome to Olivé</h2>

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

              <div className="un-image-caption">
                <span className="un-caption-line" />
                <p>Everyday essentials.</p>
                <h2>Find your next favourite.</h2>
              </div>
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
