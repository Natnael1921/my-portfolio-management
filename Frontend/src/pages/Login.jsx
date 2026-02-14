import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; 
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
