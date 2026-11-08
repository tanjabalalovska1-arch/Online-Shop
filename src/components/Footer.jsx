import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";

const currentYear = new Date().getFullYear();

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <Link
            to="/"
            className="footer-brand-link"
            aria-label={t("header.brandHome")}
          >
            <span className="brand-icon" aria-hidden="true">
              ✦
            </span>
            <span className="footer-brand-name">Olivé</span>
          </Link>

          <p>{t("footer.description")}</p>
        </div>

        <nav className="footer-column" aria-label={t("footer.exploreAria")}>
          <h3>{t("footer.explore")}</h3>
          <Link to="/">{t("footer.home")}</Link>
          <Link to="/shop">{t("footer.shop")}</Link>
          <Link to="/about">{t("footer.about")}</Link>
        </nav>

        <nav className="footer-column" aria-label={t("footer.accountAria")}>
          <h3>{t("footer.customerAccount")}</h3>
          <Link to="/favorites">{t("footer.favorites")}</Link>
          <Link to="/login">{t("footer.login")}</Link>
          <Link to="/register">{t("footer.register")}</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>{t("footer.rights", { year: currentYear })}</p>
        <p className="footer-note">{t("footer.note")}</p>
      </div>
    </footer>
  );
}

export default Footer;
