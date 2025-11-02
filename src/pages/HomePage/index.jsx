import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function HomePage({ user }) {
  const navigate = useNavigate();

  return (
    <section className="home-page">
      <h1>Welcome to Yusr AI Assistant</h1>
      <p className="intro-text">
        Your digital gateway to unified government services.
      </p>
      <h2 className="tagline">With Yusr, all your services closer to you.</h2>

      {user && (
        <button className="start-btn" onClick={() => navigate("/assistant")}>
          Start Now
        </button>
      )}
    </section>
  );
}
