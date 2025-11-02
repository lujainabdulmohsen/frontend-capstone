import "./styles.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as serviceRequestAPI from "../../utilities/serviceRequest-api";

export default function ServiceRequestIndexPage() {
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", time: "" });
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const reqs = await serviceRequestAPI.index();
        setRequests(reqs || []);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }
    fetchAll();
  }, []);

  function startEdit(r) {
    setEditingId(r.id);
    setEditForm({
      date: r.payload?.date || "",
      time: r.payload?.time || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ date: "", time: "" });
  }

  async function handleEditSubmit(e, id) {
    e.preventDefault();
    try {
      const updated = await serviceRequestAPI.update(id, {
        payload: { date: editForm.date, time: editForm.time },
      });
      setRequests(prev => prev.map(r => (r.id === id ? updated : r)));
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update appointment:", err);
    }
  }

  function confirmDelete(id) {
    setDeleteId(id);
  }

  async function handleDelete() {
    try {
      await serviceRequestAPI.deleteRequest(deleteId);
      setRequests(prev => prev.filter(r => r.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete request:", err);
    }
  }

  const availableTimes = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  return (
    <section className="requests-page">
      <h1>My Service Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map(r => (
          <div key={r.id} className="request-card">
            <h3>{r.service?.name}</h3>
            <p><strong>Agency:</strong> {r.service?.agency?.name}</p>
            <p><strong>Status:</strong> {r.status}</p>
            <p><strong>Created At:</strong> {r.created_at.slice(0, 10)}</p>

            {r.payload?.date && r.payload?.time && (
              <div className="appointment-section">
                <h4>Appointment</h4>
                {editingId === r.id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, r.id)} className="edit-form">
                    <div className="inline-selects">
                      <select value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} required>
                        <option value="">Select Date</option>
                        {availableDates.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>

                      <select value={editForm.time} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} required>
                        <option value="">Select Time</option>
                        {availableTimes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="edit-btns">
                      <button type="submit" className="save-btn">Save</button>
                      <button type="button" onClick={cancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p><strong>Date:</strong> {r.payload.date}</p>
                    <p><strong>Time:</strong> {r.payload.time}</p>
                  </>
                )}
              </div>
            )}

            {editingId !== r.id && (
              <div className="request-actions">
                <Link to={`/requests/${r.id}`} className="detail-btn">Details</Link>

                {r.payload?.date && r.payload?.time && (
                  <button className="edit-btn" onClick={() => startEdit(r)}>
                    Edit
                  </button>
                )}

                <button className="delete-btn" onClick={() => confirmDelete(r.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}

      {/* نافذة التأكيد المخصصة */}
      {deleteId && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this request?</p>
            <div className="confirm-btns">
              <button className="cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
