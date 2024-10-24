import { useLocaleStore } from "@/utils/store";
import { memo } from "react";
import { useTranslations } from "use-intl";
import Footer from "./Footer";

function Layout({ children }) {
  const t = useTranslations("Meta");
  const localeStore = useLocaleStore((state) => ({
    locale: state.locale,
    setLocale: state.setLocale,
  }));

  return (
    <>
      <div className="text-2xl h-16 bg-[#F8FAFC] flex items-center justify-between px-4 text-[#1E293B]">
        <h1>{t("title")}</h1>
        <div>
          <small
            className={`text-sm cursor-pointer ${
              localeStore.locale === "en" ? "text-blue0" : ""
            }`}
            onClick={() => localeStore.setLocale("en")}
          >
            English
          </small>
          <small
            className={`text-sm ml-2 cursor-pointer ${
              localeStore.locale === "zh" ? "text-blue0" : ""
            }`}
            onClick={() => localeStore.setLocale("zh")}
          >
            中文
          </small>
        </div>
      </div>
      <main className="p-4 relative h-[calc(100%-118px)]">{children}</main>
      <Footer />
    </>
  );
}

export default memo(Layout);
