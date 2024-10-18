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

  const [code, setCode] = useState("");
  const [errorCodeKey, setErrorCodeKey] = useState("");

  // TODO user can select network
  const [chain, setChain] = useState("conflux");
  const [loading, setLoading] = useState(false);

  const handleRecordChange = useCallback((e) => {
    setMessage(e.target.value);
    setErrorKey("");
  }, []);

  const handleCodeChange = useCallback((e) => {
    setCode(e.target.value);
    setErrorCodeKey("");
  }, []);

  const handleSubmit = async () => {
    const messageIsEmpty = message.trim() === "";
    const codeIsEmpty = code.trim() === "";

    if (messageIsEmpty) {
      setErrorKey("empty");
    }

    if (codeIsEmpty) {
      setErrorCodeKey("empty");
    }

    if (messageIsEmpty || codeIsEmpty) {
      return;
    }

    setLoading(true);

    try {
      const resp = await send({ chain, message, code });

      if (resp.code === 0) {
        txStore.add(resp.data);

        router.push({
          pathname: `/record/detail`,
          query: {
            tx: `${resp.data.chain}.${resp.data.hash}`,
          },
        });
      } else {
        // invalid code
        if (resp.code === 1003) {
          setErrorCodeKey("invalid");
        } else if (resp.code === 1002) {
          setErrorCodeKey("database");
        }
      }

      setLoading(false);
    } catch (e) {
      // 统一报错都是发送失败
      setErrorKey("send");
      setLoading(false);
    }
  };

  // there is record content error or code error
  const hasError = errorKey || errorCodeKey;

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <Spin spinning={loading}>
        <Navbar title={t("title")}></Navbar>

        {/* record textare */}
        <div>
          <span className="text-base">{t("record.label")}</span>
          <div className="flex flex-col align-center relative">
            <textarea
              placeholder=""
              className="mt-2 mb-1 p-2 border-2 border-solid border-gray0 rounded focus:border-blue0 focus:outline-none resize-none"
              rows={6}
              autoFocus
              resize="none"
              onChange={handleRecordChange}
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
          {errorKey && (
            <div className="text-sm text-red-600">
              {t(`record.error.${errorKey}`)}
            </div>
          )}
        </div>

        {/* code input */}
        <div className="mt-2">
          <span className="text-base">{t("code.label")}</span>
          <div className="flex flex-col align-center relative">
            <input
              placeholder=""
              className="mt-2 mb-1 p-2 border-2 border-solid border-gray0 rounded focus:border-blue0 focus:outline-none resize-none w-1/2"
              onChange={handleCodeChange}
              value={code}
            ></input>
          </div>
          {errorCodeKey && (
            <div className="text-sm text-red-600">
              {t(`code.error.${errorCodeKey}`)}
            </div>
          )}
        </div>

        <button
          className={`bg-blue0 text-white rounded-full flex items-center justify-center leading-none h-12 float-right px-4 mt-2 ${
            hasError ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
        >
          {t("submit")}
        </button>
      </Spin>
    </>
  );
}
