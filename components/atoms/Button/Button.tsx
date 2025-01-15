import React, { useCallback } from "react";

import cx from "classnames";

import { ButtonProps } from "./types";
import SVGIcon from "../SVGIcon/SVGIcon";
import Image from "next/image";
import { ColorConstants } from "utils/constants";

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  disabled,
  className,
  rounded,
  onClick,
  btnColor,
  size,
  btnSize,
  startIcon,
  endIcon,
  endIconClass,
  color,
  loader = false,
  unitTestLabel,
  loaderClass,
  type = 'button',
  ...others
}) => {
  const getButtonColorClass = () => {
    if (disabled) {
      return "bg-light-gray-2 clr-white";
    }
    switch (btnColor) {
      case ColorConstants.THEME1:
        return "bg-theme-3 clr-white";
      case ColorConstants.THEME2:
        return "bg-theme-2 clr-white";
      case ColorConstants.THEME3:
        return "bg-theme-3 clr-black";
      case ColorConstants.LIGHT_THEME:
        return "bg-theme-2 clr-theme-1";
      case ColorConstants.SECONDARY_PINK:
        return "bg-dark-secondary-pink clr-white";
      case ColorConstants.PRIMARY_BLUE:
        return "bg-primary-blue clr-theme-1";
      case ColorConstants.SECONDARY_PURPLE:
        return "bg-dark-secondary-purple clr-white";
      case ColorConstants.SUCCESS:
        return "bg-theme-3 clr-white";
      case ColorConstants.DANGER:
        return "bg-red clr-white";
      case ColorConstants.WARNING:
        return "bg-orange clr-white";
      case ColorConstants.WHITE:
        return "bg-white theme-3 border";
      default:
        return "bg-light-green clr-darker-green";
    }
  };

  const getVariantSuffix = () => {
    switch (btnColor) {
      case "theme-1":
        return "theme-1";
      case "theme-2":
        return "theme-2";
      case "theme-3":
        return "theme-3";
      case "secondary-pink":
        return "secondary-pink";
      case "secondary-purple":
        return "secondary-purple";
      case "success":
        return "success";
      case "danger":
        return "danger";
      case "warning":
        return "warning";
      case "white":
        return "white";
      default:
        return "theme";
    }
  };

  const getSize = useCallback(
    (size: string) => {
      switch (size) {
        case "extraa-small":
          return "fs-11";
        case "small":
          return "fs-12";
        case "medium":
          return "fs-14";
        case "large":
          return "fs-16";
        case "extra-large":
          return "fs-17";
        default:
          return "fs-16";
      }
    },
    [size]
  );

  const getDisabledTextColorClass = () => {
    if (variant === "outline") return "clr-disabled-imp";
    return "clr-white-imp";
  };

  return (
    <button
      data-unit-test-label={`button-${unitTestLabel}`}
      type={type}
      disabled={disabled}
      className={cx(
        "theme-btn clicking-animation rounded-lg font-bold p-5",
        rounded && "rounded",
        variant && `variant-${variant}-${getVariantSuffix()}`,
        disabled && `disabled ${getDisabledTextColorClass()}`,
        getButtonColorClass(),
        getSize(size || ""),
        btnSize && `btn-${btnSize}`,
        className
      )}
      {...others}
      onClick={loader ? () => undefined : onClick}
      style={{ backgroundColor: `${color}` }}
    >
      <div className="flex items-center justify-center">
        <>
          {startIcon && (
            <Image
              height={16}
              width={16}
              src={startIcon}
              alt="start icon"
              className="mr-2 icon--theme-2-color"
            />
          )}
          {text}
          {endIcon && (
            <Image
              height={16}
              width={16}
              src={endIcon}
              alt="end icon"
              className={cx("ml-2", endIconClass)} />
          )}
        </>
      </div>
    </button>
  );
};

export default Button;
