"use client";
import React, { useRef, useState } from "react";
import cx from "classnames";
import { InputProps } from "./types";
import { AlertCircle } from "lucide-react";

import styles from "./styles.module.css";

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  ref?: React.RefObject<HTMLInputElement>;
}

const Input: React.FC<EnhancedInputProps> = ({
  className,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  ref
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleIconClick = () => {
    setShowTooltip((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        className={cx(
          className,
          "bg-theme-2 px-4 py-1 h-12 text-sm rounded-lg w-full border",
          {
            "border-red-500": error,
            "border-gray-300": !error,
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />

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
