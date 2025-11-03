import { useNavigate, Link } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  if (user) {
    return (
      <>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/assistant">Yusr Assistant</Link>
        </li>
        <li>
          <Link to="/requests">My Requests</Link>
        </li>
        <li>
          <Link to="/my-account">My Account</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-btn logout-btn">
            Log out
          </button>
        </li>
      </>
    );
  }

  if (!user)
    return (
      <>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
}
