import React, { useEffect, useRef, useCallback, useState } from "react";
import { formatTimestamp, getTxURL } from "../../utils";
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
  }, []);

  if (!tx) {
    return null;
  }

  return (
    <div>
      {/* this is card template, used to generate share picture */}
      <div
        id="card"
        className="p-4 m-4 bg-gray-500 fixed left-4 right-4 top-0 min-h-96 flex flex-col justify-between z-[-10] hidden"
      >
        <div className="">
          <div>你已经成功在区块链上记录一条信息：</div>
          <div>{tx.message}</div>
          <div>{formatTimestamp(tx.timestamp)}</div>
        </div>
        <QRCode
          className="mt-4 self-end"
          text={getTxURL(tx.chain, tx.hash)}
          onSuccess={handleQRCodeSuccess}
        ></QRCode>
      </div>
      {dataURL && (
        <div
          className="
          fixed top-0 bottom-0 left-0 right-0 overflow-y-scroll p-4 pt-9 
          after:content-[''] after:absolute after:top-0 after:h-full after:left-0 after:right-0 after:z-[-1] after:backdrop-blur-sm after:bg-white/30"
        >
          <div
            className="absolute right-2 top-0 text-3xl"
            onClick={handleClose}
          >
            &#10005;
          </div>
          <img src={dataURL} alt="card"></img>
        </div>
      )}
    </div>
  );
});

export default CardComponent;
