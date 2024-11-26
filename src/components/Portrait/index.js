import React, { memo } from "react";
// import Image from "next/image";

const PortraitComponent = memo(function PortraitComponent({
  avatar = "",
  name = "",
  identity = "",
  info = "",
}) {
  return (
    <div className="mb-4 mt-3 rounded border-[1px] border-[#E2E8F0] p-3 text-base">
      <div className="flex">
        {/* <Image
          src={avatar}
          width={42}
          height={42}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "4px",
          }}
          alt="avatar"
        ></Image> */}
        <div className="ml-0 flex flex-col">
          <span className="font-bold">{name}</span>
          <span className="text-sm text-gray0">{identity}</span>
        </div>
      </div>
      <div className="mt-2">{info}</div>
    </div>
  );
});

export default PortraitComponent;
