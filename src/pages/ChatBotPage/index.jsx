import { useState, useEffect, useRef } from "react";
import * as serviceRequestAPI from "../../utilities/serviceRequest-api";
import faqs from "../../utilities/faqs";

export default function ChatBotPage() {
  const [messages, setMessages] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [step, setStep] = useState("welcome");
  const [appointment, setAppointment] = useState({ date: "", time: "" });
  const [pendingService, setPendingService] = useState(null);
  const [vehicleSerial, setVehicleSerial] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    setMessages([
      { sender: "bot", text: "Welcome to Yusr AI Assistant." },
      { sender: "bot", text: "How can I assist you today?" },
    ]);
    fetchAgencies();
  }, []);

  async function fetchAgencies() {
    try {
      const data = await serviceRequestAPI.getAgencies();
      setAgencies(data);
    } catch (err) {
      console.error("Failed to load agencies:", err);
    }
  }

  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
  }, [messages]);

  async function handleAgencySelect(agency) {
    setSelectedAgency(agency);
    try {
      const data = await serviceRequestAPI.getServices();
      const filtered = data.filter((s) => s.agency && s.agency.id === agency.id);
      setServices(filtered);
      setStep("services");
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: agency.name },
        { sender: "bot", text: `Please choose a service from ${agency.name}.` },
      ]);
    } catch (err) {
      console.error("Failed to load services:", err);
    }
  }

  async function handleServiceSelect(service) {
    setSelectedService(service);
    setMessages((prev) => [...prev, { sender: "user", text: service.name }]);

    if (service.name.match(/Vehicle/i)) {
      setStep("serial");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Please enter your vehicle serial number." },
      ]);
      return;
    }

    if (service.name.match(/Appointment|Vaccination|Hospital/i)) {
      setStep("appointment");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Please select a date and time for your appointment.",
        },
      ]);
    } else {
      const reply = getServiceReply(service);
      if (reply.includes("Fee:")) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: reply },
          {
            sender: "bot",
            text: "Would you like to pay this fee from your Yusr bank account?",
          },
        ]);
        setPendingService(service);
        setStep("payment");
      } else {
        await finalizeRequest(service, reply);
      }
    }
  }

  async function handleSerialSubmit(e) {
    e.preventDefault();
    if (!vehicleSerial.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: `Serial: ${vehicleSerial}` },
      { sender: "bot", text: "Thank you. Processing your request..." },
    ]);

    const reply = getServiceReply(selectedService);
    if (reply.includes("Fee:")) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply },
        {
          sender: "bot",
          text: "Would you like to pay this fee from your Yusr bank account?",
        },
      ]);
      setPendingService(selectedService);
      setStep("payment");
    } else {
      await finalizeRequest(selectedService, reply, {}, { serial: vehicleSerial });
    }
    setVehicleSerial("");
  }

  function getServiceReply(service) {
    if (service.name.includes("National ID"))
      return "Your National ID will be renewed for 10 years. Fee: 100 SAR.";
    if (service.name.includes("Passport"))
      return "Passport renewal valid for 5 years. Fee: 200 SAR.";
    if (service.name.includes("Medical Report"))
      return "Your medical report has been submitted and will be sent to your email.";
    if (service.name.includes("License"))
      return "Driving License renewal for 10 years. Fee: 150 SAR.";
    if (service.name.includes("Vehicle"))
      return "New Vehicle registration Fee: 150 SAR.";
    if (
      service.name.includes("Violation") ||
      service.name.includes("Fine") ||
      service.name.includes("Traffic")
    )
      return "Traffic fine payment processed successfully. Fee: 150 SAR.";
    return `${service.name} has been processed successfully.`;
  }

  async function finalizeRequest(service, reply, appointmentInfo = {}, extraData = {}) {
    try {
      const payload = Object.keys(appointmentInfo).length
        ? { ...appointmentInfo, ...extraData }
        : { ...extraData };

      if (service.name.match(/Vehicle|Medical Report/i)) {
        payload.status = "Approved";
      }

      await serviceRequestAPI.create(service.id, payload);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Your request has been submitted successfully." },
        { sender: "bot", text: reply },
      ]);
    } catch (err) {
      console.error("Failed to process request:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Failed to process ${service.name}. Please try again.`,
        },
      ]);
    }
  }

  async function handleAppointmentSubmit(e) {
    e.preventDefault();
    if (!appointment.date || !appointment.time) return;
    const reply = `Appointment booked on ${appointment.date} at ${appointment.time}. Location: nearest center.`;
    await finalizeRequest(selectedService, reply, appointment);
    setStep("services");
  }

  async function handlePayment(confirm) {
    if (confirm) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "Confirm Payment" },
        {
          sender: "bot",
          text: "Processing payment from your Yusr account...",
        },
      ]);
      try {
        const request = await serviceRequestAPI.create(pendingService.id, {
          status: "Approved",
        });
        await serviceRequestAPI.payServiceRequest(request.id);
        const successText = `${pendingService.name} succeeded!`;
        setMessages((prev) => [...prev, { sender: "bot", text: successText }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Payment failed. Please try again." },
        ]);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "Cancel Payment" },
        {
          sender: "bot",
          text: "Payment cancelled. Your request was not submitted.",
        },
      ]);
    }
    setPendingService(null);
    setStep("services");
  }

  function handleBack() {
    if (step === "appointment" || step === "serial") setStep("services");
    else if (step === "services" || step === "faqs") {
      setStep("welcome");
      setSelectedAgency(null);
    }
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        minHeight: "90vh",
        background: "linear-gradient(135deg, #002E47, #2A4628)",
        borderRadius: "1rem",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "700", textAlign: "center" }}>
        Yusr AI Assistant
      </h1>

      <div
        ref={chatBoxRef}
        style={{
          background:
            "linear-gradient(145deg, rgba(0,46,71,0.85) 0%, rgba(56,105,134,0.75) 40%, rgba(119,150,99,0.6) 100%)",
          width: "85%",
          maxWidth: "650px",
          minHeight: "400px",
          maxHeight: "400px",
          overflowY: "auto",
          borderRadius: "24px",
          padding: "1.2rem",
          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                padding: "0.8rem 1.2rem",
                borderRadius: "18px",
                fontSize: "1rem",
                lineHeight: "1.4",
                maxWidth: "80%",
                background:
                  msg.sender === "user" ? "#004e92" : "#d8f0ef",
                color: msg.sender === "user" ? "#fff" : "#003a63",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {step === "welcome" && (
          <div style={row}>
            {agencies.map((a) => (
              <button
                key={a.id}
                onClick={() => handleAgencySelect(a)}
                style={btn}
              >
                {a.name}
              </button>
            ))}
            <button onClick={() => setStep("faqs")} style={btn}>
              Common Questions
            </button>
          </div>
        )}

        {step === "faqs" && (
          <div style={col}>
            {faqs.map((f, i) => (
              <button
                key={i}
                onClick={() => {
                  setMessages((prev) => [
                    ...prev,
                    { sender: "user", text: f.question },
                    { sender: "bot", text: f.answer },
                  ]);
                }}
                style={btn}
              >
                {f.question}
              </button>
            ))}
            <button onClick={handleBack} style={backBtn}>
              Back
            </button>
          </div>
        )}

        {step === "services" && services.length > 0 && (
          <div style={col}>
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => handleServiceSelect(s)}
                style={btn}
              >
                {s.name}
              </button>
            ))}
            <button onClick={handleBack} style={backBtn}>
              Back to Agencies
            </button>
          </div>
        )}

        {step === "serial" && (
          <form onSubmit={handleSerialSubmit} style={col}>
            <input
              type="text"
              placeholder="Enter vehicle serial number"
              value={vehicleSerial}
              onChange={(e) => setVehicleSerial(e.target.value)}
              style={{
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "0.85rem",
                width: "100%",
                maxWidth: "300px",
              }}
              required
            />
            <button type="submit" style={btn}>
              Submit
            </button>
            <button type="button" onClick={handleBack} style={backBtn}>
              Back
            </button>
          </form>
        )}

        {step === "appointment" && (
          <form onSubmit={handleAppointmentSubmit} style={col}>
            <select
              value={appointment.date}
              onChange={(e) =>
                setAppointment({ ...appointment, date: e.target.value })
              }
              required
              style={select}
            >
              <option value="">Select Date</option>
              {Array.from({ length: 30 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i);
                return (
                  <option key={i} value={d.toISOString().split("T")[0]}>
                    {d.toISOString().split("T")[0]}
                  </option>
                );
              })}
            </select>

            <select
              value={appointment.time}
              onChange={(e) =>
                setAppointment({ ...appointment, time: e.target.value })
              }
              required
              style={select}
            >
              <option value="">Select Time</option>
              {[
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <button type="submit" style={btn}>
              Confirm Appointment
            </button>
            <button type="button" onClick={handleBack} style={backBtn}>
              Back
            </button>
          </form>
        )}

        {step === "payment" && (
          <div style={row}>
            <button onClick={() => handlePayment(true)} style={btn}>
              Confirm Payment
            </button>
            <button
              onClick={() => handlePayment(false)}
              style={{ ...btn, background: "#c0392b" }}
            >
               Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

const btn = {
  background: "#004e92",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "0.6rem 1.4rem",
  fontSize: "0.95rem",
  cursor: "pointer",
};

const backBtn = { ...btn, background: "#00796b" };
const row = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.8rem" };
const col = { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" };
const select = {
  padding: "0.6rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "0.95rem",
  minWidth: "150px",
};
