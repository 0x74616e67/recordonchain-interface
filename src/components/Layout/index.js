import { memo } from "react";
import { useTranslations } from "use-intl";
import Footer from "./Footer";

function Layout({ children }) {
  const t = useTranslations("Meta");

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b px-4 text-2xl">
        <h1>{t("title")}</h1>
      </div>
      <main className="relative h-[calc(100%-128px)] overflow-auto p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default memo(Layout);
