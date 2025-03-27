import { useMemo } from "react";
import { useTranslations } from "use-intl";
import Head from "next/head";
import Card from "@/components/Card";

export default function Home() {
  const t = useTranslations("Home");

  const records = useMemo(
    () => [
      {
        hash: "0xbb8abf7aab4e792f97334a97b34ba3cfcc006baf27fe4cbcb695af0e40be8a0b",
        timestamp: 1743062828,
        message: `有时候我在清晨醒来， 我的灵魂甚至还是湿的。 远远的，海洋鸣响并且发出回声。 这是一个港口，我在这里爱你。  

- @虞余余余`,
        chain: "conflux",
      },
      {
        hash: "0xbb456b2625a404daab04ddce36d6b0d39c1ba6f0a77055145bb2797e416fcb44",
        timestamp: 1742993974,
        message:
          "@淇诗奕奕qiqi：喜欢多年后，成毅依旧清澈如初的眼眸。那是历经蜕变，却不曾改变的纯粹。那是怀揣梦想，不曾放弃的坚韧，那是始终感恩，以诚相待的善良。@成毅",
        chain: "conflux",
      },
      {
        hash: "0xf3b14d5cce0b53dcad90ea3f8a398b4053b731077feb9cd904ce2e2cadfe775b",
        timestamp: 1735096474,
        message: `亲爱的王一博：

展信安～

此刻提笔，窗外春意渐浓，而我的心情也如同三月枝头初绽的花，既雀跃又郑重。作为一名从《陈情令》蓝忘机初识您、又因您的作品与态度一路追随至今的24岁女孩，我想用这封信，向您诉说这份跨越荧幕与舞台的倾慕与敬意。

​荧幕光影，照见您的执着

第一次被您打动，是蓝忘机那句“我想带一人回云深不知处”的克制与深情。后来，季向空在《陪你到世界之巅》中为电竞梦想孤注一掷的坚持，让我看到您对角色灵魂的精准拿捏；而《冰雨火》里陈宇的热血与隐忍、《追风者》中魏若来的复杂心绪，更让我惊叹您作为演员的蜕变。您曾说：“业务能力是别人拿不走的资本”，这份对表演的敬畏，让每个角色都成为一面镜子，映照出您对热爱的极致追求。

​舞台与歌声，皆是赤诚的注脚

记得您在《这就是街舞》中纵情起舞时说过：“做自己喜欢的事情，不需要向任何人解释”。无论是《无感》里撕裂标签的呐喊，还是《万物可爱》中温柔治愈的吟唱，您的音乐始终充满生命力。去年冬天，《万物可爱》入选国家级音乐工程，那句“我爱昙花一现的所有”让我豁然开朗——原来热爱无关永恒，而是珍惜每一次全力以赴的绽放。

​以热爱为舟，渡成长之河

您常说：“21岁认定的事，到了81岁也要坚持”。这句话曾在我求职受挫时给予我力量。看着您从偶像团体成员成长为影、视、歌、舞多栖发展的全能艺人，我学会了“不设限”的勇气。您用行动诠释“人生像马拉松，坚持到最后才是胜利者”，而我也开始尝试跨界学习，像您一样在挑战中寻找自己的“B面人生”。

​温柔清醒，自成光芒

最令我钦佩的，是您始终清醒的自我认知。“坡顶的景色是下坡”“不专业是因为练习不够”，这些语录让我看到光环背后的谦逊与自省。您说“希望粉丝平安幸福过一生”，而这份遥远的关怀，却成为我面对生活琐碎时最温暖的慰藉。

此刻，耳机里正循环着《廿》的旋律。您用歌声告诉我：“只要有影子的地方，前面就一定有光”。或许我们此生难有交集，但您的作品与态度早已化作星辰，指引无数如我般的年轻人勇敢前行。

愿您永远如风自由，如星璀璨，在热爱的世界里继续披荆斩棘。而我，也会在自己的赛道上默默努力，与您“顶峰相见”。

爱你～

一位始终为您骄傲的观众
2025年3月26日`,
        chain: "ethereum",
      },
      {
        hash: "0x038e7beb5400610b3dfffbb5144e24ff3059bfe86a853a9d3fe94a729b7ad803",
        timestamp: 1742960279,
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
