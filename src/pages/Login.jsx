import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = login(email.trim(), password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="login-label">{t("login.label")}</p>

        <h1>{t("login.title")}</h1>

        <p className="login-description">{t("login.description")}</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">{t("login.email")}</label>

          <input
            id="login-email"
            type="email"
            placeholder={t("login.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-password">{t("login.password")}</label>

          <input
            id="login-password"
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            {t("login.submit")}
          </button>
        </form>

        <p className="login-register">
          {t("login.noAccount")} <Link to="/register">{t("login.register")}</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
