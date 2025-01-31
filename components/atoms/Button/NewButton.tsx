import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface NewButtonProps {
  variant: 'primary' | 'secondary' | 'disabled';
  size: 'small' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

const NewButton = ({ variant, size, children, onClick }: NewButtonProps) => {
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
    switch (variant) {
      case "primary":
        return "relative z-20 bg-brandPrimary text-white active:top-1 active:left-1";
      case "secondary":
        return "border-[1px] border-brandPrimary  ";
      case "disabled":
        return "bg-[#E2E4E9] text-[#979EAD] cursor-not-allowed";
      default:
        return "";
    }
  };

  const getChecvronColor = () => {
    switch (variant) {
      case "primary":
        return "text-white";
      case "secondary":
        return "text-brandPrimary";
      case "disabled":
        return "text-[#979EAD]";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full" onClick={onClick}>
      {variant === "primary" && size === "large" && (
        <div className="absolute inset-0 bg-black z-10 w-full h-full bottom-11 top-1 left-1 rounded-xl"></div>
      )}
      <button
        className={`${getButtonSizeClass()} ${getButtonVariantClass()} flex justify-center gap-1 items-center`}
      >
        <div>{children}</div>
        <div className={`px-1 py-0.5 ${getChecvronColor()} `}>
          <ChevronRight size={20} />
        </div>
      </button>
    </div>
  );
};

export default NewButton;
