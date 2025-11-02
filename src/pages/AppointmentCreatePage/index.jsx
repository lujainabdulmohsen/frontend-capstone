import "./styles.css";
import { useState, useEffect } from "react";
import * as appointmentAPI from "../../utilities/appointment-api";
import * as serviceAPI from "../../utilities/service-api";

export default function AppointmentCreatePage() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadServices() {
      const data = await serviceAPI.index();
      const filtered = data.filter(
        (s) =>
          !s.name.toLowerCase().includes("violation") &&
          !s.name.toLowerCase().includes("license")
      );
      setServices(filtered);
    }
    loadServices();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!serviceId || !date || !time) return setMessage("⚠️ Please fill all fields.");

    const payload = {
      service: Number(serviceId),
      date,
      time,
      location: "Nearest Government Service Center",
    };

    const result = await appointmentAPI.create(payload);
    if (result) {
      setMessage("✅ Appointment booked successfully!");
      setServiceId("");
      setDate("");
      setTime("");
    } else {
      setMessage("❌ Failed to book appointment.");
    }
  }

  const times = ["08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <section className="appointment-create-page">
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Service:
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            <option value="">-- Select Service --</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Time:
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">-- Select Time --</option>
            {times.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <p><strong>Location:</strong> Nearest Government Service Center</p>

        <button type="submit">Book Appointment</button>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
}
