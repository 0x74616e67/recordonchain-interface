async function myFetch(url, config) {
  try {
    const myHeaders = new Headers();

    const reqConfig = {
      method: config.method || "GET",
    };

    if (config.body) {
      myHeaders.append("Content-Type", "application/json");
      reqConfig.body = JSON.stringify(config.body);
    }

    reqConfig.headers = myHeaders;

    const response = await fetch(url, reqConfig);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // @TODO 需要检查是否有请求没有 content-type
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }

    return await response.json();
  } catch (error) {
    console.log("fetch failed: ", error.message);

    return {
      code: 1000,
      data: {},
      message: error.message,
    };
  }
}

export default myFetch;
