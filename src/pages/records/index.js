import { memo, useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "use-intl";
import Head from "next/head";
import { getRecords, formatTimestamp, SCROLL_DISTANCE } from "@/utils";
import { useChainStore, useTxStore } from "@/utils/store";
import Spin from "@/components/Spin";
import ChainComponent from "@/components/Chain";
import { useRouter } from "next/router";

function Records() {
  const router = useRouter();
  const txStore = useTxStore((state) => ({ tx: state.tx, add: state.add }));
  const chainStore = useChainStore((state) => ({
    chain: state.chain,
  }));
  const t = useTranslations("Records");
  const tSetting = useTranslations("Setting");

  // 确保超过 scroll 阈值后只拉取一次数据
  const isInScope = useRef(false);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [chain, setChain] = useState(chainStore.chain);

  const handleChainChange = useCallback((option) => {
    setPage(1);
    setList([]);
    setChain(option.value);
  }, []);

  const fetchList = useCallback(async (chain, page, startRowId) => {
    try {
      setLoading(true);

      let newList = await getRecords({
        chain,
        page,
        startRowId,
      });

      setList((list) => {
        if (!list.length) {
          return newList;
        }

        if (newList[0]?.id < list[list.length - 1]?.id) {
          return [...list, ...newList];
        }

        return list;
      });

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const main = document.getElementById("records_container");
    const child = main.children[0];

    if (
      !isInScope.current &&
      main.clientHeight + main.scrollTop >= child.scrollHeight - SCROLL_DISTANCE
    ) {
      isInScope.current = true;
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  const handleCardClick = useCallback((tx) => {
    txStore.add(tx);
    router.push({
      pathname: `/record/detail`,
      query: {
        tx: `${tx.chain}.${tx.hash}`,
      },
    });
  }, []);

  useEffect(() => {
    fetchList(chain, page, list[list.length - 1]?.id).catch(console.log);
  }, [chain, page]);

  useEffect(() => {
    // list 更新后，重置 isInScope 值，只有新内容超过了最小的阈值，才开启下一次的下拉刷新
    const main = document.getElementById("records_container");
    const child = main.children[0];

    setTimeout(() => {
      if (
        main.clientHeight + main.scrollTop <
        child.scrollHeight - SCROLL_DISTANCE
      ) {
        isInScope.current = false;
      }
    }, 500);
  }, [list]);

  useEffect(() => {
    document
      .getElementById("records_container")
      .addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <div className={`flex grid grid-cols-2 items-center gap-4`}>
        <label>{tSetting("chain")}</label>
        <ChainComponent onChange={handleChainChange} value={chain} />
      </div>
      <div
        id="records_container"
        className="absolute bottom-0 left-4 right-4 top-12 mt-5 overflow-auto"
      >
        <Spin spinning={loading}>
          {list.map((l) => (
            <div
              className="mb-4 rounded bg-gray0/20 p-4"
              key={l.hash}
              onClick={() => handleCardClick(l)}
            >
              <div className="text-wrap break-words">{l.message}</div>
              <div className="mt-4 text-right">
                {formatTimestamp(l.timestamp)}
              </div>
            </div>
          ))}
        </Spin>
      </div>
    </>
  );
}

export default memo(Records);
