import "./styles.css";
import { useState, useEffect, useRef } from "react";
import * as serviceRequestAPI from "../../utilities/serviceRequest-api";

export default function ChatBotPage() {
  const [messages, setMessages] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [step, setStep] = useState("welcome");
  const [appointment, setAppointment] = useState({ date: "", time: "" });
  const [pendingService, setPendingService] = useState(null);
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
      const filtered = data.filter(
        (s) => s.agency && s.agency.id === agency.id
      );
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

  async function finalizeRequest(service, reply, appointmentInfo = {}) {
    try {
      const payload =
        Object.keys(appointmentInfo).length > 0 ? appointmentInfo : {};
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
        { sender: "bot", text: "💳 Processing payment from your Yusr account..." },
      ]);
      try {
        const request = await serviceRequestAPI.create(pendingService.id, {});
        await serviceRequestAPI.payServiceRequest(request.id);
        const successText =
          pendingService.name.includes("Vehicle")
            ? "✅ New Vehicle registration succeeded!"
            : `✅ ${pendingService.name} succeeded!`;
        setMessages((prev) => [...prev, { sender: "bot", text: successText }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Payment failed. Please try again." },
        ]);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "Cancel Payment" },
        {
          sender: "bot",
          text: "❌ Payment cancelled. Your request was not submitted.",
        },
      ]);
    }
    setPendingService(null);
    setStep("services");
  }

  function handleBack() {
    if (step === "appointment") setStep("services");
    else if (step === "services") {
      setStep("welcome");
      setSelectedAgency(null);
    }
  }

  return (
    <section className="chat-page">
      <div className="chat-header">
        <h1>Yusr AI Assistant</h1>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`msg-row ${msg.sender}`}>
            <div className="msg-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-options">
        {step === "welcome" && (
          <div className="option-row">
            {agencies.map((a) => (
              <button key={a.id} onClick={() => handleAgencySelect(a)}>
                {a.name}
              </button>
            ))}
          </div>
        )}

        {step === "services" && services.length > 0 && (
          <>
            <div className="option-row">
              {services.map((s) => (
                <button key={s.id} onClick={() => handleServiceSelect(s)}>
                  {s.name}
                </button>
              ))}
            </div>
            <div className="back-row">
              <button onClick={handleBack}>Back to Agencies</button>
            </div>
          </>
        )}

        {step === "appointment" && (
          <form onSubmit={handleAppointmentSubmit} className="appointment-form">
            <div className="inline-selects">
              <select
                value={appointment.date}
                onChange={(e) =>
                  setAppointment({ ...appointment, date: e.target.value })
                }
                required
              >
                <option value="">Select Date</option>
                {Array.from({ length: 30 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  return (
                    <option key={i} value={date.toISOString().split("T")[0]}>
                      {date.toISOString().split("T")[0]}
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
            </div>
            <div className="appointment-buttons">
              <button type="submit">Confirm Appointment</button>
              <button type="button" onClick={handleBack}>
                Back to Agencies
              </button>
            </div>
          </form>
        )}

        {step === "payment" && (
          <div className="option-row">
            <button onClick={() => handlePayment(true)}>✅ Confirm Payment</button>
            <button onClick={() => handlePayment(false)}>❌ Cancel</button>
          </div>
        )}
      </div>
    </section>
  );
}
