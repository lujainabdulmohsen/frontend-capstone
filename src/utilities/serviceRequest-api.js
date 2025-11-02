import { getToken } from "./users-service";

const BASE_URL = "http://127.0.0.1:8000";

function getAuthHeaders() {
  const token = getToken();
  console.log(token, 'this should be the token');
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

export async function getAgencies() {
  const res = await fetch(`${BASE_URL}/agencies/`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch agencies");
  return res.json();
}

export async function getServices() {
  const res = await fetch(`${BASE_URL}/services/`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function create(serviceId, payload = {}) {
  const res = await fetch(`${BASE_URL}/service-requests/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      service: serviceId,
      payload,
    }),
  });
  if (!res.ok) throw new Error("Failed to create service request");
  return res.json();
}

export async function index() {
  const res = await fetch(`${BASE_URL}/service-requests/`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}

export async function update(id, data) {
  const res = await fetch(`${BASE_URL}/service-requests/${id}/`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update request");
  return res.json();
}

export async function deleteRequest(id) {
  const res = await fetch(`${BASE_URL}/service-requests/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok && res.status !== 204) throw new Error("Failed to delete request");
  return true;
}
export async function show(id) {
  const res = await fetch(`${BASE_URL}/service-requests/${id}/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch request details");
  return res.json();
}
