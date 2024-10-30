import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { send, MAX_CHARACTER_LENGTH } from "@/utils";
import { isFreeTrailChain } from "@/utils/blockchain";
import { useTxStore, useChainStore } from "@/utils/store";
import Spin from "@/components/Spin";
import ChainComponent from "@/components/Chain";
import { useTranslations } from "use-intl";
import Head from "next/head";

export default function Create() {
  const txStore = useTxStore((state) => ({ tx: state.tx, add: state.add }));
  const chainStore = useChainStore((state) => ({
    chain: state.chain,
  }));
  const router = useRouter();
  const t = useTranslations("Record");

  const [message, setMessage] = useState("");
  const [errorKey, setErrorKey] = useState("");

  const [code, setCode] = useState("");
  const [errorCodeKey, setErrorCodeKey] = useState("");
  const [chain, setChain] = useState(chainStore.chain);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFreeTrailChain(chain)) {
      setCode("00000000");
    } else {
      setCode("");
    }
  }, [chain]);

  const handleRecordChange = useCallback((e) => {
    setMessage(e.target.value);
    setErrorKey("");
  }, []);

  const handleChainChange = useCallback((option) => {
    setChain(option.value);
    setErrorKey("");
    setErrorCodeKey("");
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
      const resp = await send({ chain, message, code: code.trim() });

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
        } else {
          setErrorKey("send");
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
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1">
          {/* record textare */}
          <div className="sm:col-span-4">
            <label
              htmlFor="record"
              className="text-base"
              // className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t("record.label")}
            </label>
            <div className="mt-2 relative">
              <textarea
                id="record"
                name="record"
                autoComplete="record-name"
                rows={6}
                placeholder=""
                className="
                block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                 resize-none
              "
                resize="none"
                onChange={handleRecordChange}
                value={message}
                maxLength={MAX_CHARACTER_LENGTH}
              />
              <span
                className={`absolute bottom-2 right-2 ${
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

          {/* free trail */}
          <div className="sm:col-span-4">
            <label htmlFor="chain" className="text-base">
              {t("chain.label")}
            </label>
            <ChainComponent onChange={handleChainChange} value={chain} />
          </div>

          {/* code input */}
          <div
            className={`sm:col-span-4 ${
              isFreeTrailChain(chain) ? "hidden" : ""
            }`}
          >
            <label htmlFor="code" className="text-base">
              {t("code.label")}
            </label>
            <div className="mt-2">
              <input
                id="code"
                name="code"
                autoComplete="code-name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                onChange={handleCodeChange}
                value={code}
                placeholder={t(`code.placeholder.${chain}`)}
              />
            </div>
            {errorCodeKey && (
              <div className="text-sm text-red-600">
                {t(`code.error.${errorCodeKey}`)}
              </div>
            )}
          </div>

          <div className="sm:col-span-4">
            <button
              className={`bg-blue0 text-white rounded-full flex items-center justify-center leading-none h-12 float-right px-4 ${
                hasError ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
            >
              {t("submit")}
            </button>
          </div>
        </div>
      </Spin>
    </>
  );
}
