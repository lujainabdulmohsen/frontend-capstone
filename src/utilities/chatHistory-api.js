import sendRequest from "./sendRequest";
const BASE_URL = "http://127.0.0.1:8000/chat-history/";

export async function getChatHistory() {
  return sendRequest(BASE_URL, "GET");
}

export async function saveChatHistory(messages) {
  return sendRequest(BASE_URL, "POST", { messages });
}
