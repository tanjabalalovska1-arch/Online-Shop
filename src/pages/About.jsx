import "./About.css";
import { useLanguage } from "../context/LanguageContext.jsx";

function About() {
  const { t } = useLanguage();

  return (
    <section className="about-us">
      <div className="about-content">
        <span className="about-label">{t("about.label")}</span>

        <h2>{t("about.title")}</h2>

        <p className="about-intro">{t("about.intro")}</p>

        <div className="about-divider"></div>

        <p>{t("about.p1")}</p>

        <p>{t("about.p2")}</p>

        <p className="about-signature">{t("about.signature")}</p>
      </div>
    </section>
  );
}

export default About;