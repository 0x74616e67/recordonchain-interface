const ethers = require("ethers");

// TODO 以太坊和 fork 的链共用一个私钥
// 后期要考虑一下是用 EOA 还是合约地址
const NETWORKS = {
  conflux: {
    rpcUrl: process.env.NEXT_PUBLIC_CONFLUX_RPC_URL,
    to: process.env.NEXT_PUBLIC_CONFLUX_TO,
    scanUrl: process.env.NEXT_PUBLIC_CONFLUX_SCAN_URL,
  },
  ethereum: {
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
    to: process.env.NEXT_PUBLIC_ETHEREUM_TO,
    scanUrl: process.env.NEXT_PUBLIC_ETHEREUM_SCAN_URL,
  },
};

const CHAINS = Object.keys(NETWORKS);

export function getNetwork(chain) {
  if (!CHAINS.includes(chain)) {
    throw new Error(`chain ${chain} not supported`);
  }

  const network = NETWORKS[chain];
  network.provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);

  return network;
}

export async function getTransactionInfo(chain, hash) {
  const network = getNetwork(chain);

  const { data, blockNumber } = await network.provider.getTransaction(hash);

  const fData = ethers.utils.toUtf8String(data);

  const { timestamp } = await network.provider.getBlock(blockNumber);

  return {
    hash,
    data: fData,
    timestamp,
  };
}
