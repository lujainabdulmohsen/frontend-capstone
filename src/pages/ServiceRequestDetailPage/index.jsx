import "./styles.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as serviceRequestAPI from "../../utilities/serviceRequest-api";

export default function ServiceRequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const passedRequest = location.state?.request || null;
  const [request, setRequest] = useState(passedRequest);
  const [loading, setLoading] = useState(!passedRequest);

  useEffect(() => {
    async function fetchRequest() {
      if (!passedRequest) {
        try {
          const data = await serviceRequestAPI.show(id);
          setRequest(data);
        } catch (err) {
          console.error("Failed to fetch request:", err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchRequest();
  }, [id, passedRequest]);

  if (loading) return <h3>Loading...</h3>;
  if (!request) return <h3>Request not found.</h3>;

  let info = {};
  try {
    let raw = request.payload;
    if (typeof raw === "string") {
      while (typeof raw === "string") {
        raw = JSON.parse(raw);
      }
    }
    info = raw || {};
  } catch {
    info = {};
  }

  return (
    <section className="detail-page">
      <h1>Service Request Details</h1>

      <p><strong>Service:</strong> {request.service?.name}</p>
      <p><strong>Agency:</strong> {request.service?.agency?.name}</p>
      <p><strong>Status:</strong> {request.status}</p>
      <p><strong>Fee:</strong> {request.service?.fee} SAR</p>
      <p><strong>Created At:</strong> {request.created_at.slice(0, 10)}</p>

      {info.date && <p><strong>Appointment Date:</strong> {info.date}</p>}
      {info.time && <p><strong>Appointment Time:</strong> {info.time}</p>}

      <button
        onClick={() => navigate("/requests")}
        className="back-btn"
      >
        Back to My Requests
      </button>
    </section>
  );
}
