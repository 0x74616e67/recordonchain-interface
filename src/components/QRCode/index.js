import QRCode from "qrcode";
import React, { useEffect, useRef, memo } from "react";

const QRCodeComponent = memo(function QRCodeComponent({
  text = "",
  onSuccess = () => {},
  onError = () => {},
  className,
}) {
  const myRef = useRef(null);

  useEffect(() => {
    if (text === "") return;

    QRCode.toCanvas(
      myRef.current,
      text,
      {
        width: 150,
      },
      function (error) {
        if (error) {
          console.error(error);
          onError();
          return;
        }

        // TODO this component render twice
        // console.count("QRCodeComponent callback");

        onSuccess();
      }
    );
  }, [myRef, text]);

  // console.count("QRCodeComponent");

  return <canvas id="qrcode" className={className} ref={myRef}></canvas>;
});

export default QRCodeComponent;
