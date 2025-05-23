import { memo, useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "use-intl";
import Head from "next/head";
import { getRecords, SCROLL_DISTANCE } from "@/utils";
import Spin from "@/components/Spin";
import ChainComponent from "@/components/Chain";
import Card from "@/components/Card";

function Records() {
  const t = useTranslations("Records");
  const tSetting = useTranslations("Setting");

  // 确保超过 scroll 阈值后只拉取一次数据
  const isInScope = useRef(false);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  // 请求里面不用 page，用 startRowId 和 pageSize 进行翻页处理。这里用来作为 fetchList 依赖。进行列表刷新
  const [page, setPage] = useState(1);
  const [chain, setChain] = useState("");

  const handleChainChange = useCallback((option) => {
    setPage(1);
    setList([]);
    setChain(option.value);
  }, []);

  const fetchList = useCallback(async (chain, startRowId) => {
    try {
      setLoading(true);

      let newList = await getRecords({
        chain,
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

  useEffect(() => {
    fetchList(chain, list[list.length - 1]?.id).catch(console.log);
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
        <ChainComponent
          onChange={handleChainChange}
          value={chain}
          all
          trail={process.env.NODE_ENV === "development"}
        />
      </div>
      <div
        id="records_container"
        className="absolute bottom-0 left-4 right-4 top-14 mt-5 overflow-auto"
      >
        <Spin spinning={loading}>
          {list.map((l) => (
            <Card tx={l} key={l.hash}></Card>
          ))}
        </Spin>
      </div>
    </>
  );
}

export default memo(Records);
