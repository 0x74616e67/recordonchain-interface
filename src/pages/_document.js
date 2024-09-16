import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <h1 className="text-2xl h-16 bg-[#F8FAFC] flex items-center pl-4 text-[#1E293B]">
          区块链记（测试版）
        </h1>
        <Main />
        <NextScript />

        {process.env.SERVER_IS === "inside" ? (
          <footer className="fixed bottom-0 z-1">
            <a
              href="https://beian.miit.gov.cn"
              target="_blank"
              className="text-blue-500"
            >
              陕ICP备2024048059号-1
            </a>
            <br></br>
            <span>© 2024 qukuailianji.com 版权所有</span>
          </footer>
        ) : null}
      </body>
    </Html>
  );
}
