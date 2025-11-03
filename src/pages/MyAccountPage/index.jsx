import { useEffect, useState } from "react";
import { getUser } from "../../utilities/users-api";
import { getMyBankAccount, updateMyBankAccount, deleteMyBankAccount } from "../../utilities/bankAccount-api";

export default function MyAccountPage() {
  const [user, setUser] = useState(null);
  const [bank, setBank] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [showBank, setShowBank] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const u = await getUser();
      setUser(u);
      try {
        const b = await getMyBankAccount();
        setBank(b);
        setDisplayName(b.display_name || "");
      } catch {}
      setLoading(false);
    })();
  }, []);

  async function handleUpdateBank(e) {
    e.preventDefault();
    setLoading(true);
    const updated = await updateMyBankAccount({ display_name: displayName });
    setBank(updated);
    setIsEditing(false);
    setMsg("Saved");
    setTimeout(()=>setMsg(""),1500);
    setLoading(false);
  }

  async function handleDeleteBank() {
    setLoading(true);
    await deleteMyBankAccount();
    setBank(null);
    setMsg("Deleted");
    setTimeout(()=>setMsg(""),1500);
    setLoading(false);
  }

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "2rem",
      background: "linear-gradient(135deg, #005fa3, #0a6d54)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "1.5rem 2rem",
      marginBottom: "1.5rem",
      width: "100%",
      maxWidth: "700px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "1rem",
      textAlign: "center",
    },
    field: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.6rem 0",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
    },
    label: { fontWeight: "600" },
    input: {
      width: "100%",
      padding: "0.6rem",
      borderRadius: "8px",
      border: "none",
      marginTop: "0.5rem",
      fontSize: "1rem",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
      gap: "10px",
    },
    btn: {
      flex: 1,
      padding: "0.7rem 1rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "0.25s",
    },
    view: { background: "#f1f7f9", color: "#003a63" },
    edit: { background: "#004e92", color: "#fff" },
    delete: { background: "#b33a3a", color: "#fff" },
    smallInfo: {
      background: "rgba(255,255,255,0.08)",
      padding: "1rem",
      borderRadius: "10px",
      marginTop: "1rem",
    }
  };

  if (loading) {
    return (
      <div style={{...styles.page, justifyContent:"center"}}>
        <div style={{color:"#fff", fontSize:18}}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My Account</h1>

      <div style={styles.card}>
        <h2 style={{textAlign:"center", marginBottom:10}}>User Info</h2>
        <div style={styles.field}>
          <span style={styles.label}>Username:</span>
          <span>{user?.username || ""}</span>
        </div>
        <div style={styles.field}>
          <span style={styles.label}>Email:</span>
          <span>{user?.email || ""}</span>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={{textAlign:"center", marginBottom:10}}>My Bank Account</h2>
        {!bank ? (
          <p style={{ opacity: 0.9 }}>No bank account found</p>
        ) : (
          <>
            <div style={styles.buttonRow}>
              <button
                style={{ ...styles.btn, ...styles.view }}
                onClick={() => setShowBank(!showBank)}
              >
                {showBank ? "Hide" : "View"}
              </button>
              <button
                style={{ ...styles.btn, ...styles.edit }}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button
                style={{ ...styles.btn, ...styles.delete }}
                onClick={handleDeleteBank}
              >
                Delete
              </button>
            </div>

            {showBank && (
              <div style={styles.smallInfo}>
                <p><strong>Display Name:</strong> {bank.display_name}</p>
                <p style={{wordBreak:"break-all"}}><strong>IBAN:</strong> {bank.iban}</p>
              </div>
            )}

            {isEditing && (
              <form onSubmit={handleUpdateBank} style={{ marginTop: "1rem" }}>
                <label>
                  New Display Name:
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    style={styles.input}
                  />
                </label>
                <button
                  type="submit"
                  style={{
                    ...styles.btn,
                    ...styles.edit,
                    marginTop: "0.6rem",
                    width: "100%",
                  }}
                >
                  Save
                </button>
              </form>
            )}
          </>
        )}
      </div>

      {msg && <div style={{marginTop:10, color:"#fff"}}>{msg}</div>}
    </div>
  );
}
