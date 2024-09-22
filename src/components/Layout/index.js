import { useLocaleStore } from "@/utils/store";
import { memo } from "react";
import { useTranslations } from "use-intl";

function Layout({ children }) {
  const t = useTranslations("Layout");
  const localeStore = useLocaleStore((state) => ({
    locale: state.locale,
    setLocale: state.setLocale,
  }));

  return (
    <>
      <h1 className="text-2xl h-16 bg-[#F8FAFC] flex items-center justify-between px-4 text-[#1E293B]">
        {t("title")}
        <div>
          <small
            className={`text-sm ${
              localeStore.locale === "en" ? "text-blue0" : ""
            }`}
            onClick={() => localeStore.setLocale("en")}
          >
            English
          </small>
          <small
            className={`text-sm ml-2 ${
              localeStore.locale === "zh" ? "text-blue0" : ""
            }`}
            onClick={() => localeStore.setLocale("zh")}
          >
            中文
          </small>
        </div>
      </h1>
      <main className="p-4 relative h-[calc(100%-64px)]">{children}</main>
    </>
  );
}

export default memo(Layout);
