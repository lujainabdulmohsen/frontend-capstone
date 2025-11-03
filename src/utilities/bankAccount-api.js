import sendRequest from "./sendRequest";
const BASE_URL = "http://127.0.0.1:8000/bank-account";

export async function getMyBankAccount() {
  return await sendRequest(`${BASE_URL}/`, "GET");
}

export async function updateMyBankAccount(data) {
  return await sendRequest(`${BASE_URL}/`, "PUT", data);
}

export async function deleteMyBankAccount() {
  return await sendRequest(`${BASE_URL}/`, "DELETE");
}
