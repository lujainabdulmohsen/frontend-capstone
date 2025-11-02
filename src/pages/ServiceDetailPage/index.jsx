import "./styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as serviceAPI from "../../utilities/service-api";
import * as serviceRequestAPI from "../../utilities/serviceRequest-api";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await serviceAPI.show(id);
        setService(data);

        // تحديد المدة تلقائياً حسب اسم الخدمة
        if (data.name.includes("National ID")) {
          setDuration("5 years");
        } else if (data.name.includes("Driving License")) {
          setDuration("3 years");
        } else if (data.name.includes("Passport")) {
          setDuration("10 years");
        } else {
          setDuration("N/A");
        }
      } catch (err) {
        console.log("Error loading service:", err);
        setService(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      setSubmitting(true);
      setMessage("");
      const payload = { duration, note };
      await serviceRequestAPI.create(Number(id), payload);
      setMessage("✅ Request submitted successfully!");
      setNote("");
    } catch (err) {
      setMessage("❌ Failed to submit the request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <h3>Loading...</h3>;
  if (!service) return <h3>Service not found</h3>;

  return (
    <section className="service-detail-page">
      <div className="card service-detail-card">
        <h1>{service.name}</h1>
        <p>{service.description}</p>
        <p><strong>Fee:</strong> {Number(service.fee).toFixed(2)} SAR</p>
      </div>

      <form className="form-container" onSubmit={handleSubmit} style={{ maxWidth: 520, margin: "24px auto" }}>
        <h3>Submit Request</h3>

        <p>
          <label htmlFor="id_duration">Duration:</label>
          <input
            id="id_duration"
            type="text"
            value={duration}
            readOnly
            style={{ border: "1px solid #ccc", padding: "6px", borderRadius: "6px" }}
          />
        </p>

        <p>
          <label htmlFor="id_note">Note (optional):</label>
          <input
            id="id_note"
            type="text"
            placeholder="Any notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </p>

        <button type="submit" className="btn submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Request"}
        </button>

        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </form>
    </section>
  );
}
