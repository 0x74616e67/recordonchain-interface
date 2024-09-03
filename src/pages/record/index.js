"use client";

import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { send } from "@/utils";
import { useTxStore } from "@/utils/store";

export default function Record() {
  // const txStore = useTxStore((state) => ({ tx: state.tx }));

  const [tx, setTx] = useState({});

  const txStore = useTxStore((state) => ({ tx: state.tx, add: state.add }));
  const router = useRouter();
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
        pathname: `/record/conflux/${tx.hash}`,
        // query: {
        //   chain: "conflux",
        //   hash: tx.hash,
        // },
      });
    } else {
      // TODO add real tips
      alert("send tx error, please try again");
    }

    setLoading(false);
  };

  return (
    <div>
      add new record page
      <div className="">
        <div className="flex flex-col align-center">
          <span className="text-xs">Please input your message</span>
          <textarea
            placeholder=""
            className="my-4 p-2"
            onChange={handleChange}
            value={message}
          ></textarea>
        </div>
      </div>
      <div>
        <button className="bg-sky-500/100 p-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>{loading && "loading..."}</div>
    </div>
  );
}
