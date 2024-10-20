import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang={process.env.NEXT_PUBLIC_LOCALE}>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
