import "./styles.css";
import { useState } from "react";
import * as userService from "../../utilities/users-service";

export default function LoginPage({ setUser }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await userService.login(formData);
      setUser(user);
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <p>Please sign in to continue</p>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
