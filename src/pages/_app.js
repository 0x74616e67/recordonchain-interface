import { useEffect } from "react";
import { IntlProvider } from "use-intl";
import { useLocaleStore } from "@/utils/store";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Script from "next/script";

import en from "@/locales/en";
import zh from "@/locales/zh";

const messages = {
  en,
  zh,
};

export default function App({ Component, pageProps }) {
  const localeStore = useLocaleStore((state) => ({
    locale: state.locale,
    setLocale: state.setLocale,
  }));

  useEffect(() => {
    const locale =
      localeStore.locale ||
      localStorage.getItem("locale") ||
      process.env.NEXT_PUBLIC_LOCALE;

    localeStore.setLocale(locale);
  }, [localeStore.locale]);

  return localeStore.locale ? (
    <IntlProvider
      messages={messages[localeStore.locale]}
      locale={localeStore.locale}
    >
      <Layout>
        <Component {...pageProps} />
        {process.env.NEXT_PUBLIC_ANALYSIS === "true" ? (
          <Script id="baiduanalysis">
            {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?e441f0a83da13bd682e8a6546bf0b06f";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `}
          </Script>
        ) : null}
      </Layout>
    </IntlProvider>
  ) : null;
}
