import { useMemo } from "react";
import Link from "next/link";
import Portrait from "@/components/Portrait";
import { useTranslations } from "use-intl";

export default function Home() {
  const t = useTranslations("Home");
  const keys = useMemo(() => ["one", "two", "three", "four"], []);

  return (
    <div className="max-h-full overflow-y-auto relative">
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
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          className="text-blue-500"
        >
          陕ICP备2024048059号-1
        </a>
        <br></br>
        <span>© 2024 qukuailianji.com 版权所有</span>
      </div>

      <Link
        href="/record"
        className={`bg-blue0 text-white inline-block w-12 h-12 rounded-full flex items-center justify-center leading-none sticky bottom-0 left-full ${
          process.env.NEXT_PUBLIC_SERVER_IS === "inside" ? "-mt-8" : ""
        }`}
      >
        <span className="mt-[-4px] text-4xl">+</span>
      </Link>
    </div>
  );
}
