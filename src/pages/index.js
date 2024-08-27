import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { send } from "./../utils";
import { useTxStore } from "./../utils/store";

export default function Home() {
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
        pathname: "/record",
        query: {
          chain: "conflux",
          hash: tx.hash,
        },
      });
    } else {
      // TODO add real tips
      alert("send tx error, please try again");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div>
        <h1 className="mb-10 text-2xl">区块链记</h1>
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
      </div>

      {loading && <div>Loading...</div>}
    </main>
  );
}
