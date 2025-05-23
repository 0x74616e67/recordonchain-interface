import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useTxStore } from "@/utils/store";
import { getTxURL, getTxInfo } from "@/utils";
import SharePanel from "@/components/SharePanel";
import Spin from "@/components/Spin";
import { useTranslations } from "use-intl";
import Head from "next/head";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Record() {
  const router = useRouter();
  const txStore = useTxStore((state) => ({ tx: state.tx }));
  const [open, setOpen] = useState(false);
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

  const handleClose = useCallback(() => setOpen(false), []);

  const handleShare = useCallback(() => {
    if (errorKey !== "") {
      return;
    }

    setOpen(!open);
  }, [errorKey, open]);

  const disabled = !Object.keys(tx).length;

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>

      <SharePanel
        tx={tx}
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
      ></SharePanel>

      <Spin spinning={loading} className="flex max-h-full flex-col">
        <div>
          {t.rich("link", {
            scan: (chunks) => (
              <a
                className="text-blue-600 hover:text-blue-500"
                href={getTxURL(tx.chain, tx.hash)}
                target="_blank"
              >
                {chunks}
              </a>
            ),
          })}
        </div>
        <Card tx={tx} className="mt-2 shrink overflow-auto" disabled></Card>
        {errorKey !== "" && (
          <div className="text-sm text-red-600">
            {t.rich(`error.${errorKey}`, {
              button: (chunks) => (
                <button
                  className="text-red-600 underline visited:text-red-500 hover:text-red-700"
                  onClick={() => getInfo()}
                >
                  {chunks}
                </button>
              ),
            })}
          </div>
        )}
        <Button
          onClick={handleShare}
          disabled={disabled}
          className="float-right"
        >
          {t("share")}
        </Button>
      </Spin>
    </>
  );
}
