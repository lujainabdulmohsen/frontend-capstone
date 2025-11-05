import sendRequest from "./sendRequest";
const BASE_URL = "http://127.0.0.1:8000";

export async function getAgencies() {
  return sendRequest("/agencies/", "GET");
}

export async function getServices() {
  return sendRequest("/services/", "GET");
}

export async function create(serviceId, payload = {}) {
  const data = { service_id: serviceId, payload };
  return sendRequest(`/service-requests/`, "POST", data);
}

export async function index() {
  return sendRequest(`/service-requests/`);
}

export async function update(id, data) {
  return sendRequest(`/service-requests/${id}/`, "PUT", data);
}

export async function deleteRequest(id) {
  return sendRequest(`/service-requests/${id}/`, "DELETE");
}

export async function show(id) {
  return sendRequest(`/service-requests/${id}/`);
}

export async function payServiceRequest(id) {
  return sendRequest(`/service-requests/${id}/pay/`, "POST");
}
