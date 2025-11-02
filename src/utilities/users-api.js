import sendRequest from "./sendRequest";
const BASE_URL = "http://127.0.0.1:8000/users";

export async function signup(formData) {
  const response = await sendRequest(`${BASE_URL}/signup/`, "POST", formData);
  if (response && response.access) {
    localStorage.setItem("token", response.access);
  }
  return response.user;
}

export async function login(formData) {
  try {
    const response = await sendRequest(`${BASE_URL}/login/`, "POST", formData);
    console.log(response, "login check response");
    if (response && response.access) {
      localStorage.setItem("token", response.access);
    }
    return response.user;
  } catch (err) {
    localStorage.removeItem("token");
    return null;
  }
}


export async function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const user = payload.user || { username: payload.username };
    return user;
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("token");
    return null;
  }
}
