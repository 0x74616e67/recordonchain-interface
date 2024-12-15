import React, { useEffect, useRef, memo, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const SpinComponent = memo(function SpinComponent({
  spinning = false,
  children,
  className,
}) {
  return (
    <>
      <div className={`${className} ${spinning ? "blur-sm" : ""}`}>
        {children}
      </div>
      {spinning ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
          <svg
            className="h-10 w-10 animate-spin text-blue-600 hover:text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : null}
    </>
  );
});

export default SpinComponent;
