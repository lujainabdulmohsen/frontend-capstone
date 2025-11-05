import sendRequest from "./sendRequest";

const BASE_URL = "http://127.0.0.1:8000/credit-card";

export async function getMyCreditCards() {
  return await sendRequest(`${BASE_URL}/`, "GET");
}

export async function addCreditCard(formData) {
  return await sendRequest(`${BASE_URL}/`, "POST", formData);
}

export async function deleteCreditCard(data) {
  return await sendRequest(`${BASE_URL}/`, "DELETE", data);
}
