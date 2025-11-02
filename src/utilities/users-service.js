import { jwtDecode } from "jwt-decode"; 

export function getToken() {
  const token = localStorage.getItem("token");
  console.log(token, 'line 5')
  if (!token) return null;

  try {
    console.log(token, 'line 8');
    const payload = jwtDecode(token);
    console.log(payload, 'line 10');
    const exp = payload.exp * 1000;
    if (exp < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return token;
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("token");
    return null;
  }
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Failed to decode user:", err);
    return null;
  }
}
