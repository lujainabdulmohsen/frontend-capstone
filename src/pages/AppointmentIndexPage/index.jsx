import "./styles.css";
import { useEffect, useState } from "react";
import * as appointmentAPI from "../../utilities/appointment-api";

export default function AppointmentIndexPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", time: "" });

  useEffect(() => {
    async function loadAppointments() {
      const data = await appointmentAPI.index();
      setAppointments(data || []);
      setLoading(false);
    }
    loadAppointments();
  }, []);

  function startEdit(appointment) {
    setEditingId(appointment.id);
    setEditForm({ date: appointment.date, time: appointment.time });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ date: "", time: "" });
  }

  async function handleEditSubmit(e, id) {
    e.preventDefault();
    try {
      const updated = await appointmentAPI.updateAppointment(id, editForm);
      setAppointments(prev =>
        prev.map(a => (a.id === id ? { ...a, ...updated } : a))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update appointment:", err);
    }
  }

  if (loading) return <h3>Loading...</h3>;
  if (!appointments.length) return <h3>No appointments found.</h3>;

  return (
    <section className="appointments-page">
      <h1>My Appointments</h1>

      <div className="appointment-card-container">
        {appointments.map(a => (
          <div key={a.id} className="appointment-card">
            <h2>{a.service?.name}</h2>

            {editingId === a.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, a.id)} className="edit-form">
                <label>
                  Date:
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Time:
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                    required
                  />
                </label>

                <div className="edit-btns">
                  <button type="submit" className="save-btn">💾 Save</button>
                  <button type="button" onClick={cancelEdit} className="cancel-btn">✖ Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <p><strong>Date:</strong> {a.date}</p>
                <p><strong>Time:</strong> {a.time}</p>
                <p><strong>Location:</strong> {a.location}</p>

                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => startEdit(a)}>✏️ Edit</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
