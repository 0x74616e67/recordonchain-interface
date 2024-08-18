import { useCallback, useState } from "react";
import { send } from "./../utils";
import Card from "@/components/Card";

export default function Home() {
  const [tx, setTx] = useState("");
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeKey = useCallback((e) => {
    setKey(e.target.value);
  }, []);

  const handleChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = async () => {
    if (message === undefined) {
      alert("message can not be null");
      return;
    }

    if (key === undefined) {
      alert("key can not be null");
      return;
    }

    setTx(null);
    setLoading(true);

    const tx = await send({ message, key });

    setLoading(false);
    setTx(tx);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div>
        <h1 className="mb-10 text-2xl">区块链记</h1>
        <div className="">
          <div className="flex flex-col align-center">
            <span className="text-xs">Please input your secure key</span>
            <input
              placeholder=""
              className="my-4 p-2"
              onChange={handleChangeKey}
              value={key}
            ></input>
          </div>
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

      {loading ? (
        <div>"Loading..."</div>
      ) : (
        tx?.hash && (
          <div className="mt-10">
            <span>Write success. </span>
            <a
              className="text-blue-500 hover:text-blue-900 visited:text-blue-600"
              href={`https://evmtestnet.confluxscan.net/tx/${tx.hash}`}
              target="_blank"
              data-html2canvas-ignore
            >
              onchain detail
            </a>
          </div>
        )
      )}

      {!loading && tx?.hash && <Card tx={tx}></Card>}
    </main>
  );
}
