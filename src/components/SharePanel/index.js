import React, { useEffect, useRef, useCallback, useState } from "react";
import { formatTimestamp, getTxURL, getShareURL } from "@/utils";
import QRCode from "@/components/QRCode";
import html2canvas from "html2canvas";
import Dialog from "@/components/Dialog";
import { useTranslations } from "use-intl";
import Button from "../Button";

const imgs = ["/h.jpg", "/v.jpg"];

const SharePanel = React.memo(function SharePanel({
  tx = null,
  open = false,
  onCancel = () => {},
  onOk = () => {},
}) {
  const t = useTranslations("Common");
  const [src, setSrc] = useState(imgs[0]);

  const counter = useRef(0);

  const handleQRCodeSuccess = useCallback(() => {
    console.log("QRCode success");
  }, []);

  const handleGalleryClick = useCallback((index) => {
    setSrc(imgs[index]);
  }, []);

  const handleDownloadClick = useCallback(() => {
    if (!counter.current) {
      html2canvas(document.getElementById("card"), {
        onclone(dom, element) {
          element.className = element.className.replace("overflow-auto", "");
          return element;
        },
      }).then(function (canvas) {
        // 使用toDataURL方法将canvas转换为数据URL
        var dataURL = canvas.toDataURL("image/png"); // 也可以使用'image/jpeg'

        counter.current++;
        document.body.style.overflow = "hidden";

        // const imageUrl = document.getElementById("image").src;
        // 创建一个 <a> 元素
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = "image.jpg"; // 设置文件名
        a.style.display = "none";
        // 将 <a> 添加到文档中
        document.body.appendChild(a);
        // 触发点击事件
        a.click();
        // 移除 <a> 元素
        document.body.removeChild(a);

        counter.current = 0;
      });
    }
  }, []);

  const handleFileUploadChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const result = event.target.result;
        document.getElementById("image").src = result;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  if (!tx) {
    return null;
  }

  return (
    <div>
      <Dialog
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okButton={[]}
        cancelButton={[]}
        closeable={true}
      >
        <div id="card" className="flex flex-col justify-between overflow-auto">
          <div>
            <img
              id="image"
              src={src}
              className="object-cover h-[40vh] w-full"
              alt="share-panel-bg"
            ></img>
          </div>
          <div className="flex-none shrink-0 p-2 border-gray-200 border-[1px] border-t-0">
            <div className="text-left text-wrap break-words">{tx.message}</div>
            <div className="text-right mt-4">
              {formatTimestamp(tx.timestamp)}
            </div>
            <QRCode
              className="mt-4 self-end float-right border-gray-200 border-[1px]"
              text={getShareURL(tx.chain, tx.hash)}
              onSuccess={handleQRCodeSuccess}
              width={100}
            ></QRCode>
          </div>
        </div>
        <div className="mt-4 h-14 flex justify-items-stretch">
          {imgs.map((i, index) => (
            <div
              className={`w-14 h-14 ${index > 0 ? "ml-4" : ""}`}
              onClick={() => handleGalleryClick(index)}
              key={i}
            >
              <img
                src={i}
                className="object-cover w-full h-full"
                alt="bg"
              ></img>
            </div>
          ))}
          <div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileUploadChange}
              className="relative w-14 h-14 ml-4 border-gray-200 border-[1px] focus:outline-none after:content-[''] after:text-red-500 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-upload after:bg-white after:bg-[length:28px_28px] after:bg-no-repeat after:bg-center !overflow-hidden"
            ></input>
          </div>
          <div className="flex-1 grow">
            {/* <div
              className="w-14 h-14 ml-4 flex justify-center items-center bg-blue-600 hover:bg-blue-500 text-white float-right"
              onClick={handleDownloadClick}
            >
              保存
            </div> */}
            <Button
              onClick={handleDownloadClick}
              className="!w-14 float-right mt-5"
            >
              {t("button.save")}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
});

export default SharePanel;
