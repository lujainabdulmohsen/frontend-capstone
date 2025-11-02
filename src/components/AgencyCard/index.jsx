import { Link } from "react-router-dom";
import "./styles.css";

export default function AgencyCard({ agency }) {
  return (
    <Link to={`/agencies/${agency.id}`} className="agency-card">
      <h3>{agency.name}</h3>
      <p>{agency.description}</p>
    </Link>
  );
}
