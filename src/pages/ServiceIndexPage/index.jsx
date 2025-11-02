import "./styles.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as serviceRequestAPI from "../../utilities/serviceRequest-api";

export default function ServiceRequestIndexPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const data = await serviceRequestAPI.index();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  return (
    <section className="requests-page">
      <h1>My Service Requests</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((r) => (
          <div key={r.id} className="request-card">
            <h3>{r.service?.name}</h3>
            <p><strong>Agency:</strong> {r.service?.agency?.name}</p>
            <p><strong>Status:</strong> {r.status}</p>
            <p><strong>Date:</strong> {r.created_at.slice(0, 10)}</p>

            <Link to={`/requests/${r.id}`} className="detail-btn">
              Details
            </Link>
          </div>
        ))
      )}
    </section>
  );
}
