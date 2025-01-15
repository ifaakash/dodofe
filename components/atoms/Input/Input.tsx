import cx from "classnames";
import React, { useRef } from "react";

import { InputProps } from "./types";

import styles from "./styles.module.css";

const Input: React.FC<any> = ({
  className,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <input
      className={cx(
        className,
        "bg-theme-2 my-4 px-4 py-1 h-12 text-sm rounded-lg w-full"
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};
export default Input;
