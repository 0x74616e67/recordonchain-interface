import { useMemo } from "react";
import Link from "next/link";
import Portrait from "@/components/Portrait";
import { useTranslations } from "use-intl";
import Head from "next/head";

export default function Home() {
  const t = useTranslations("Home");
  const keys = useMemo(() => ["one", "two", "three", "four"], []);

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
        {keys.map((p) => (
          <Portrait
            name={t(`portraits.${p}.name`)}
            identity={t(`portraits.${p}.identity`)}
            info={t(`portraits.${p}.info`)}
            key={t(`portraits.${p}.name`)}
            avatar={t(`portraits.${p}.avatar`)}
          ></Portrait>
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

      <Link
        href="/record"
        className={`sticky bottom-0 left-full inline-block flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 leading-none text-white hover:bg-blue-500 ${
          process.env.NEXT_PUBLIC_SERVER_IS === "inside" ? "-mt-8" : ""
        }`}
      >
        <span className="mt-[-4px] text-4xl">+</span>
      </Link>
    </>
  );
}
