"use client";
import React, { useRef, useState } from "react";
import cx from "classnames";
import { InputProps } from "./types";
import { AlertCircle } from "lucide-react";

import styles from "./styles.module.css";
import Image from "next/image";
import AutoTooltip from "../AutoTooltip";
import { isEmpty } from "@utils/index";

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  ref?: React.RefObject<HTMLInputElement>;
  showClearButton?: boolean;
  icon?: any;
  onIconClick?: () => void;
  tooltipText?: string;
}

const Input: React.FC<EnhancedInputProps> = ({
  className,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  ref,
  showClearButton = true,
  icon,
  onIconClick,
  tooltipText
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleIconClick = () => {
    setShowTooltip((prev) => !prev);
  };

  const handleClearClick = () => {
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        className={cx(
          className,
          "bg-theme-2 px-4 py-1 h-12 text-base rounded-lg w-full border",
          {
            "border-red-500": error,
            "border-gray-300": !error,
          },
          "text-ellipsis"
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        style={{ paddingRight: showClearButton ? '3.5rem' : '1.5rem' }}
      />

      <div className="absolute-center">
        {showClearButton && value && (
          <button
            type="button"
            className={cx("absolute inset-y-0 flex items-center pr-3 focus:outline-none", {
              "right-8": icon,
              "right-1": !icon
            })}
            onClick={handleClearClick}
          >
            <span className="text-gray-500 cursor-pointer">✕</span>
          </button>
        )}

        {icon && (
          tooltipText ? (<>
            <AutoTooltip tooltipText={tooltipText}>
              <Image
                src={icon}
                alt="paste"
                width={28}
                height={28}
                onClick={onIconClick}
                className="absolute right-2 p-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </AutoTooltip>
          </>) :
            <Image
              src={icon}
              alt="paste"
              width={28}
              height={28}
              onClick={onIconClick}
              className="absolute right-2 p-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />)}
      </div>

      {error && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            type="button"
            className="relative group focus:outline-none"
            onClick={handleIconClick}
          >
            <AlertCircle
              size={20}
              className="text-red-500 cursor-pointer"
            />
            {showTooltip && (
              <div className="absolute z-10 w-max max-w-xs p-2 mt-1 text-xs text-white bg-red-500 rounded-lg shadow-lg -top-10 right-0 animate-fade-in">
                {error}
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
