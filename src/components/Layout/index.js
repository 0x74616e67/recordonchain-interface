import { memo } from "react";
import { useTranslations } from "use-intl";
import Footer from "./Footer";

function Layout({ children }) {
  const t = useTranslations("Meta");

  return (
    <>
      <div className="text-2xl h-16 bg-[#F8FAFC] flex items-center justify-between px-4 text-[#1E293B]">
        <h1>{t("title")}</h1>
      </div>
      <main className="p-4 relative h-[calc(100%-118px)] overflow-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default memo(Layout);
