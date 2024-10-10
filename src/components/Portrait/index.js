import React, { memo } from "react";
// import Image from "next/image";

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
          width={42}
          height={42}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "4px",
          }}
          alt="avatar"
        ></Image> */}
        <div className="flex flex-col ml-0">
          <span className="font-bold">{name}</span>
          <span className="text-gray0 text-sm">{identity}</span>
        </div>
      </div>
      <div className="mt-2">{info}</div>
    </div>
  );
});

export default PortraitComponent;
