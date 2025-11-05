import { useState } from "react";
import { updateMyBankAccount, deleteMyBankAccount, addBankAccount } from "../../utilities/bankAccount-api";
import "./styles.css";

export default function MyAccountPage({ user, bankAcct, setBankAcct }) {
  const initialData = {
    display_name:          bankAcct ? bankAcct.display_name : "",
    infinite_balance:      true,
    credit_card_number:    bankAcct ? bankAcct.credit_card_number : "0000000000000000",
    expiration_date:       bankAcct ? bankAcct.expiration_date : "0000",
    security_code:         bankAcct ? bankAcct.security_code : "000",
  }
  const [formData, setFormData] = useState(initialData)

  const [showBank, setShowBank] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [msg, setMsg] = useState("");


  async function handleUpdateBank(e) {
    e.preventDefault();
    const updated = await updateMyBankAccount(formData);
    setBankAcct(updated);
    setIsEditing(false);
    setMsg("Saved");
  }

  async function handleDeleteBank() {
    try {
      const res = await deleteMyBankAccount();
      if (res.ok) {
        setBankAcct(null);
        setShowBank(false);
        setIsEditing(false);
        setFormData({
          display_name:          "",
          infinite_balance:      true,
          credit_card_number:    "0000000000000000",
          expiration_date:       "0000",
          security_code:         "000",
        });
        setMsg("Bank account deleted successfully.");
      } else {
        throw new Error("error deleting account")
      }
    } catch (err) {
      console.log(err, "checking error")
      setMsg("Error deleting bank account.");
    }

  }

  async function handleCreateBank(e) {
    e.preventDefault();

    try {
        const newBankAcct = await addBankAccount(formData)
        setBankAcct(newBankAcct);
        setMsg("New bank account added.");
    } catch (err) {
      setMsg(err);
    }

  }

  function handleChange(evt) {
    const updatedData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(updatedData);
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

        {!bankAcct ? (
              <form onSubmit={handleCreateBank} style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <label htmlFor="display-name">Display Name:</label>
                <input name="display_name" id="display-name" value={formData.display_name} type="text" onChange={handleChange} />

                <label htmlFor="credit_card_number">Credit Card Number:</label>
                <input name="credit_card_number" type="text" id="credit_card_number" value={formData.credit_card_number} minLength={16} maxLength={16} onChange={handleChange} />

                <label htmlFor="expiration_date">Expiration Date:</label>
                <input name="expiration_date" type="text" id="expiration_date" value={formData.expiration_date} minLength={4} maxLength={4} onChange={handleChange} />

                <label htmlFor="security_code">Security Code:</label>
                <input name="security_code" type="number" id="security_code" value={formData.security_code} min={100} max={999} onChange={handleChange} />

                <button type="submit" className="edit-btn">Add Your Credit Card Account</button>
              </form>
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
                <div>Name: {bankAcct.display_name}</div>
                <div>Card Number: {bankAcct.credit_card_number}</div>
                <div>Expiration: {bankAcct.expiration_date}</div>
              </div>
            )}

            {isEditing && (
              <form onSubmit={handleUpdateBank} className="edit-form">
                <label htmlFor="display-name">Display Name:</label>
                <input  name="display_name" type="text" id="display-name" value={formData.display_name} onChange={handleChange} />

                <label htmlFor="credit_card_number">Credit Card Number:</label>
                <input  name="credit_card_number" type="text" id="credit_card_number" value={formData.credit_card_number} minLength={16} maxLength={16} onChange={handleChange} />

                <label htmlFor="expiration_date">Expiration Date:</label>
                <input  name="expiration_date" type="text" id="expiration_date" value={formData.expiration_date} minLength={4} maxLength={4} onChange={handleChange} />

                <label htmlFor="security_code">Security Code:</label>
                <input type="number" id="security_code" value={formData.security_code} min={100} max={999} onChange={handleChange} />

                <button name="security_code" type="submit" className="edit-btn">Save</button>
              </form>
            )}
          </>
        )}
      </div>

      {msg && <div className="status-msg">{msg}</div>}
    </section>
  );
}
