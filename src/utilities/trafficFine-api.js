import sendRequest from "./sendRequest"; 

const BASE = "http://127.0.0.1:8000";

export async function getMyFines() {
  return await sendRequest(`${BASE}/my-fines/`, "GET");
}

export async function payFines({ fineIds = null, payAll = false }) {
  const body = payAll ? { pay_all: true } : { fine_ids: fineIds };
  return await sendRequest(`${BASE}/pay-fines/`, "POST", body);
}
