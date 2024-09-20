import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { send } from "@/utils";
import { useTxStore } from "@/utils/store";
import Navbar from "@/components/Navbar";
import Spin from "@/components/Spin";

export default function Create() {
  const txStore = useTxStore((state) => ({ tx: state.tx, add: state.add }));
  const router = useRouter();

  const MAX_LENGTH = 200;

  const [message, setMessage] = useState("");
  // TODO user can select network
  const [chain, setChain] = useState("conflux");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = async () => {
    if (message === undefined) {
      alert("message can not be null");
      return;
    }

    setLoading(true);

    const tx = await send({ chain, message });

    if (tx) {
      txStore.add(tx);

      router.push({
        pathname: `/record/detail`,
        query: {
          tx: `${tx.chain}.${tx.hash}`,
        },
      });
    } else {
      // TODO add real tips
      alert("send tx error, please try again");
    }

    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <Navbar title="记录"></Navbar>
      <div>
        <span className="text-base">输入想记录在区块链上的内容</span>
        <div className="flex flex-col align-center relative">
          <textarea
            placeholder=""
            className="my-4 p-2 border-2 border-solid border-gray0 rounded focus:border-blue0 focus:outline-none resize-none"
            rows={6}
            autoFocus
            resize="none"
            onChange={handleChange}
            value={message}
            maxLength={MAX_LENGTH}
          ></textarea>
          <span
            className={`absolute bottom-5 right-2 ${
              message.length >= MAX_LENGTH ? "text-red-500" : "text-gray0"
            }`}
          >
            {message.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      <button
        className="bg-blue0 text-white rounded-full flex items-center justify-center leading-none w-12 h-12 float-right"
        onClick={handleSubmit}
      >
        提交
      </button>
    </Spin>
  );
}
