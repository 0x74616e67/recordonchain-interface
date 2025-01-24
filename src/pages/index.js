import { useMemo } from "react";
import { useTranslations } from "use-intl";
import Head from "next/head";
import Card from "@/components/Card";

export default function Home() {
  const t = useTranslations("Home");

  const records = useMemo(
    () => [
      {
        hash: "0x038e7beb5400610b3dfffbb5144e24ff3059bfe86a853a9d3fe94a729b7ad803",
        timestamp: 1735096474,
        message: "🎄ZLY, Merry Christmas, my love🎄",
        chain: "conflux",
      },
      {
        hash: "0x89777930a5a131369a17b2170a9983ce193c7fd4a3523131e736ae1cc9ba53f9",
        timestamp: 1735103251,
        message: "김수현, 메리 크리스마스, 사랑해요 😘",
        chain: "conflux",
      },
      {
        hash: "0xea571362ea5fde81237ddeffe49caa2d35b49aac9a72aa0c6ff11fd5b90bb260",
        timestamp: 1734942995,
        message: `亲爱的成毅哥哥：\n\n嘿嘿～你好呀！我是你的小迷妹，超级喜欢你！每次看到你，我的心都会“砰砰”跳个不停！你的《沉香如屑》和《莲花楼》我都刷了好几遍，每个角色都像为你量身定做的，特别迷人！你的眼神好有故事感，哭戏心疼到不行，笑起来又甜到冒泡～\n\n哥哥，你真的好优秀啊！不仅演技超棒，性格还那么低调温柔，简直是我的理想型！嘻嘻，希望你多多拍戏，也要记得好好休息哦～我会一直支持你哒！❤️\n\n喜欢你的小不点～`,
        chain: "ethereum",
      },
      {
        hash: "0xcd759d28b032028f38ce92c8ee2a3d7cf47f5b9ce68cdf505f9be309a8e8d39b",
        timestamp: 1734082343,
        message: `胡桂英是南京大屠杀的幸存者之一，她的经历只是当时无数悲惨故事中的一个。南京大屠杀使30多万中国平民和放下武器的士兵惨遭杀害，给劫后余生的幸存者留下难以抚平的伤痛和苦难记忆。\n\n网友留言：
铭记历史，这段黑暗的流血的时光我们必须记住，也要更加明白国强的重要性。\n不忘来时路，感谢先辈们的付出，现在的强大和平来之不易，祭奠同胞，铭记历史，珍惜和平！`,
        chain: "ethereum",
      },
    ],
    [],
  );

  return (
    <div className="flex h-full flex-col">
      <Head>
        <title>{t("meta.title")}</title>
      </Head>

      <div className="text-base">
        <div className="indent-8">{t("introduction.label1")}</div>
        <div className="mt-2 indent-8">{t("introduction.label2")}</div>
        <div className="mt-2 indent-8">{t("introduction.label3")}</div>
      </div>

      <div className="mt-3 grow">
        {records.map((r) => (
          <Card key={r.hash} tx={r}></Card>
        ))}
      </div>

      <div
        className={`pb-3 text-xs font-light ${
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
    </div>
  );
}
