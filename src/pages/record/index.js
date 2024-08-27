"use client";

import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import Card from "@/components/Card";
import { useTxStore } from "./../../utils/store";
import { getTxInfo } from "@/utils";

export default function Record() {
  const router = useRouter();

  const txStore = useTxStore((state) => ({ tx: state.tx }));

  const [tx, setTx] = useState({});
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pChain = params.get("chain");
    const pHash = params.get("hash");

    // invalid url, redirect to home page
    if (!pChain || !pHash) {
      router.replace("/");
      return;
    }

    if (Object.keys(txStore.tx).length) {
      setTx(txStore.tx);
    } else {
      setLoading(true);

      getTxInfo(pChain, pHash)
        .then((resp) => {
          setTx({
            chain: pChain,
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
  }, [txStore.tx]);

  return (
    <div>
      record page
      <div>{loading && "loading..."}</div>
      <div>
        {tx.hash ? (
          <div className="mt-10">
            <span>Write success. </span>
            <a
              className="text-blue-500 hover:text-blue-900 visited:text-blue-600"
              href={`https://evmtestnet.confluxscan.net/tx/${tx.hash}`}
              target="_blank"
              data-html2canvas-ignore
            >
              onchain detail
            </a>
          </div>
        ) : null}
      </div>
      {!!Object.keys(tx).length && <Card tx={tx}></Card>}
    </div>
  );
}
