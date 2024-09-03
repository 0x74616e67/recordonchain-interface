import { useCallback, useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 absolute max-h-full overflow-auto">
      <div className="overflow-auto">
        <h1 className="mb-10 text-2xl">区块链记</h1>

        <div className="scroll">
          ### 欢迎来到区块链记
          在这个快节奏的世界里，我们的情感和记忆常常随着时间的流逝而淡去。但有些瞬间、有些情感却值得被永远铭记和分享。**区块链记**，一个依托于区块链技术的平台，让您可以将这些珍贵的想法永久记录下来，并在岁月的长河里流传。
          无论是对逝者的思念，对暗恋之人的仰慕，还是对求而不得的遗憾，抑或是对生活中小而美的瞬间的欣喜，我们都提供了一个安全且不可更改的记录方式。这些内容将通过区块链技术永久保存，不会因为时间的推移而消失，成为一段历史，甚至千百年后的人们也能看到和感受到您曾经的心境和情感。
        </div>

        <Link href="/record">
          <button className="bg-sky-500/100 p-2">Add Record</button>
        </Link>
      </div>
    </main>
  );
}
