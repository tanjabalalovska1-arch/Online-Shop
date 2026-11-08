import { Link } from "react-router-dom";
import "./Breadcrumbs.css";
import { useLanguage } from "../context/LanguageContext.jsx";

function Breadcrumbs({ productName }) {
  const { t } = useLanguage();

  return (
    <nav className="breadcrumbs" aria-label={t("breadcrumbs.aria")}>
      <Link to="/">{t("breadcrumbs.home")}</Link>
      {" > "}
      <Link to="/">{t("breadcrumbs.products")}</Link>
      {" > "}
      <span>{productName}</span>
    </nav>
  );
}

export default Breadcrumbs;