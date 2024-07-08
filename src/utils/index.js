import fetch from "./fetch";

export async function send(message) {
  const url = "http://localhost:9000/record";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: { key: "123456", message },
    });

    if (response.code === 0) {
      // return tx hash to UI
      return response.data.hash;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    // @TODO add error handler
    alert(error.message);
  }
}
