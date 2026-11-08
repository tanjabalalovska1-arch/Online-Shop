import { useNavigate, NavLink } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <main className="un-home">
      <div className={`un-layout ${user ? "no-sidebar" : ""}`}>
        {/* LEFT SIDEBAR - USER ACCOUNT */}
        {!user && (
          <aside className="un-sidebar">
            <p className="un-sidebar-label">{t("home.accountLabel")}</p>

            <h2>{t("home.welcome")}</h2>

            <p className="un-status">{t("home.status")}</p>

            <NavLink to="/login" className="un-category-row">
              <span className="un-category-name">{t("home.login")}</span>
              <span className="un-category-arrow">↗</span>
            </NavLink>

            <NavLink to="/register" className="un-category-row">
              <span className="un-category-name">{t("home.register")}</span>
              <span className="un-category-arrow">↗</span>
            </NavLink>
          </aside>
        )}

        {/* RIGHT MAIN CONTENT */}
        <div className="un-main">
          <section className="un-hero">
            <div className="un-copy">
              <h1>
                {t("home.titleLine1")}
                <br />
                <em>{t("home.titleLine2")}</em>
              </h1>

              <p className="un-description">{t("home.description")}</p>

              <button
                type="button"
                className="un-shop-button"
                onClick={() => navigate("/shop")}
              >
                {t("home.exploreShop")}
                <span>↗</span>
              </button>
            </div>

            <div className="un-visual">
              <img
                className="un-hero-image"
                src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85"
                alt={t("home.imageAlt")}
                width="1200"
                height="900"
              />

              <div className="un-image-overlay" />

              <div className="un-image-caption">
                <span className="un-caption-line" />
                <p>{t("home.captionSmall")}</p>
                <h2>{t("home.captionHeading")}</h2>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="un-footer">
        <span>{t("home.footer")}</span>
      </footer>
    </main>
  );
}

export default Home;
