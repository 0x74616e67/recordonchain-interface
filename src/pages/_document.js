import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang={process.env.NEXT_PUBLIC_LOCALE}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_META_TITLE}</title>
        <meta charset="UTF-8" />
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
