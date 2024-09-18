import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <h1 className="text-2xl h-16 bg-[#F8FAFC] flex items-center pl-4 text-[#1E293B]">
          区块链记
        </h1>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
