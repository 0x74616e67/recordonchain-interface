import { useRouter } from "next/router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTxStore } from "@/utils/store";
import { getTxInfo } from "@/utils";
import { formatTimestamp, getTxURL } from "@/utils";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Spin from "@/components/Spin";
import { useTranslations } from "use-intl";

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
  const t = useTranslations("Detail");

  useEffect(() => {
    // TODO 这个只是单链的，多链的 tx 会是一个数组，需要单独处理
    const [chain, hash] = router.query?.tx?.split(".") || [];

    if (Object.keys(txStore.tx).length) {
      setTx(txStore.tx);
    } else {
      setLoading(true);

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
      <Navbar title={t("title")}></Navbar>
      <div>
        <div className="">
          <div>
            {t.rich("link", {
              scan: (chunks) => (
                <a
                  className="text-blue0 hover:text-blue0-700 visited:text-blue0-600"
                  href={getTxURL(tx.chain, tx.hash)}
                  target="_blank"
                  data-html2canvas-ignore
                >
                  {chunks}
                </a>
              ),
            })}
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
              {t("share")}
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
