import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import cx from "classnames";
import styles from "./button.module.css";

interface Button2Props {
  variant?: "primary" | "secondary" | "disabled";
  size: "small" | "large" | "tertiary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NewButton = ({
  variant,
  size,
  children,
  onClick,
  className,
}: Button2Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (variant !== "disabled" && onClick) {
      setIsLoading(true);
      onClick();
      setTimeout(() => {
        setIsLoading(false);
      }, 8000); // 8 seconds
    }
  };

  const getButtonSizeClass = () => {
    switch (size) {
      case "small":
        return "text-sm py-2 px-4 rounded-full ";
      case "large":
        return "text-lg py-3 px-6 w-full rounded-xl";
      case "tertiary":
        return "";
      default:
        return "text-sm py-2 px-4";
    }
  };

  const getButtonVariantClass = () => {
    switch (variant) {
      case "primary":
        return "bg-brandPrimary text-white hover:bg-brandPrimaryDark border-2 border-black  active:translate-y-1 active:translate-x-1";
      case "secondary":
        return "bg-gray-200 text-gray-800 hover:bg-gray-300 border-2 border-black active:translate-y-1 active:translate-x-1";
      case "disabled":
        return "bg-[#E2E4E9] text-[#979EAD] cursor-not-allowed rounded-xl";
      default:
        return "";
    }
  };

  const isDisabled = variant === "disabled";

  return (
    <div className={`relative w-fit ${className}`}>
      {!isDisabled && size === "large" && (
        <div
          className={`absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl z-0 `}
        ></div>
      )}

      {!isDisabled && size === "small" && (
        <div
          className={`absolute inset-0 bg-black w-full rounded-full translate-x-1 translate-y-1 -z-10`}
        ></div>
      )}

      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`relative z-20 flex items-center justify-center transition-all font-semibold ${getButtonSizeClass()} ${getButtonVariantClass()}`}
      >
        <span>{children}</span>
        {isLoading ? (
          <div className={cx("ml-2 h-5 w-5", styles.loader)}></div>
        ) : (
          <ChevronRight className={`ml-2 h-5 w-5 ${size === "tertiary" && "text-brandPrimary"}`} strokeWidth={3} />
        )
        }
      </button >
    </div >
  );
};

export default NewButton;

