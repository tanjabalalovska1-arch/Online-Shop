import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
        <p className="login-label">WELCOME BACK</p>

        <h1>Login</h1>

        <p className="login-description">Sign in to your Nexora account.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>

          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>

          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <p className="login-register">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
