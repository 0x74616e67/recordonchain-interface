import fetch from "./fetch";

export const sleep = async function (timestemp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timestemp);
  });
};

// TODO product code
// const BACKEND_ENDPOINT = "http://47.94.76.247:3000/record";

// export async function send({ message, key }) {
//   const url = BACKEND_ENDPOINT;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: { key, message },
//     });

//     if (response.code === 0) {
//       // return tx hash to UI
//       return response.data;
//     } else {
//       throw new Error(response.message);
//     }
//   } catch (error) {
//     // @TODO add error handler
//     alert(error.message);
//   }
// }

// TODO for test
const BACKEND_ENDPOINT = "http://localhost:3001/record";
export async function send({ message, key }) {
  const url = BACKEND_ENDPOINT;

  try {
    const response = {
      code: 0,
      data: {
        hash: "0xa3f06db998c45deff1a94b88d7be3d816f270ecd6552b5309221bec49dfbc6ff",
        timestamp: 1723978181,
        message: message,
      },
      message: "",
    };

    // await sleep(10000);

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

export function getTxURL(hash) {
  return `https://evmtestnet.confluxscan.net/tx/${hash}`;
}
