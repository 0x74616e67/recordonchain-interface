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
        className="mr-2 inline-block rotate-180 cursor-pointer text-lg text-blue-600 hover:text-blue-500"
        onClick={handleClick}
      >
        &#10132;
      </span>
      <span>{title}</span>
    </div>
  );
});

export default NavbarComponent;
