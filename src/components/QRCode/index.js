import QRCode from "qrcode";
import { useEffect, useRef } from "react";

console.log(2222, QRCode);

function QRCodeComponent({ text = "" }) {
  const myRef = useRef(null);

  useEffect(() => {
    QRCode.toCanvas(myRef.current, text, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }, [myRef]);

  return <canvas id="qrcode" ref={myRef}></canvas>;
}

export default QRCodeComponent;
