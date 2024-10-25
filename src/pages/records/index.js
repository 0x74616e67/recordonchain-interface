import { memo, useState } from "react";
import Spin from "@/components/Spin";
import { useTranslations } from "use-intl";
import Head from "next/head";

function Records({}) {
  const t = useTranslations("Records");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <Spin spinning={loading}>{t("title")}</Spin>
    </>
  );
}

export default memo(Records);
