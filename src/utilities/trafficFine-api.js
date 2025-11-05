import sendRequest from "./sendRequest"; 

export async function getMyFines() {
  return await sendRequest(`/my-fines/`, "GET");
}

export async function payFines({ fineIds = null, payAll = false }) {
  const body = payAll ? { pay_all: true } : { fine_ids: fineIds };
  return await sendRequest(`/pay-fines/`, "POST", body);
}
