import QRCode from "qrcode";
import { useEffect, useRef } from "react";

function QRCodeComponent({ text = "" }) {
  const myRef = useRef(null);

  useEffect(() => {
    if (text === "") return;

    QRCode.toCanvas(myRef.current, text, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }, [myRef, text]);

  return <canvas id="qrcode" ref={myRef}></canvas>;
}

export default QRCodeComponent;
