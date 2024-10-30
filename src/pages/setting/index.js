import { memo } from "react";
import { useTranslations } from "use-intl";
import Head from "next/head";
import Locale from "./Locale";
import Chain from "./Chain";

function Setting({}) {
  const t = useTranslations("Setting");

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <Locale></Locale>
      <div className="mt-2"></div>
      <Chain></Chain>
    </>
  );
}

export default memo(Setting);
