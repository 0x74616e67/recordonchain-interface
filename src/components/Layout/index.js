import { memo } from "react";
import { useTranslations } from "use-intl";
import Footer from "./Footer";

function Layout({ children }) {
  const t = useTranslations("Meta");

  return (
    <>
      <div className="flex h-16 items-center justify-between bg-gray-100 px-4 text-2xl text-[#1E293B]">
        <h1>{t("title")}</h1>
      </div>
      <main className="relative h-[calc(100%-118px)] overflow-auto p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default memo(Layout);
