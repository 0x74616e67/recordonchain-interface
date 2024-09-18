import fetch from "./fetch";
import { getTxInfo as getConfluxTxInfo } from "./conflux";

const NETWORKS = {
  conflux: {
    scan: "https://evmtestnet.confluxscan.net",
  },
  ethereum: {
    scan: "https://etherscan.io",
  },
};

export const sleep = async function (timestemp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timestemp);
  });
};

// // TODO product code
export async function send({ chain, message }) {
  // const BACKEND_ENDPOINT = location.host + "/record";
  // const BACKEND_ENDPOINT = "http://localhost:3001/record";
  // const BACKEND_ENDPOINT = `${window.location.protocol}//47.94.76.247/record`;
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
  let tx = {};

  if (chain.toLowerCase() === "conflux") {
    tx = await getConfluxTxInfo(hash);
  }

  const response = {
    code: 0,
    data: {
      hash: tx.hash,
      timestamp: tx.timestamp,
      message: tx.data,
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
  return `${window.location.protocol}//${window.location.host}${path}`;
}

export function formatTimestamp(t) {
  const now = new Date(Number(t) * 1000);
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

export function getTxURL(chain, hash) {
  return chain && hash ? `${NETWORKS[chain].scan}/tx/${hash}` : "";
}

export function getShareURL(chain, hash) {
  return `${location.host}/record/detail?tx=${chain}${hash}`;
}
