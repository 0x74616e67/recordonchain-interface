import { useCallback, useEffect, useState } from "react";
import { send } from "./../utils";

export default function Home() {
  const [hash, setHash] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setMsg(e.target.value);
  }, []);

  const handleSubmit = async () => {
    if (msg) {
      setHash("");
      setLoading(true);

      const txHash = await send(msg);

      setLoading(false);
      setHash(txHash);
    } else {
      alert("msg can not be null");
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
          value={msg}
        ></input>
        <button className="bg-sky-500/100 p-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>
        {loading ? (
          "Loading..."
        ) : hash ? (
          <span>
            Write success, for more details, please see{" "}
            <a
              className=""
              href={`https://evmtestnet.confluxscan.io/tx/${hash}`}
              target="_blank"
            >
              here
            </a>
            .
          </span>
        ) : null}
      </div>
    </main>
  );
}
