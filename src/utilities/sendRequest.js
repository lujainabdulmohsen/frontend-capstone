
export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method, headers: {} };
  const token = localStorage.getItem("accessToken")

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  options.headers["Content-Type"] = "application/json";

  if (payload) {
    options.body = JSON.stringify(payload);
  }
  console.log("making request", url)
  const res = await fetch(`http://localhost:8000${url}`, options);

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    console.error(`❌ Request failed (${res.status}):`, errorText);
    throw new Error("Bad Request");
  }
}
