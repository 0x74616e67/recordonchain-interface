import { useEffect } from "react";
import { IntlProvider } from "use-intl";
import { useLocaleStore } from "@/utils/store";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

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
      </Layout>
    </IntlProvider>
  ) : null;
}
