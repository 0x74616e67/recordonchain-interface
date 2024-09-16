import { useRouter } from "next/router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTxStore } from "@/utils/store";
import { getTxInfo } from "@/utils";
import { formatTimestamp, getTxURL } from "@/utils";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Spin from "@/components/Spin";

export default function Record() {
  const router = useRouter();

  const txStore = useTxStore((state) => ({ tx: state.tx }));

  const [showShareCard, setShowShareCard] = useState(false);
  const [tx, setTx] = useState({
    hash: "",
    message: "",
    timestamp: 0,
    chain: "",
  });
  const [loading, setLoading] = useState(false);

  // const chain = router.query.slug?.[0];
  // const hash = router.query.slug?.[1];

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    // const pchain = params.get("chain");
    // const phash = params.get("hash");

    let txs = [];

    try {
      let params = new URLSearchParams(/\?.*/.exec(router.asPath)?.[0]);
      txs = params.getAll("tx");
    } catch (e) {
      console.log("decode URL search params error");
      console.log(e);
    }

    let tx = txs[0];

    // TODO use conflux for default
    const chain = tx.startsWith("conflux") ? "conflux" : "";
    const hash = tx.replace(chain, "");

    // invalid url, redirect to home page
    // if (!chain || !hash) {
    //   router.replace("/");
    //   return;
    // }

    if (Object.keys(txStore.tx).length) {
      setTx(txStore.tx);
    } else {
      setLoading(true);

      // TODO add timeout check

      if (chain && hash) {
        getTxInfo(chain, hash)
          .then((resp) => {
            setTx({
              chain: chain,
              ...resp.data,
            });

            setLoading(false);
          })
          .catch((e) => {
            console.log("getTxInfo: ", e);

            setLoading(false);

            // TODO show error tips
          });
      }
    }
  }, [txStore.tx, router.query, router.asPath]);

  const handleClose = useCallback(() => setShowShareCard(false), []);

  return (
    <Spin spinning={loading}>
      <Navbar title="详情"></Navbar>
      <div>
        <div className="">
          <div>
            区块链上记录的内容（
            <a
              className="text-blue0 hover:text-blue0-700 visited:text-blue0-600"
              href={getTxURL(tx.chain, tx.hash)}
              target="_blank"
              data-html2canvas-ignore
            >
              详情
            </a>
            ）：
          </div>
          <div className="bg-gray0/20 p-4 my-4 rounded">
            <div>{tx.message}</div>
            <div className="text-right mt-4">
              {formatTimestamp(tx.timestamp)}
            </div>
          </div>
          <div>
            <button
              className="bg-blue0 text-white rounded-full flex items-center justify-center leading-none w-12 h-12 float-right"
              onClick={() => setShowShareCard(!showShareCard)}
            >
              分享
            </button>
          </div>
        </div>
      </div>
      {showShareCard && !!Object.keys(tx).length && (
        <Card tx={tx} onClose={handleClose}></Card>
      )}
    </Spin>
  );
}
