
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

function NotFound() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.description")}</p>
      <Link to="/">{t("notFound.back")}</Link>
    </div>
  );
}

export default NotFound;
