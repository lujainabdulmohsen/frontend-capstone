import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as usersAPI from "../../utilities/users-api";

export default function HomePage({ user, setUser }) {
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleLogin(evt) {
    try {
      evt.preventDefault();
      const loggedInUser = await usersAPI.login(formData);
     
      setUser(loggedInUser);
      navigate("/assistant");
    } catch (err) {
      setUser(null);
    }
  }

  return (
    <section className="home-page">
      <h1>Welcome to Yusr AI Assistant</h1>
      <p className="intro-text">
        Your digital gateway to unified government services.
      </p>
      <h2 className="tagline">With Yusr, all your services closer to you.</h2>

      {!user && (
        <form onSubmit={handleLogin} className="form-container login">
          <h2>Login</h2>
          <p>
            <label htmlFor="id_username">Username:</label>
            <input
              value={formData.username}
              type="text"
              name="username"
              maxLength="150"
              required
              id="id_username"
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="id_password">Password:</label>
            <input
              value={formData.password}
              type="password"
              name="password"
              required
              id="id_password"
              onChange={handleChange}
            />
          </p>
          <button type="submit" className="start-btn">
            Login
          </button>
        </form>
      )}

      {user && (
        <button className="start-btn" onClick={() => navigate("/assistant")}>
          Start Now
        </button>
      )}
    </section>
  );
}
