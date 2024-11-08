import fetch from "./fetch";
import { getTransactionInfo, getNetwork } from "./blockchain";

export const MAX_CHARACTER_LENGTH = 200;

export const SCROLL_DISTANCE = 60;

export const sleep = async function (timestemp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timestemp);
  });
};

// // TODO product code
export async function send({ chain, message, code }) {
  const url = getBackendURL("/record");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: { chain, message, code },
    });

    // 这里返回整个 response 是为了通过 code 值在 UI 端显示具体的错误信息
    return response;
  } catch (error) {
    // TODO emit
    // 可以把错误消息发给监控系统，以备后续查看
    console.log(error);
    return null;
  }
}

export async function getTxInfo(chain, hash) {
  try {
    const tx = await getTransactionInfo(chain, hash);

    return {
      code: 0,
      data: {
        hash: tx.hash,
        timestamp: tx.timestamp,
        message: tx.data,
        chain: chain,
      },
      message: "",
    };
  } catch (e) {
    // TODO emit
    console.log("get transaction info error: ", e);
    return {
      code: 3,
      data: {
        hash: "",
        timestamp: 0,
        message: "",
        chain: "",
      },
      message: e.message,
    };
  }
}

// // TODO for test
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

//     await sleep(500);

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
//   await sleep(500);

//   // success
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

//   // error
//   // const response = {
//   //   code: 3,
//   //   data: {},
//   //   message: "error message",
//   // };

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

export async function getRecords({
  page = 1,
  pageSize = 10,
  chain = "conflux",
  order = "desc",
}) {
  const url = getBackendURL("/records");

  try {
    const response = await fetch(
      `${url}?page=${page}&pageSize=${pageSize}&chain=${chain}&order=${order}`,
      {
        method: "GET",
      }
    );

    if (response.code === 0) {
      // 这里暂时前端添加 chain 到 list 中每条记录中
      // 如果后期 getRecords 中 chain 是 optional 的，比如返回最新的所有 records，再交由后端处理
      return response.data.map((d) => ({ ...d, chain }));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    // TODO emit
    // 可以把错误消息发给监控系统，以备后续查看
    console.log(error);
    return [];
  }
}
