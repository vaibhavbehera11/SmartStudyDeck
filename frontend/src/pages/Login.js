
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <h2 className="auth-title">📚 Smart Study Deck</h2>
        <p className="auth-sub">Welcome back 👋</p>

        <form onSubmit={handleLogin}>
          <input
            className="input modern-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input modern-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button primary full-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
