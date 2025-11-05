import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import ChatBotPage from "../ChatBotPage";
import ServiceRequestIndexPage from "../ServiceRequestIndexPage";
import ServiceRequestDetailPage from "../ServiceRequestDetailPage";
import Navbar from "../../components/Navbar/Navbar";
import SignupPage from "../SignupPage/SignupPage";
import * as usersAPI from "../../utilities/users-api"
import * as bankAPI from "../../utilities/bankAccount-api";
import LoginPage from "../LoginPage/LoginPage";
import MyAccountPage from "../MyAccountPage";
import "../../utilities/globa.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [bankAcct, setBankAcct] = useState(null);

  console.log(user, bankAcct)

  useEffect(() => {
    async function verifyUser() {
      const verifiedUser = await usersAPI.getUser();
      setUser(verifiedUser)
      if (verifiedUser) {
        console.log(verifiedUser, "checking user data after signup")
        const creditInfo = await bankAPI.getMyBankAccount()
        setBankAcct(creditInfo.acct)
      }
    }
    verifyUser();
  }, []);

  return (
    <div className="app-container">
      <header className="main-header">
        <nav>
          <ul>
            <Navbar user={user} setUser={setUser} setBankAcct={setBankAcct} />
          </ul>
        </nav>
      </header>

      <main className="page-container">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<HomePage user={user} setUser={setUser} bankAcct={bankAcct} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/assistant" element={<ChatBotPage user={user} bankAcct={bankAcct} />} />
              <Route path="/requests" element={<ServiceRequestIndexPage />} />
              <Route path="/requests/:id" element={<ServiceRequestDetailPage />} />
              <Route path="/my-account" element={<MyAccountPage user={user} bankAcct={bankAcct} setBankAcct={setBankAcct} />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/signup" element={<SignupPage user={user} setUser={setUser} />} />
              <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}
