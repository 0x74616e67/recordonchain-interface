import fetch from "./fetch";

const BACKEND_ENDPOINT = "http://localhost:3001/record";

export async function send({ message, key }) {
  const url = BACKEND_ENDPOINT;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: { key, message },
    });

    if (response.code === 0) {
      // return tx hash to UI
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    // @TODO add error handler
    alert(error.message);
  }
}

export function formatTimestamp(t) {
  const now = new Date(t * 1000);
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}
