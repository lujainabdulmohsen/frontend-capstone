import "./styles.css";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <Link to={`/services/${service.id}`}>
        <div className="service-card-content">
          <h2>{service.name}</h2>
          <p>{service.description}</p>
          <p className="service-fee">Fee: {service.fee} SAR</p>
        </div>
      </Link>
    </div>
  );
}
