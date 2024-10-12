import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { send, MAX_CHARACTER_LENGTH } from "@/utils";
import { useTxStore } from "@/utils/store";
import Navbar from "@/components/Navbar";
import Spin from "@/components/Spin";
import { useTranslations } from "use-intl";
import Head from "next/head";

export default function Create() {
  const txStore = useTxStore((state) => ({ tx: state.tx, add: state.add }));
  const router = useRouter();
  const t = useTranslations("Record");

  const [message, setMessage] = useState("");
  const [errorKey, setErrorKey] = useState("");

  // TODO user can select network
  const [chain, setChain] = useState("conflux");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setMessage(e.target.value);
    setErrorKey("");
  }, []);

  const handleSubmit = async () => {
    if (errorKey !== "") {
      return;
    }

    if (message.trim() === "") {
      setErrorKey("empty");
      return;
    }

    setLoading(true);

    try {
      const tx = await send({ chain, message });

      if (tx) {
        txStore.add(tx);

        router.push({
          pathname: `/record/detail`,
          query: {
            tx: `${tx.chain}.${tx.hash}`,
          },
        });
      } else {
        setErrorKey("send");
      }

      setLoading(false);
    } catch (e) {
      // 统一报错都是发送失败
      setErrorKey("send");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <Spin spinning={loading}>
        <Navbar title={t("title")}></Navbar>
        <div>
          <span className="text-base">{t("label")}</span>
          <div className="flex flex-col align-center relative">
            <textarea
              placeholder=""
              className="my-2 p-2 border-2 border-solid border-gray0 rounded focus:border-blue0 focus:outline-none resize-none"
              rows={6}
              autoFocus
              resize="none"
              onChange={handleChange}
              value={message}
              maxLength={MAX_CHARACTER_LENGTH}
            ></textarea>
            <span
              className={`absolute bottom-5 right-2 ${
                message.length >= MAX_CHARACTER_LENGTH
                  ? "text-red-500"
                  : "text-gray0"
              }`}
            >
              {message.length}/{MAX_CHARACTER_LENGTH}
            </span>
          </div>
          {errorKey !== "" && (
            <div className="text-sm text-red-600">{t(`error.${errorKey}`)}</div>
          )}
        </div>

        <button
          className={`bg-blue0 text-white rounded-full flex items-center justify-center leading-none h-12 float-right px-4 mt-2 ${
            errorKey !== "" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
        >
          {t("submit")}
        </button>
      </Spin>
    </>
  );
}
