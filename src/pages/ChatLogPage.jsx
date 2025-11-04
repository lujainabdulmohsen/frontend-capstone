export default function ChatLogPage() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #002E47, #2A4628)",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "2rem" }}>
        My Chat History
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#fff",
        }}
      >
        No previous chats found.
      </p>
    </section>
  );
}
