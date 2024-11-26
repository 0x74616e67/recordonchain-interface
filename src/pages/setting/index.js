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
      <div className="mt-4"></div>
      <Chain></Chain>
      <div className="mt-2"></div>
      <div className="grid grid-cols-3 gap-4 flex items-center h-11 sm:pr-4">
        <label>{t("contact")}</label>
        <a
          className="text-right col-span-2 text-blue-600 hover:text-blue-500"
          href="mailto:contact@qukuailianji.com"
          target="__blank"
        >
          contact@qukuailianji.com
        </a>
      </div>
    </>
  );
}

export default memo(Setting);
