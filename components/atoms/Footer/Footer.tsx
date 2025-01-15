import React, { useEffect, useState } from "react";
import cx from "classnames";
import { FooterProps } from "./types";
import Button from "../Button";

const Footer: React.FC<FooterProps> = ({
  topContent,
  children,
  variant,
  buttonVariant,
  primaryAction,
  secondaryAction,
  primaryActionText,
  secondaryActionText,
  disablePrimaryButton,
  disableSecondaryButton,
  className,
  btnColor,
  showShadow,
  loader,
  primaryBtnEndIcon,
  unitTestLabel,
}) => {
  const getButtons = () => {
    const buttonColorClass = btnColor ? btnColor : "theme-1";
    switch (variant) {
      case "default":
        return primaryActionText ? (
          <Button
            className="w-full"
            variant={buttonVariant ? buttonVariant : undefined}
            size="extra-large"
            onClick={primaryAction}
            disabled={disablePrimaryButton}
            text={primaryActionText}
            btnColor={buttonColorClass}
            loader={loader}
            endIcon={primaryBtnEndIcon}
            unitTestLabel={`footer-primary-btn-${unitTestLabel}`}
          />
        ) : null;
      case "horizontal":
        return (
          <div className="flex width-100">
            {secondaryActionText && (
              <Button
                variant={buttonVariant ? buttonVariant : "outline"}
                size="extra-large"
                className="width-50 mr2"
                onClick={secondaryAction}
                disabled={disableSecondaryButton}
                btnColor={buttonColorClass}
                text={secondaryActionText}
                loader={loader}
                unitTestLabel={`footer-secondary-btn-${unitTestLabel}`}
              />
            )}
            {primaryActionText && (
              <Button
                size="extra-large"
                className="width-50"
                variant={buttonVariant ? buttonVariant : undefined}
                onClick={primaryAction}
                disabled={disablePrimaryButton}
                btnColor={buttonColorClass}
                text={primaryActionText}
                loader={loader}
                unitTestLabel={`footer-primary-btn-${unitTestLabel}`}
              />
            )}
          </div>
        );
      case "vertical":
        return (
          <div className="flex flex-column width-100">
            {primaryActionText && (
              <Button
                size="extra-large"
                className="width-full"
                variant={buttonVariant ? buttonVariant : undefined}
                onClick={primaryAction}
                disabled={disablePrimaryButton}
                text={primaryActionText}
                btnColor={buttonColorClass}
                loader={loader}
                unitTestLabel={`footer-primary-btn-${unitTestLabel}`}
              />
            )}
            {secondaryActionText && (
              <Button
                size="extra-large"
                className="`width-100 mt1"
                variant={buttonVariant ? buttonVariant : "no-outline"}
                onClick={secondaryAction}
                disabled={disableSecondaryButton}
                text={secondaryActionText}
                btnColor={buttonColorClass}
                loader={loader}
                unitTestLabel={`footer-secondary-btn-${unitTestLabel}`}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      data-unit-test-label={`footer-${unitTestLabel}`}
      className={cx("", className)}
      style={{ zIndex: 9 }}
    >
      <div
        className={cx(
          "absolute bottom-2 flex flex-col box-border py-2 top-index",
          showShadow && "footer-shadow"
        )}
        style={{ width: "calc(100% - 35px)" }}
      >
        {topContent}
        {getButtons()}
        {children}
      </div>
    </div>
  );
};
export default Footer;
