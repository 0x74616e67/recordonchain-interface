import { useCallback, useEffect, useState } from "react";
import { send, formatTimestamp } from "./../utils";
import QRCode from "@/components/QRCode";

export default function Home() {
  const [tx, setTx] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = async () => {
    if (message) {
      setTx(null);
      setLoading(true);

      const tx = await send(message);

      setLoading(false);
      setTx(tx);
    } else {
      alert("message can not be null");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      hello world
      <div>
        <input
          placeholder="Please input your message"
          className="m-4 p-2"
          onChange={handleChange}
          value={message}
        ></input>
        <button className="bg-sky-500/100 p-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>
        {loading
          ? "Loading..."
          : tx?.hash && (
              <div className="mt-10">
                <span>Write success.</span>
                <div>{tx.message}</div>
                <div>{formatTimestamp(tx.timestamp)}</div>
                <a
                  className="text-blue-500 hover:text-blue-900 visited:text-blue-600"
                  href={`https://evmtestnet.confluxscan.net/tx/${tx.hash}`}
                  target="_blank"
                >
                  onchain detail
                </a>
                <QRCode
                  text={`https://evmtestnet.confluxscan.net/tx/${tx.hash}`}
                ></QRCode>
              </div>
            )}
      </div>
    </main>
  );
}
