import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as usersAPI from "../../utilities/users-api";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    try {
      const loggedInUser = await usersAPI.login(formData);
      if (loggedInUser) {
        setUser(loggedInUser);
        navigate("/assistant"); // ✅ نفس السلوك بالهوم بيج
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setUser(null);
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <p>Please sign in to continue</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
