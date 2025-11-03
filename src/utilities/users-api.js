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
    const response = await sendRequest("http://127.0.0.1:8000/users/token/refresh/", "GET");
    return response.user;
  } catch (err) {
    console.error("Error verifying user:", err);
    localStorage.removeItem("token");
    return null;
  }
}

export async function changePassword(old_password, new_password) {
  const response = await sendRequest(`${BASE_URL}/change-password/`, "POST", { old_password, new_password });
  if (response && response.access) {
    localStorage.setItem("token", response.access);
  }
  return true;
}
