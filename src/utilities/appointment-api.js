import sendRequest from "./sendRequest";

const BASE_URL = "/appointments/";

// 🔹 عرض جميع المواعيد
export async function index() {
  return sendRequest(BASE_URL);
}

// 🔹 إنشاء موعد جديد
export async function create(payload) {
  return sendRequest(BASE_URL, "POST", payload);
}

// 🔹 تحديث موعد موجود (لتعديل التاريخ أو الوقت)
export async function updateAppointment(id, payload) {
  return sendRequest(`${BASE_URL}${id}/`, "PUT", payload);
}

// 🔹 حذف موعد
export async function deleteAppointment(id) {
  return sendRequest(`${BASE_URL}${id}/`, "DELETE");
}
