import { getToken } from "./users-service";

export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method, headers: {} };
  const token = getToken();

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  options.headers["Content-Type"] = "application/json";

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(url, options);

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    console.error(`❌ Request failed (${res.status}):`, errorText);
    throw new Error("Bad Request");
  }
}
