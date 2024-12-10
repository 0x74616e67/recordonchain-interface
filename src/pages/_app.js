import Head from "next/head";
import { useEffect } from "react";
import { IntlProvider } from "use-intl";
import { useLocaleStore, useChainStore, useTermsStore } from "@/utils/store";
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

  const chainStore = useChainStore((state) => ({
    chain: state.chain,
    setChain: state.setChain,
  }));

  const termsStore = useTermsStore((state) => ({
    acceptance: state.acceptance,
    setAcceptance: state.setAcceptance,
  }));

  useEffect(() => {
    // 加载 localstorage 中的配置

    const locale =
      localeStore.locale ||
      localStorage.getItem("locale") ||
      process.env.NEXT_PUBLIC_LOCALE;

    localeStore.setLocale(locale);

    const chain =
      chainStore.chain ||
      localStorage.getItem("chain") ||
      process.env.NEXT_PUBLIC_CHAIN;

    chainStore.setChain(chain);

    // 默认 store 中是不存 terms 值的，也即 undefined
    // 第一次加载时用 env config 值
    // 第二次读 localstorage 中的值
    // 经过前两次后，实时运行中读 store 中值
    const acceptance =
      termsStore.acceptance ||
      localStorage.getItem("terms") ||
      process.env.NEXT_PUBLIC_TERMS;

    termsStore.setAcceptance(acceptance);
  }, [localeStore.locale, chainStore.chain, termsStore.terms]);

  return localeStore.locale ? (
    <IntlProvider
      messages={messages[localeStore.locale]}
      locale={localeStore.locale}
    >
      <Layout>
        <Head>
          <title>{process.env.NEXT_PUBLIC_META_TITLE}</title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta
            name="description"
            content={process.env.NEXT_PUBLIC_META_DESCRIPTION}
          />
          <meta
            name="keywords"
            content={process.env.NEXT_PUBLIC_META_KEYWORDS}
          ></meta>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
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
