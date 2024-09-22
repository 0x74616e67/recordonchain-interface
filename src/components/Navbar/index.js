import React, { useEffect, useRef, memo, useCallback } from "react";
import { useRouter } from "next/router";

const NavbarComponent = memo(function NavbarComponent({ title = "" }) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/");
    // if (window.history.length > 2) {
    //   router.back();
    // } else {
    //   router.push("/");
    // }
  }, []);

  return (
    <div className="mb-4 text-xl">
      <span
        className="mr-2 text-lg text-blue0 cursor-pointer rotate-180 inline-block"
        onClick={handleClick}
      >
        &#10132;
      </span>
      <span>{title}</span>
    </div>
  );
});

export default NavbarComponent;
