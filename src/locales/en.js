export default {
  Meta: {
    title: "Qu Kuai Lian Ji (Beta)",
    description:
      "Qu Kuai Lian Ji, a platform based on blockchain technology, allows you to record your precious thoughts permanently.",
  },
  Home: {
    meta: {
      title: "Qu Kuai Lian Ji",
    },
    introduction: {
      label1:
        "In the fast-paced world, our emotions and memories often fade with time. But some moments and emotions are worth being cherished and shared forever.",
      label2:
        "Whether it's the remembrance of a loved one, the admiration for a secret crush, or the regret for unattainable desires, or the joy of small, beautiful moments in life, we provide a secure and immutable recording method. These contents will be permanently saved through blockchain technology and will not fade away with time, becoming a history that can be seen and felt by people in the future for generations. ",
      label3:
        "RecordOnChain, a platform relying on blockchain technology, allows you to permanently record these precious thoughts and pass them on through the river of time.",
    },
    portraits: {
      one: {
        name: "Mo Yu",
        identity: "Student",
        info: "I always pretend to pass by your seat casually, just to see you. You are so beautiful when you smile, and my heart will jump out when you look at me~ I quietly folded a paper crane and put it in your bag. Do you know, Lin Xuan, I like you~",
        avatar: "/luffy.jpg",
      },
      two: {
        name: "Mr. Feng",
        identity: "AI Engineer",
        info: "I am a coder who dreams of traveling around the world, seeing the aurora, crossing the desert, and walking into the rainforest. But reality forces me to stop. Rent, loans, work, overtime... Whenever I finish typing code late at night, I always open the map and imagine that one day I can really set foot on that land...",
        avatar: "/luffy.jpg",
      },
      three: {
        name: "Aunt Zhang",
        identity: "Retired Employee of a State-Owned Enterprise",
        info: "On October 10, 2024, the weather was fine. Today, I went to the garden to water the flowers. When I saw your favorite rose, my heart was filled with endless longing. Five years ago, you left me due to illness, leaving behind countless beautiful memories. Every morning and evening, every laugh we spent together, has now become a warm and painful memory in my heart. In the lonely days, only this garden accompanies me, and every flower is my longing for you. May you feel my love in heaven, too.",
        avatar: "/luffy.jpg",
      },
      four: {
        name: "Wenhai",
        identity: "Corporate Planning",
        info: "On my way to work this morning, I actually saw a rainbow! The colorful arc is so beautiful, haha~ The air is so good~ I really wish you were here too! I hope you can be in a good mood today too! ❤️🌈",
        avatar: "/luffy.jpg",
      },
    },
  },
  Record: {
    meta: {
      title: "Record - Qu Kuai Lian Ji",
    },
    title: "Record",
    record: {
      label: "Enter the content you want to record on the blockchain",
      error: {
        empty: "Content cannot be empty",
        send: "Record failed, please try again",
      },
    },
    chain: {
      label: "Select a recording platform",
      conflux: "Chinese platform",
      ethereum: "International platform",
      freetrail: "Trial platform - for experience only",
    },
    code: {
      label: "Enter confirmation code",
      error: {
        empty: "Verification code cannot be empty",
        invalid: "Verification code is invalid or is verified",
        database: "Verification code verification failed",
      },
    },
    submit: "Submit",
    error: {},
  },
  Detail: {
    meta: {
      title: "Record Detail - Qu Kuai Lian Ji",
    },
    title: "Record Detail",
    share: "Share",
    link: "The content recorded on the blockchain ( <scan>Detail</scan> ) :",
    noContent: "No content",
    error: {
      link: "Invalid link, unable to get blockchain content",
      getTxInfo: "Failed to get record, please <button>try again</button>",
    },
  },
};
