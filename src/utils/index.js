import fetch from "./fetch";
import { getTransactionInfo, getNetwork } from "./blockchain";

export const sleep = async function (timestemp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timestemp);
  });
};

// // TODO product code
export async function send({ chain, message }) {
  const url = getBackendURL("/record");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: { chain, message },
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

    return null;
  }
}

export async function getTxInfo(chain, hash) {
  const tx = await getTransactionInfo(chain, hash);

  const response = {
    code: 0,
    data: {
      hash: tx.hash,
      timestamp: tx.timestamp,
      message: tx.data,
      chain: chain,
    },
    message: "",
  };

  return response;
}

// // TODO for test
// const BACKEND_ENDPOINT = "http://localhost:3001/record";
// export async function send({ chain, message }) {
//   try {
//     const response = {
//       code: 0,
//       data: {
//         chain: "conflux",
//         hash: "0xa3f06db998c45deff1a94b88d7be3d816f270ecd6552b5309221bec49dfbc6ff",
//         timestamp: 1723978181,
//         message: message,
//       },
//       message: "",
//     };

//     await sleep(1000);

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

// export async function getTxInfo(chain, hash) {
//   await sleep(1000);

//   const response = {
//     code: 0,
//     data: {
//       chain: "conflux",
//       hash: "0xa3f06db998c45deff1a94b88d7be3d816f270ecd6552b5309221bec49dfbc6ff",
//       timestamp: 1723978181,
//       message: "fake tx data",
//     },
//     message: "",
//   };

//   return response;
// }

export function getBackendURL(path) {
  if (location.hostname === "localhost") {
    return `http://localhost:${
      location.protocol === "http:" ? 3001 : 3002
    }${path}`;
  } else {
    return `${location.protocol}//${location.host}${path}`;
  }
}

export function formatTimestamp(t) {
  const now = new Date(Number(t) * 1000);
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

export function getTxURL(chain, hash) {
  if (!chain || !hash) {
    return "";
  }

  const network = getNetwork(chain);
  return `${network.scanUrl}/tx/${hash}`;
}

export function getShareURL(chain, hash) {
  return `${location.host}/record/detail?tx=${chain}.${hash}`;
}

export function resolveShareURL(url) {
  let u = new URL(url);
  let params = new URLSearchParams(u.search);
  const [chain, hash] = params.get("tx").split(".");
  return { chain, hash };
}
