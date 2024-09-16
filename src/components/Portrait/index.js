import React, { useEffect, useRef, memo, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const PortraitComponent = memo(function PortraitComponent({
  avatar = "",
  name = "",
  identity = "",
  info = "",
}) {
  return (
    <div className="mb-4 text-base border-[#E2E8F0] border-[1px] p-3 mt-3 rounded">
      <div className="flex">
        {/* <Image
          src={avatar}
          width={40}
          height={40}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "40px",
          }}
          alt="avatar"
        ></Image> */}
        <div className="flex flex-row">
          <span className="font-bold">{name}</span>
          <span className="ml-2 text-gray0">{identity}</span>
        </div>
      </div>
      <div className="mt-2">{info}</div>
    </div>
  );
});

export default PortraitComponent;
