'use client'
import cx from "classnames";
import { Button, FlexBox } from "@components/atoms";
import React, { useRef } from "react";
import { X } from "lucide-react";

import { InputProps } from "./types";

import styles from "./styles.module.css";

const UserInput: React.FC<InputProps> = ({
  className,
  type,
  inputRef,
  readOnly,
  isValid,
  placeholder,
  showError,
  showInfo,
  errorMsg,
  infoMsg,
  hasLabel,
  value,
  onChange,
  onBlur,
  onKeyDown,
  pattern,
  maxLength,
  disabled,
  name,
  others,
  max,
  labelClassname,
  unitTestLabel,
  rightButton,
  rightButtonDisabled,
  rightButtonAction,
}) => {
  const defaultRef: any = useRef(null);

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: "", name } } as any);
    }
  };

  return (
    <div
      className={cx(
        "my-4 w-full"
      )}
      data-unit-test-label={`input-${unitTestLabel}`}
    >
      <div className={cx("flex border-bottom relative", styles.inputContainer)}>
        <input
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          {...others}
          name={name}
          ref={inputRef || defaultRef}
          style={readOnly ? { pointerEvents: "none" } : {}}
          type={type}
          value={value}
          readOnly={readOnly}
          className={cx(
            "font-medium border-none py-2 w-full pr-8",
            styles.input__element,
            {
              [styles.input__element_valid]: isValid && isValid !== null,
              [styles.input__element_invalid]:
                isValid === false || showError === true,
            },
            className
          )}
          onChange={onChange}
          pattern={pattern || ""}
          maxLength={maxLength}
          disabled={disabled}
          max={max || 500}
        />
        {value && !disabled && (
          <X
            size={20}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={handleClear}
          />
        )}
        {rightButton && (
          <Button
            disabled={rightButtonDisabled}
            onClick={rightButtonAction}
            className="my-2 ml-2"
            text={"Check"}
            size="small"
            btnColor="theme-1"
          />
        )}
        {hasLabel && value === '' && placeholder && (
          <p
            className={cx(
              disabled && "clr-disabled",
              value && "clr-theme-1",
              "font-light text-base",
              styles.inputLabel,
              labelClassname
            )}
            onClick={() => {
              if (inputRef) inputRef.current.focus();
              else defaultRef.current.focus();
            }}
          >
            {placeholder}
          </p>
        )}
      </div>

      {showError && (
        <FlexBox
          alignCenter
          className={cx(
            "input--error up-to-down-scale fs-11 animated fadeInDown mr-t-2 p-10 br-9",
            "bg-white clr-red"
          )}
        >
          <p>{errorMsg}</p>
        </FlexBox>
      )}
      {showInfo && (
        <FlexBox
          alignCenter
          className={cx(
            "fs-11 animated fadeInDown mt-2 p-10 bg-white clr-theme-1",
            showError && "mt-15"
          )}
        >
          <p>{infoMsg}</p>
        </FlexBox>
      )}
    </div>
  );
};

export default UserInput;
