export default {
  Meta: {
    title: "Qu Kuai Lian Ji",
    description:
      "Qu Kuai Lian Ji, a platform based on blockchain technology, allows you to record your precious thoughts permanently.",
  },
  Common: {
    button: {
      confirm: "Confirm",
      cancel: "Cancel",
      close: "Close",
      save: "Save",
    },
    recordOn: "Recorded on",
  },
  Tip: {
    verificationCode: {
      price: {
        title: "Verification Code Price: ",
        p1: "Depending on the selected blockchain platform, the price is as follows: ",
        li: "<li>Conflux：2 Yuan/Per Record</li><li>Ethereum：10 Yuan/Per Record</li>",
        p2: "Users can choose a suitable blockchain platform according to their needs.",
      },
      approach: {
        title: "Where to Buy:",
        li: "<li>Taobao Store</li><li>Xianyu</li><li><span>Add customer service WeChat to purchase</span><img></img></li><li>Scan code to purchase (not yet supported)</li>",
      },
      qa: {
        title: "Questions and Answers: ",
        q1: {
          q: "Why do I need a verification code?",
          a: "<li><b>Ensure authenticity</b>: The verification code mechanism can effectively prevent spam and enhance the authenticity and seriousness of the APP content. </li><li><b>Support the cost of blockchain content recording</b>: Storing content on the blockchain platform requires gas fees (which can be understood as handling fees). Different blockchain platforms have different costs, so the verification code fees vary. </li><li><b>Maintain the long-term operation of the APP</b>: Paid verification codes help the APP provide continuous services so that the stored content can be permanently preserved. </li>",
        },
        q2: {
          q: "What does the first letter of the verification code mean?",
          a: "<b>Used to distinguish different blockchain platforms.</b> Codes starting with C are applicable to the Conflux platform, and codes starting with E are applicable to the Ethereum platform. Different types of verification codes have different prices and cannot be used interchangeably.",
        },
        q3: {
          q: "Where can I view the verification code after purchasing it?",
          a: "<b>Check on each purchase platform. </b>Users need to save the verification code they purchased. The APP does not provide a query function and cannot be retrieved if lost.",
        },
        q4: {
          q: "Does the verification code have an expiration date?",
          a: "<b>There is no expiration date for now. </b> However, it is recommended to use it as soon as possible to prevent loss and inability to retrieve it on the APP.",
        },
        q5: {
          q: "Is there any discount if I buy a large number of verification codes?",
          a: "<b>Yes, there is a discount. </b>For details, please refer to the purchase platform introduction, or consult customer service. However, it is recommended to purchase in moderation to prevent loss, which cannot be retrieved on the APP.",
        },
      },
    },
    chains: {
      brief:
        "There are many blockchain platforms on the market, which vary in technology, usage scenarios, and development teams. Here, we will focus on two platforms:",
      conflux: {
        title: "Conflux: ",
        li: "<li>Conflux is a <b>domestic compliant public, permissionless blockchain project</b>, providing blockchain technology services to domestic and foreign companies. </li><li>Most of the founding team members are from <b>Tsinghua Yao Class</b>. After two years of intensive research and development, Conflux (Tree Graph Chain) was officially launched on October 29, 2020. </li><li>Conflux participates in multiple domestic projects and institutions, such as <b>Hunan Xiangjiang Tree Graph, Shanghai Tree Graph Research Institute, and China Telecom BSIM Card</b>. </li><li>Conflux's mission is to <b>promote the development of China's public chain</b> and allow Chinese people to participate in the rule-making and ecological construction of the next generation of blockchain. </li>",
      },
      ethereum: {
        title: "Ethereum: ",
        li: "<li>Ethereum is the <b>world's leading blockchain platform</b>, dedicated to innovating all industries through blockchain technology. </li><li>Ethereum <b>first created smart contracts</b>, enabling direct interaction between users, including the storage of text content. </li><li>Currently, Ethereum is <b>second in the world's blockchain rankings, second only to Bitcoin. </b></li><li>The project was <b>launched in 2015</b> by Vitalik Buterin and quickly became an important cornerstone in the blockchain field. After continuous iterations, Ethereum 2.0, launched in 2022, significantly improved the platform's scalability, security, and energy efficiency, consolidating its key position in the global blockchain ecosystem. </li>",
      },
    },
  },
  Footer: {
    home: "Home",
    create: "Create",
    records: "Records",
    setting: "Setting",
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
      conflux: "Conflux - Chinese platform",
      ethereum: "Ethereum - International platform",
      freetrail: "Free Trial Offer - For experience only",
    },
    code: {
      label: "Enter confirmation code",
      placeholder: {
        conflux: "Format such as C12345678",
        ethereum: "Format such as E12345678",
        confluxevmtestnet: "",
      },
      error: {
        empty: "Verification code cannot be empty",
        invalid: "Verification code is invalid or is verified",
        database: "Verification code verification failed",
        verified: "Verification code is verified",
        locked: "Verification code is locked",
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
  Records: {
    meta: {
      title: "Record List - Qu Kuai Lian Ji",
    },
    title: "Record List",
  },
  Setting: {
    meta: {
      title: "Setting - Qu Kuai Lian Ji",
    },
    title: "Setting",
    locale: "Language",
    chain: "Platform",
    contact: "Contact Us",
  },
  Terms: {
    Dialog: {
      ok: "Agree",
      cancel: "Cancel",
      checkbox: "Don't remind me again",
    },
    UserAgreement: {
      title: "User Agreement",
      content: `1. User Responsibility
Users bear full responsibility for the content and actions they upload. Once content is recorded on the blockchain, it will be permanently stored and cannot be modified or deleted. Users must ensure that their uploaded content complies with the laws and regulations of the People's Republic of China and does not infringe upon the legitimate rights of others.
2. Prohibited Conduct
Users are prohibited from uploading text that contains any of the following:
∙ Content that violates laws and regulations or social ethics;
∙ False or misleading information, or content that may cause harm to others;
∙ Any content related to pornography, gambling, drugs, violence, politics, or religious extremism.
3. Platform Rights
This platform reserves the right to monitor the content uploaded by users. Although the platform cannot delete or alter content on the blockchain, we have the right to refuse or prevent users from uploading illegal or non-compliant content. The platform will cooperate with law enforcement agencies in dealing with any illegal content uploaded by users.
4. Changes and Interruptions to Services
This platform has the right to adjust or terminate services as needed. If there are any changes to the content or fees of the services, the platform will notify users in advance through announcements. The platform assumes no responsibility for any inability to access or loss of records resulting from service adjustments or interruptions.
5. Legal Jurisdiction
This agreement is governed by the laws of the People's Republic of China. Any disputes arising from this agreement shall be submitted to the competent people's court in the location of the platform.
    `,
    },
    PrivacyPolicy: {
      title: "Privacy Policy",
      content: `1. Description of Services
This App provides users with the ability to permanently record textual content on the blockchain. Users can upload textual content to the blockchain by paying a fee; once submitted, the content cannot be deleted or modified. Currently, this platform does not support the uploading of media content such as images, audio, or video.
2. Service Limitations and Technical Risks
We strive to ensure the normal operation of our services; however, we make no guarantees regarding technical failures, service interruptions, or the termination of operations of the underlying blockchain platform. If issues arise from the blockchain platform that prevent the saving, access, or retention of users' recorded content, this platform will not be liable for any compensation.
Given the decentralized and transparent nature of blockchain, users must understand that their records will be stored publicly, and this platform cannot control or modify the content on the blockchain.
3. Blockchain Records and Retrieval
Although blockchain offers persistence, we do not guarantee that users' recorded content will exist permanently or be retrievable. Due to future technological adjustments or policy changes, the content uploaded by users may become inaccessible or lost. The platform is not liable for such occurrences.
4. Prohibition of Sensitive Information
Users are prohibited from uploading any sensitive, illegal, or inappropriate information, including but not limited to:
∙ Pornographic content;
∙ Promotion of gambling, drugs, or other illegal activities;
∙ Content related to national security, subversion of state power, or containing politically or religiously extremist statements;
∙ Content that involves violence, terrorism, or infringement of others' legitimate rights.
Users who upload such content will bear the corresponding legal responsibilities, and although the platform cannot delete records from the blockchain, users are responsible for the content they upload.
5. Risks Associated with Blockchain
The blockchain network is subject to uncontrollable technical risks, such as hacking attacks and network failures. Users must understand and accept the risks associated with the use of blockchain technology, for which this platform assumes no liability.
6. Force Majeure Clause
In the event of service interruptions or record loss due to force majeure factors (including but not limited to natural disasters, policy changes, network attacks, etc.), the platform shall not bear any responsibility.`,
    },
    Disclaimer: {
      title: "Disclaimer",
      content: `1. Information Collection
This platform does not collect users' personal identification information. Users can submit content anonymously, and the platform will not record, store, or process any personal data of users. The content uploaded by users is recorded on the blockchain and stored publicly, allowing anyone to view it.
2. Transparency of Blockchain
Due to the nature of blockchain, the content submitted by users will be permanently and publicly stored. Users should understand and agree that their uploaded content will be transparent to the public and will not be modified or deleted. Users are advised to carefully confirm the legality and compliance of their content before uploading.
3. Third-Party Blockchain Platforms
This platform relies on the technical support of third-party blockchain service providers. Users' content will be recorded and stored through third-party blockchain platforms. Users understand and accept that the platform assumes no responsibility for the operational status, technical security, or service availability of third-party blockchain services.
4. Data Security
While blockchain offers security, we make no commitments regarding the long-term accessibility of users' content. Users should understand that due to technical changes or policy adjustments within the blockchain network, their uploaded content may become inaccessible or lost in the future.
5. Legal Compliance
This platform complies with the relevant provisions of the Cybersecurity Law of the People's Republic of China, the Data Security Law, and the Personal Information Protection Law. The content uploaded by users must not violate the laws and regulations of the People's Republic of China. Users bear full responsibility for any legal liabilities arising from the uploading of illegal content.
6. User Rights
Users have the right to decide whether to submit content on this platform and understand that their content will be permanently stored on the blockchain and cannot be deleted. Users should carefully verify their content before submission to ensure its legality.
    `,
    },
  },
};
