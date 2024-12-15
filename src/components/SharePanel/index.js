import React, { useEffect, useCallback, useState } from "react";
import { formatTimestamp, getShareURL } from "@/utils";
import QRCode from "@/components/QRCode";
import html2canvas from "html2canvas";
import Dialog from "@/components/Dialog";
import { useTranslations } from "use-intl";
import Spin from "@/components/Spin";

const SharePanel = React.memo(function SharePanel({
  tx = null,
  open = false,
  onCancel = () => {},
  onOk = () => {},
}) {
  const t = useTranslations("Common");
  const tMeta = useTranslations("Meta");
  const tDetail = useTranslations("Detail");

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setTemplateIndex(0);
      }, 500);
    }
  }, [open]);

  const [loading, setLoading] = useState(false);
  // 为了防止 bg_img 加载完成后 qrcode 还未渲染完，导致 qrcode 缺失，此处优先生成 qrcode，成功后再生成 bg_img
  const [isQrcodeReady, setIsQrcodeReady] = useState(false);
  const [bgImgSrc, setBgImgSrc] = useState("");
  const [templateIndex, setTemplateIndex] = useState(0);

  const handleQRCodeSuccess = useCallback(() => {
    setIsQrcodeReady(true);
  }, []);

  const handlebgImgLoad = useCallback((e, bgImgSrc) => {
    const noImg = !bgImgSrc;

    setLoading(true);

    // 需要手动计算 id=bg_img 的 <img> 标签样式，使其填满整个父级元素，且居中显示
    const style = {};

    if (!noImg) {
      const parentWidth = document.getElementById("share_img").clientWidth + 2; // 加上 2px 的边框
      const width = e.target.naturalWidth;
      const height = e.target.naturalHeight;

      if (width > height) {
        const targetWidth = parentWidth * (width / height);

        style.height = `${parentWidth}px`;
        style.width = `${targetWidth}px`;
        style.marginLeft = `-${(targetWidth - parentWidth) / 2}px`;
        style.marginRight = `-${(targetWidth - parentWidth) / 2}px`;
        style.marginTop = "0px";
        style.marginBottom = "0px";
      } else {
        const targetHeight = parentWidth * (height / width);

        style.width = `${parentWidth}px`;
        style.height = `${targetHeight}px`;
        style.marginTop = `-${(targetHeight - parentWidth) / 2}px`;
        style.marginBottom = `-${(targetHeight - parentWidth) / 2}px`;
        style.marginLeft = "0px";
        style.marginRight = "0px";
      }
    }

    html2canvas(document.getElementById("card"), {
      onclone(dom, element) {
        element.className = element.className.replace("hidden", "");

        if (!noImg) {
          // 更新 id=bg_img 的 <img> 标签样式
          element.childNodes[0].childNodes[0].style.width = style.width;
          element.childNodes[0].childNodes[0].style.height = style.height;
          element.childNodes[0].childNodes[0].style.marginTop = style.marginTop;
          element.childNodes[0].childNodes[0].style.marginBottom =
            style.marginBottom;
          element.childNodes[0].childNodes[0].style.marginLeft =
            style.marginLeft;
          element.childNodes[0].childNodes[0].style.marginRight =
            style.marginRight;
        } else {
          element = element.removeChild(element.childNodes[0]);
        }

        return element;
      },
    })
      .then(function (canvas) {
        // 使用toDataURL方法将canvas转换为数据URL
        var dataURL = canvas.toDataURL("image/png"); // 也可以使用'image/jpeg'
        const shareImg = document.getElementById("share_img");
        shareImg.onload = function () {
          setLoading(false);
        };
        shareImg.onerror = function () {
          setLoading(false);
        };
        shareImg.onabort = function () {
          setLoading(false);
        };
        shareImg.src = dataURL;
        shareImg.parentElement.parentElement.scrollTo({
          top: 0,
          behavior: "smooth", // 平滑滚动
        });
      })
      .catch((e) => {
        // console.log(e);
        setLoading(false);
      });
  }, []);

  const handleFileUploadChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const result = event.target.result;
        setBgImgSrc(result);
        setTemplateIndex(2);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleTemplateClick = useCallback((index) => {
    setTemplateIndex(index);
  }, []);

  useEffect(() => {
    if (isQrcodeReady) {
      if (templateIndex === 0) {
        setBgImgSrc("/h.jpg");
      } else if (templateIndex === 1) {
        setBgImgSrc("");
      }
    }
  }, [templateIndex, isQrcodeReady]);

  if (!tx) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okButton={[]}
      cancelButton={[]}
      closeable={true}
    >
      <div className="flex flex-col justify-between overflow-auto rounded border-[1px] border-gray-900/10">
        <Spin spinning={loading}>
          <img
            id="share_img"
            className=""
            alt="share-img"
            src="/photo.svg"
          ></img>
        </Spin>
      </div>
      <div
        id="card"
        className="bg-card z-[-10] flex hidden flex-col justify-between"
      >
        {/* <div id="card" className="flex flex-col justify-between overflow-auto"> */}
        <div className="shrink-0 overflow-hidden">
          <img
            id="bg_img"
            src={bgImgSrc}
            className="max-h-none max-w-none"
            alt="share-panel-bg"
            onLoad={(e) => handlebgImgLoad(e, bgImgSrc)}
            onError={(e) => handlebgImgLoad(e, bgImgSrc)}
          ></img>
        </div>

        <div className="flex-none shrink-0 px-2 pb-2">
          <pre className="text-wrap break-words text-left">{tx.message}</pre>
          <div className="mt-8 text-right text-sm text-gray-900/60">
            {formatTimestamp(tx.timestamp)}
          </div>
          <div className="text-right text-sm text-gray-900/60">
            <span>{t("recordOn")} </span>
            {tx.chain.charAt(0).toUpperCase() + tx.chain.slice(1)}
          </div>
          <div className="items-between mt-8 flex flex-row justify-between border-t pt-7">
            <span className="mb-1 flex items-end text-base">
              {tMeta("title")}
            </span>
            <QRCode
              className="float-right self-end"
              text={getShareURL(tx.chain, tx.hash)}
              onSuccess={handleQRCodeSuccess}
              width={100}
            ></QRCode>
          </div>
        </div>
      </div>
      <small className="mt-2 text-right text-blue-600">{tDetail("save")}</small>
      <div className="mt-2 flex h-14 justify-items-stretch">
        <div className={`h-14 w-14`} onClick={() => handleTemplateClick(0)}>
          <img
            src={"/h.jpg"}
            className="h-full w-full rounded object-cover"
            alt="bg-h"
          ></img>
        </div>
        {/* no img */}
        <div
          className="ml-4 flex h-14 w-14 items-center justify-center rounded border"
          onClick={() => handleTemplateClick(1)}
        >
          <img
            src={"/photo-cross.svg"}
            className="h-7 w-7 rounded object-cover"
            alt="bg"
          ></img>
        </div>
        <div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileUploadChange}
            className="relative ml-4 h-14 w-14 !overflow-hidden rounded border-[1px] border-gray-900/10 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-white after:bg-upload after:bg-[length:28px_28px] after:bg-center after:bg-no-repeat after:text-red-500 after:content-[''] focus:outline-none"
          ></input>
        </div>
      </div>
    </Dialog>
  );
});

export default SharePanel;
