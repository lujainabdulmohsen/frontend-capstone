import { useNavigate, Link } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    /*usersAPI.logout();
    setUser(null);
    navigate("/");*/
  }

  if (user) {
    return (
      <>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/assistant">Yusr Assistant</Link>
        </li>
        <li>
          <Link to="/requests">My Requests</Link>
        </li>
        <form id="logout-form" onSubmit={handleLogout}>
          <button type="submit">Log out</button>
        </form>
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
      </>
    );
}
