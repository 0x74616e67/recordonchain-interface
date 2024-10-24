import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useTxStore } from "@/utils/store";
import { formatTimestamp, getTxURL, getTxInfo } from "@/utils";
import Card from "@/components/Card";
import Spin from "@/components/Spin";
import { useTranslations } from "use-intl";
import Head from "next/head";

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
  const [errorKey, setErrorKey] = useState("");
  const t = useTranslations("Detail");

  const getInfo = useCallback(async () => {
    const [chain, hash] = router.query?.tx?.split(".") || [];
    setErrorKey("");

    return getTxInfo(chain, hash)
      .then((resp) => {
        if (resp.code === 0) {
          setTx(resp.data);
        } else {
          setErrorKey("getTxInfo");
        }
      })
      .catch((e) => {
        setErrorKey("getTxInfo");
      });
  }, [router.query]);

  useEffect(() => {
    async function main() {
      if (Object.keys(txStore.tx).length) {
        setTx(txStore.tx);
      } else {
        setLoading(true);

        // TODO 这个只是单链的，多链的 tx 会是一个数组，需要单独处理
        const [chain, hash] = router.query?.tx?.split(".") || [];

        if (chain && hash) {
          await getInfo();
          setLoading(false);
        } else {
          setErrorKey("link");
          setLoading(false);
        }
      }
    }
    main();
  }, [txStore.tx, router.query, router.asPath]);

  const handleClose = useCallback(() => setShowShareCard(false), []);

  const handleShare = useCallback(() => {
    if (errorKey !== "") {
      return;
    }

    setShowShareCard(!showShareCard);
  }, [errorKey, showShareCard]);

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <Spin spinning={loading}>
        <div>
          <div>
            <div>
              {t.rich("link", {
                scan: (chunks) => (
                  <a
                    className="text-blue0 hover:text-blue0-700 visited:text-blue0-600"
                    href={getTxURL(tx.chain, tx.hash)}
                    target="_blank"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </div>
            <div className="bg-gray0/20 p-4 my-2 rounded">
              {tx.message ? (
                <div>{tx.message}</div>
              ) : (
                <div className="text-gray0">{t("noContent")}</div>
              )}
              <div className="text-right mt-4">
                {tx.timestamp ? formatTimestamp(tx.timestamp) : ""}
              </div>
            </div>
            {errorKey !== "" && (
              <div className="text-sm text-red-600">
                {t.rich(`error.${errorKey}`, {
                  button: (chunks) => (
                    <button
                      className="text-red-600 hover:text-red-700 visited:text-red-500 underline"
                      onClick={() => getInfo()}
                    >
                      {chunks}
                    </button>
                  ),
                })}
              </div>
            )}

            <button
              className={`bg-blue0 text-white rounded-full flex items-center justify-center leading-none px-4 h-12 float-right ${
                errorKey !== "" || !tx.message
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleShare}
            >
              {t("share")}
            </button>
          </div>
        </div>
        {showShareCard && !!Object.keys(tx).length && (
          <Card tx={tx} onClose={handleClose}></Card>
        )}
      </Spin>
    </>
  );
}
