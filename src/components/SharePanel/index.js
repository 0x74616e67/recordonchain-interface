import React, { useEffect, useRef, useCallback, useState } from "react";
import { formatTimestamp, getTxURL, getShareURL } from "@/utils";
import QRCode from "@/components/QRCode";
import html2canvas from "html2canvas";
import Dialog from "@/components/Dialog";
import { useTranslations } from "use-intl";

const imgs = ["/h.jpg", "/v.jpg"];

const SharePanel = React.memo(function SharePanel({
  tx = null,
  open = false,
  onCancel = () => {},
  onOk = () => {},
}) {
  const t = useTranslations("Common");
  // 为了防止 bg_img 加载完成后 qrcode 还未渲染完，导致 qrcode 缺失，此处优先生成 qrcode，成功后再生成 bg_img
  const [bgImgSrc, setBgImgSrc] = useState("");

  const handleQRCodeSuccess = useCallback(() => {
    // 1. qrcode 生成成功后，更新 bg_img 图片
    setBgImgSrc(imgs[0]);
  }, []);

  const handleGalleryClick = useCallback((index) => {
    setBgImgSrc(imgs[index]);
  }, []);

  // 2. bg_img onLoad 完成后，再生成 share_img
  // TODO, 这个可能会有点慢，后面可以放一个 loading 的效果
  const handlebgImgLoad = useCallback((e) => {
    // 3. 首先需要手动计算 id=bg_img 的 <img> 标签样式，使其填满整个父级元素，且居中显示
    const parentWidth = document.getElementById("share_img").clientWidth;
    const width = e.target.naturalWidth;
    const height = e.target.naturalHeight;
    const style = {};

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

    html2canvas(document.getElementById("card"), {
      onclone(dom, element) {
        element.className = element.className.replace("hidden", "");

        // 更新 id=bg_img 的 <img> 标签样式
        element.childNodes[0].childNodes[0].style.width = style.width;
        element.childNodes[0].childNodes[0].style.height = style.height;
        element.childNodes[0].childNodes[0].style.marginTop = style.marginTop;
        element.childNodes[0].childNodes[0].style.marginBottom =
          style.marginBottom;
        element.childNodes[0].childNodes[0].style.marginLeft = style.marginLeft;
        element.childNodes[0].childNodes[0].style.marginRight =
          style.marginRight;

        return element;
      },
    }).then(function (canvas) {
      // 使用toDataURL方法将canvas转换为数据URL
      var dataURL = canvas.toDataURL("image/png"); // 也可以使用'image/jpeg'
      const shareImg = document.getElementById("share_img");
      shareImg.src = dataURL;
      shareImg.parentElement.scrollTo({
        top: 0,
        behavior: "smooth", // 平滑滚动
      });
    });
  }, []);

  const handleFileUploadChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const result = event.target.result;
        setBgImgSrc(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

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
      <div className="flex flex-col justify-between overflow-auto">
        <img id="share_img" className="" alt="share-img" src="/photo.svg"></img>
      </div>
      {/* <div id="card" className="flex flex-col justify-between overflow-auto"> */}
      <div id="card" className="z-[-10] flex hidden flex-col justify-between">
        <div className="shrink-0 overflow-hidden">
          <img
            id="bg_img"
            src={bgImgSrc}
            className="max-h-none max-w-none"
            alt="share-panel-bg"
            onLoad={handlebgImgLoad}
          ></img>
        </div>
        <div className="flex-none shrink-0 border-[1px] border-t-0 border-gray-200 p-2">
          <div className="text-wrap break-words text-left">{tx.message}</div>
          <div className="mt-4 text-right">{formatTimestamp(tx.timestamp)}</div>
          <QRCode
            className="float-right mt-4 self-end border-[1px] border-gray-200"
            text={getShareURL(tx.chain, tx.hash)}
            onSuccess={handleQRCodeSuccess}
            width={100}
          ></QRCode>
        </div>
      </div>
      <div className="mt-4 flex h-14 justify-items-stretch">
        {imgs.map((i, index) => (
          <div
            className={`h-14 w-14 ${index > 0 ? "ml-4" : ""}`}
            onClick={() => handleGalleryClick(index)}
            key={i}
          >
            <img src={i} className="h-full w-full object-cover" alt="bg"></img>
          </div>
        ))}
        <div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileUploadChange}
            className="relative ml-4 h-14 w-14 !overflow-hidden border-[1px] border-gray-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-white after:bg-upload after:bg-[length:28px_28px] after:bg-center after:bg-no-repeat after:text-red-500 after:content-[''] focus:outline-none"
          ></input>
        </div>
      </div>
    </Dialog>
  );
});

export default SharePanel;
