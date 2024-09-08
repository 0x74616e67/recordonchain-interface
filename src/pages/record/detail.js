import { useRouter } from "next/router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTxStore } from "@/utils/store";
import { getTxInfo } from "@/utils";
import { formatTimestamp, getTxURL } from "@/utils";
import Card from "@/components/Card";

export default function Record() {
  const router = useRouter();

  const txStore = useTxStore((state) => ({ tx: state.tx }));

  const [showShareCard, setShowShareCard] = useState(false);
  const [tx, setTx] = useState({});
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
    <div>
      record page
      <div>{loading && "loading..."}</div>
      <div>
        {tx.hash ? (
          <div className="mt-10">
            <span>Write success. </span>
            <div className="">
              <div>你已经成功在区块链上记录一条信息：</div>
              <div>{tx.message}</div>
              <div>{formatTimestamp(tx.timestamp)}</div>
            </div>
            <a
              className="text-blue-500 hover:text-blue-900 visited:text-blue-600"
              href={getTxURL(tx.chain, tx.hash)}
              target="_blank"
              data-html2canvas-ignore
            >
              onchain detail
            </a>
            <div>
              <button
                className="bg-sky-500/100 p-2"
                onClick={() => setShowShareCard(!showShareCard)}
              >
                Share
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {showShareCard && !!Object.keys(tx).length && (
        <Card tx={tx} onClose={handleClose}></Card>
      )}
    </div>
  );
}
