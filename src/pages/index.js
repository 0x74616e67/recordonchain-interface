import { useMemo } from "react";
import { useTranslations } from "use-intl";
import Head from "next/head";
import Card from "@/components/Card";

export default function Home() {
  const t = useTranslations("Home");

  const records = useMemo(
    () => [
      {
        hash: "0x583403f09b5351a1b37c8276374a4c8852e2ece72748d646d7adb943a1606666",
        timestamp: 1732181403,
        message: "Smart WebP, PNG and JPEG Compression for Faster Websites",
        chain: "confluxevmtestnet",
      },
      {
        hash: "0x548c534db76d8c5037967ba280f469b60f02a467c6e3ffe40e2a840388010b2d",
        timestamp: 1731571090,
        message:
          "亚太经合组织是亚太地区层级最高、领域最广、最具影响力的经济合作机制，成立30多年来，助力亚太成为世界经济增长中心、全球发展稳定之锚和合作高地。如今的亚太，犹如一颗璀璨明珠，镶嵌在世界版图上，引领着区域一体化与经济全球化的浪潮，成为全球团结协作、共同发展、互利共赢的典范。",
        chain: "confluxevmtestnet",
      },
      {
        hash: "0x8b972596535d974a80dc85ae1e1d3c2ac486861a20c260bfde0af5626f5164e2",
        timestamp: 1731480457,
        message: "Optimization for each project",
        chain: "confluxevmtestnet",
      },
      {
        hash: "0x79f521bd6a1ec64cf85f9135ddaaf4d88d9e54fa503113f09b97990785a631b7",
        timestamp: 1731037069,
        message:
          "0x5447bdbdbbfebedaafc8e94235c4b0a28449eff602b0fae81e7af3996bc0723c",
        chain: "confluxevmtestnet",
      },
    ],
    [],
  );

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
      </Head>
      <div className="text-base">
        <div className="indent-8">{t("introduction.label1")}</div>
        <div className="mt-2 indent-8">{t("introduction.label2")}</div>
        <div className="mt-2 indent-8">{t("introduction.label3")}</div>
      </div>

      <div className="mt-3">
        {records.map((r) => (
          <Card key={r.hash} tx={r}></Card>
        ))}
      </div>

      <div
        className={`text-xs font-light ${
          process.env.NEXT_PUBLIC_SERVER_IS === "inside" ? "" : "hidden"
        }`}
      >
        <img
          className="-mt-1 inline-block h-4 w-4"
          src="/beian.png"
          alt="beian"
        ></img>
        <a
          className="ml-1 text-blue-600 hover:text-blue-500"
          href="https://beian.mps.gov.cn/#/query/webSearch?code=61019002003057"
          rel="noreferrer"
          target="_blank"
        >
          陕公网安备61019002003057
        </a>
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          className="ml-2 text-blue-600 hover:text-blue-500"
        >
          陕ICP备2024048059号-1
        </a>
        <br></br>
        <span>© 2024 qukuailianji.com 版权所有</span>
      </div>

      {/* <Link
        href="/record"
        className={`sticky bottom-0 left-full inline-block flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 leading-none text-white hover:bg-blue-500 ${
          process.env.NEXT_PUBLIC_SERVER_IS === "inside" ? "-mt-8" : ""
        }`}
      >
        <span className="mt-[-4px] text-4xl">+</span>
      </Link> */}
    </>
  );
}
