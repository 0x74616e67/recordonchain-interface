const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://evmtestnet.confluxrpc.com"
);

export async function getTxInfo(hash) {
  const { data, blockNumber } = await provider.getTransaction(hash);

  const fData = ethers.utils.toUtf8String(data);

  const { timestamp } = await provider.getBlock(blockNumber);

  return {
    hash,
    data: fData,
    timestamp,
  };
}
