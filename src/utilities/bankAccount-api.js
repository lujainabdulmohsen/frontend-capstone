import sendRequest from "./sendRequest";

const BASE_URL = "/bank-account/";

export async function getMyBankAccount() {
  return sendRequest(`${BASE_URL}`, "GET");
}

export async function updateMyBankAccount(data) {
  return sendRequest(`${BASE_URL}`, "PUT", data);
}

export async function deleteMyBankAccount() {
  return sendRequest(`${BASE_URL}`, "DELETE");
}

export async function addBankAccount(data) {
  return sendRequest(`${BASE_URL}`, "POST", data);
}
