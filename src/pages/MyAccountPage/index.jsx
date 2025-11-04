import { useEffect, useState } from "react";
import { getUser } from "../../utilities/users-api";
import {
  getMyBankAccount,
  updateMyBankAccount,
  deleteMyBankAccount,
} from "../../utilities/bankAccount-api";
import "./styles.css";

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
    setTimeout(() => setMsg(""), 1500);
    setLoading(false);
  }

  async function handleDeleteBank() {
    if (!bank) return;
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/bank-account/", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        setBank(null);
        setShowBank(false);
        setIsEditing(false);
        setMsg("Bank account deleted successfully.");
      } else if (response.status === 400) {
        setMsg("This bank account is already deleted.");
        setBank(null);
      } else {
        const data = await response.json();
        setMsg(data.error || "Failed to delete bank account.");
      }
    } catch {
      setMsg("Error deleting bank account.");
    }
    setLoading(false);
  }

  async function handleAddBankAccount() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMsg("User not authenticated. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/bank-account/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          display_name: "Primary Account",
          infinite_balance: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBank(data);
        setDisplayName(data.display_name || "");
        setMsg("New bank account added.");
      } else if (response.status === 401) {
        setMsg("Unauthorized. Please log in again.");
      } else {
        const err = await response.json();
        setMsg(err.error || "Failed to add bank account.");
      }
    } catch {
      setMsg("Error adding bank account.");
    }
    setLoading(false);
  }

  return (
    <section className="account-page">
      <h1>My Account</h1>

      <div className="account-card">
        <h2>User Info</h2>
        <div className="account-field">
          <span className="label">Username:</span>
          <span>{user?.username || ""}</span>
        </div>
        <div className="account-field">
          <span className="label">Email:</span>
          <span>{user?.email || ""}</span>
        </div>
      </div>

      <div className="account-card">
        <h2>My Bank Account</h2>

        {!bank ? (
          <>
            <p className="no-bank">No bank account found</p>
            <button className="edit-btn" onClick={handleAddBankAccount}>
              Add Bank Account
            </button>
          </>
        ) : (
          <>
            <div className="button-row">
              <button
                className="view-btn"
                onClick={() => setShowBank(!showBank)}
              >
                {showBank ? "Hide" : "View"}
              </button>
              <button
                className="edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button className="delete-btn" onClick={handleDeleteBank}>
                Delete
              </button>
            </div>

            {showBank && (
              <div className="bank-info">
                <p>
                  <strong>Display Name:</strong> {bank.display_name}
                </p>
                <p style={{ wordBreak: "break-all" }}>
                  <strong>IBAN:</strong> {bank.iban}
                </p>
              </div>
            )}

            {isEditing && (
              <form onSubmit={handleUpdateBank} className="edit-form">
                <label>
                  New Display Name:
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </label>
                <button type="submit" className="edit-btn">
                  Save
                </button>
              </form>
            )}
          </>
        )}
      </div>

      {msg && <div className="status-msg">{msg}</div>}
    </section>
  );
}
