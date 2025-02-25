import React from "react";
import { ChevronRight } from "lucide-react";

interface NewButtonProps {
  variant: "primary" | "secondary" | "disabled";
  size: "small" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const NewButton = ({
  variant,
  size,
  children,
  onClick,
  className = "",
  disabled = false,
}: NewButtonProps) => {
  const getButtonSizeClass = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "large":
        return "p-[10px] w-full rounded-xl font-semibold";
      default:
        return "text-sm";
    }
  };

  const getButtonVariantClass = () => {
    if (disabled) {
      return "bg-[#E2E4E9] text-[#979EAD] cursor-not-allowed";
    }

    switch (variant) {
      case "primary":
        return "relative z-20 bg-brandPrimary text-white active:top-1 active:left-1";
      case "secondary":
        return "border-[1px] border-brandPrimary";
      default:
        return "";
    }
  };

  const getChevronColor = () => {
    if (disabled) return "text-[#979EAD]";
    return variant === "primary" ? "text-white" : "text-brandPrimary";
  };

  return (
    <div className={`relative w-full ${className}`} onClick={disabled ? undefined : onClick}>
      {variant === "primary" && size === "large" && !disabled && (
        <div className="absolute inset-0 bg-black z-10 w-full h-full bottom-11 top-1 left-1 rounded-xl"></div>
      )}
      <button
        disabled={disabled}
        className={`${getButtonSizeClass()} ${getButtonVariantClass()} flex justify-center gap-1 items-center`}
        aria-disabled={disabled}
      >
        <div>{children}</div>
        <div className={`px-1 py-0.5 ${getChevronColor()}`}>
          <ChevronRight size={20} />
        </div>
      </button>
    </div>
  );
};

export default NewButton;
