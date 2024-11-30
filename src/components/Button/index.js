import { memo } from "react";

const bgColors = {
  primary: "bg-blue-600 hover:bg-blue-500",
  secondary: "bg-gray-400/60 hover:bg-gray-400/40",
};

const Button = memo(function Button({
  children,
  disabled,
  onClick,
  className,
  type = "primary", // primary, secondary
  ...others
}) {
  const disabledClassName =
    "disabled disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} inline-flex w-full justify-center rounded p-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${disabled ? disabledClassName : ""} ${bgColors[type]} `}
      disabled={disabled}
      {...others}
    >
      {children}
    </button>
  );
});

export default Button;
