import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import ChatBotPage from "../ChatBotPage";
import ServiceRequestIndexPage from "../ServiceRequestIndexPage";
import ServiceRequestDetailPage from "../ServiceRequestDetailPage";
import Navbar from "../../components/Navbar/Navbar";
import SignupPage from "../SignupPage/SignupPage";
import * as userService from "../../utilities/users-service";
import "../../global.css";
import LoginPage from "../LoginPage/LoginPage";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verifyUser() {
      const verifiedUser = await userService.getUser();
      if (verifiedUser) {
        setUser(verifiedUser);
      } else {
        setUser(null);
      }
    }
    verifyUser();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = userService.getUser();
      setUser(updatedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="app-container">
      <header className="main-header">
        <nav>
          <ul>
            <Navbar user={user} setUser={setUser} />
          </ul>
        </nav>
      </header>

      <main className="page-container">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/assistant" element={<ChatBotPage />} />
              <Route path="/requests" element={<ServiceRequestIndexPage />} />
              <Route path="/requests/:id" element={<ServiceRequestDetailPage />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/assistant" element={<ChatBotPage />} />
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
