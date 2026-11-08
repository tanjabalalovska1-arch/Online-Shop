import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(t("register.passwordLength"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    const result = register(name.trim(), email.trim(), password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <p className="register-label">{t("register.label")}</p>

        <h1>{t("register.title")}</h1>

        <p className="register-description">{t("register.description")}</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="register-name">{t("register.fullName")}</label>
          <input
            id="register-name"
            type="text"
            placeholder={t("register.fullNamePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="register-email">{t("register.email")}</label>
          <input
            id="register-email"
            type="email"
            placeholder={t("register.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="register-password">{t("register.password")}</label>
          <input
            id="register-password"
            type="password"
            placeholder={t("register.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm-password">
            {t("register.confirmPassword")}
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder={t("register.confirmPlaceholder")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="register-error">{error}</p>}

          <button type="submit" className="register-submit">
            {t("register.submit")}
          </button>
        </form>

        <p className="register-login">
          {t("register.haveAccount")}{" "}
          <Link to="/login">{t("register.login")}</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
