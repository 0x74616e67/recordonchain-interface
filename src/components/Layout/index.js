import { memo } from "react";
import { useTranslations } from "use-intl";
import Footer from "./Footer";

function Layout({ children }) {
  const t = useTranslations("Meta");

  return (
    <>
      <div className="flex h-16 items-center border-b px-3 text-2xl">
        <img className="mr-2 h-10 w-10 border" src="/logo.svg"></img>
        <h1 className="text-blue-600">{t("title")}</h1>
      </div>
      <main className="relative h-[calc(100%-128px)] overflow-auto p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default memo(Layout);
