import { useMemo } from "react";
import Link from "next/link";
import Portrait from "@/components/Portrait";
import { useTranslations } from "use-intl";

export default function Home() {
  const t = useTranslations("Home");

  const portraits = useMemo(() => {
    return [
      {
        name: "小红",
        identity: "大学生",
        info: "小红在大学时期暗恋着班上的一位同学，但一直没有勇气表白。毕业后，她将对他的心声和未曾说出口的情感记录在**区块链记**上。多年以后，可能某个陌生人读到了这些记录，感动于小红曾经对他的深情。虽然他们未曾走到一起，但这段情感的记忆通过区块链技术永远留存，成为他青春岁月中的一抹亮色。",
      },
      {
        name: "张先生",
        identity: "AI 程序员",
        info: "张先生年轻时有一个未能实现的梦想——环游世界。随着年龄的增长，这个梦想变得越来越遥不可及。但他在**区块链记**上记录了他对这个梦想的执着和对未能实现的遗憾。或许他的子孙们不会看到这些记录，但未来的某个人读到这些文字时，或许会因为这份遗憾而有所感触和共鸣，甚至激励自己去实现梦想。",
      },
      {
        name: "李阿姨",
        identity: "国企退休职员",
        info: "    李阿姨失去了她的丈夫已经五年了，每年她都会写下对丈夫的思念。通过**区块链记**，她记录下了一段段与丈夫相伴的回忆。这些文字不仅是她对丈夫的怀念，更是她对那段时光的珍藏。她知道，这些记录将永远存在，即使她的家人未必会看到，这些情感和记忆也会成为未来某个时间点的一段历史。",
      },
      {
        name: "小王",
        identity: "自由职业者",
        info: "小李是个喜欢记录生活中美好瞬间的人。每当她看到一朵盛开的花、一场绚丽的晚霞，或是和朋友的一次开心聚会，她都会在**区块链记**上留下文字。这些记录不仅让她自己在回忆时倍感温暖，也可能让未来的读者通过这些文字感受生活中的美好。即使岁月流转，这些小确幸也能被永远保存下来，成为她生命中的亮点。",
      },
    ];
  }, []);

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
