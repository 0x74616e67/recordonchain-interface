export default {
  Meta: {
    title: "区块链记",
    description:
      "区块链记，一个依托于区块链技术的平台，让您可以将珍贵的想法永久记录下来。",
  },
  Footer: {
    home: "首页",
    create: "创建",
    records: "记录",
    setting: "设置",
  },
  Home: {
    meta: {
      title: "区块链记",
    },
    introduction: {
      label1:
        "在这个快节奏的世界里，我们的情感和记忆常常随着时间的流逝而淡去。但有些瞬间、有些情感却值得被永远铭记和分享。",
      label2:
        "无论是对逝者的思念，对暗恋之人的仰慕，还是对求而不得的遗憾，抑或是对生活中小而美的瞬间的欣喜，我们都提供了一个安全且不可更改的记录方式。这些内容将通过区块链技术永久保存，不会因为时间的推移而消失，成为一段历史，甚至千百年后的人们也能看到和感受到您曾经的心境和情感。",
      label3:
        "区块链记，一个依托于区块链技术的平台，让您可以将这些珍贵的想法永久记录下来，并在岁月的长河里流传。",
    },
    portraits: {
      one: {
        name: "雨墨",
        identity: "大学生",
        info: "我总是装作不经意路过你的座位，只为看看你。你笑时是那么的好看，你看我时，我的心都要跳出来～我悄悄折了一只纸鹤，放进你的包里，你知道吗，林轩，我喜欢你～",
        avatar: "/luffy.jpg",
      },
      two: {
        name: "冯先生",
        identity: "AI 工程师",
        info: "我是个码农，向往环游世界，去看极光、穿越沙漠、走进雨林。但现实逼我停下脚步，房租、贷款、工作、加班...... 每当深夜敲完代码，我总会打开地图，幻想有一天能真正踏上那片土地......",
        avatar: "/luffy.jpg",
      },
      three: {
        name: "张阿姨",
        identity: "国企退休职员",
        info: "2024年10月10日，天气晴朗。今天去花园给花浇水，看到那朵你最喜欢的玫瑰，心中涌起无尽的思念。五年前，你因病离开了我，留下了无数美好的回忆。我们一起度过的每一个晨昏、每一次欢笑，如今都变成了我心中温暖而又刺痛的记忆。孤独的日子里，只有这片花园陪伴着我，每一朵花都是我对你的思念。愿你在天堂也能感受到我的爱。",
        avatar: "/luffy.jpg",
      },
      four: {
        name: "雯海",
        identity: "企业策划",
        info: "早上上班的路上，我竟然看到了彩虹！色彩斑斓的弧线真漂亮，哈哈～空气也好好呢～真想你也在这里！希望你今天也能有好心情！❤️🌈",
        avatar: "/luffy.jpg",
      },
    },
  },
  Record: {
    meta: {
      title: "记录 - 区块链记",
    },
    title: "记录",
    record: {
      label: "输入想记录在区块链上的内容",
      error: {
        empty: "内容不能为空",
        send: "记录失败，请重试",
      },
    },
    chain: {
      label: "选择记录平台",
      conflux: "国内平台",
      ethereum: "国际平台",
      freetrail: "试用平台 - 仅供体验",
    },
    code: {
      label: "输入验证码",
      placeholder: {
        conflux: "格式如 C12345678",
        ethereum: "格式如 E12345678",
        confluxevmtestnet: "",
      },
      error: {
        empty: "验证码不能为空",
        invalid: "验证码不存在或已经使用过",
        database: "验证码校验失败，请重试",
      },
    },
    submit: "提交",
    error: {},
  },
  Detail: {
    meta: {
      title: "记录详情 - 区块链记",
    },
    title: "记录详情",
    share: "分享",
    link: "区块链上记录的内容（<scan>详情</scan>）：",
    noContent: "暂无内容",
    error: {
      link: "链接无效，无法获取链上内容",
      getTxInfo: "获取记录失败，请<button>重试</button>",
    },
  },
  Records: {
    meta: {
      title: "记录列表 - 区块链记",
    },
    title: "记录列表",
  },
  Setting: {
    meta: {
      title: "设置 - 区块链记",
    },
    title: "设置",
    locale: "语言",
    chain: "平台",
  },
};
