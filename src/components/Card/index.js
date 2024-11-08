import React, { useEffect, useRef, useCallback, useState } from "react";
import { formatTimestamp, getTxURL, getShareURL } from "@/utils";
import QRCode from "@/components/QRCode";
import html2canvas from "html2canvas";

const CardComponent = React.memo(function CardComponent({
  tx = null,
  onClose = () => {},
}) {
  const [dataURL, setDataURL] = useState("");
  const counter = useRef(0);

  const handleQRCodeSuccess = useCallback(() => {
    if (!counter.current) {
      html2canvas(document.getElementById("card"), {
        onclone(dom, element) {
          element.className = element.className.replace("hidden", "");
          return element;
        },
      }).then(function (canvas) {
        // 使用toDataURL方法将canvas转换为数据URL
        var dataURL = canvas.toDataURL("image/png"); // 也可以使用'image/jpeg'

        counter.current++;
        document.body.style.overflow = "hidden";

        setDataURL(dataURL);
      });
    }
  }, [counter]);

  const handleClose = useCallback(() => {
    document.body.style.overflow = "auto";
    setDataURL("");
    onClose();
  }, []);

  if (!tx) {
    return null;
  }

  return (
    <div>
      {/* this is card template, used to generate share picture */}
      <div
        id="card"
        className="absolute left-4 right-4 top-0 min-h-96 flex flex-col justify-between z-[-10] hidden bg-gray0/20 p-4 my-4 rounded"
      >
        <div className="">
          <div className="text-wrap break-words">{tx.message}</div>
          <div className="text-right mt-4">{formatTimestamp(tx.timestamp)}</div>
        </div>
        <QRCode
          className="mt-4 self-end"
          text={getShareURL(tx.chain, tx.hash)}
          onSuccess={handleQRCodeSuccess}
        ></QRCode>
      </div>
      {dataURL && (
        <div
          className="
          absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll p-4 pt-4 
          after:content-[''] after:absolute after:top-0 after:h-full after:left-0 after:right-0 after:z-[-1] after:backdrop-blur-sm after:bg-white/30"
        >
          <div
            className="absolute right-5 top-3 text-3xl text-blue0 cursor-pointer h-max"
            onClick={handleClose}
          >
            &#215;
          </div>
          <img src={dataURL} alt="card"></img>
        </div>
      )}
    </div>
  );
});

export default CardComponent;
