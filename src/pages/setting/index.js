import { memo, useState } from "react";
import { useTranslations } from "use-intl";
import Head from "next/head";
import Locale from "./Locale";

function Setting({}) {
  const t = useTranslations("Setting");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <Locale></Locale>
    </>
  );
}

export default memo(Setting);
