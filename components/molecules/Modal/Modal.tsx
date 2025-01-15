import cx from "classnames";
import React, { useEffect, useState } from "react";
import { ModalProps, StyleType } from "./types";
import cross from "public/icons/cross.svg";
import { Size } from "utils/constants";
import Image from "next/image";

const Dialog = (props: any) => {
  const [pullDownStart, setPullDownStart] = useState(0);
  const [pullDownMovement, setPullDownMovement] = useState(0);
  const animation =
    (props.animationType === "enter"
      ? props.enterAnimation
      : props.leaveAnimation) || props.animation;
  const className = `rounded-b-none modal-inner-content modal-${animation}-${
    props.animationType
  } ${props?.bottomSheet ? "bottom-sheet" : "dialog"}`;
  const { width, duration, customStyles, fullVhHeight } = props;
  const style = {
    width: width + "%",
    height: "auto",
    animationDuration: duration + "ms",
    WebkitAnimationDuration: duration + "ms",
  };
  const mergedStyles = { ...style, ...customStyles };
  const { center, rectangleVisible } = props;
  useEffect(() => {
    if (props.visible) {
      setPullDownStart(0);
      setPullDownMovement(0);
    }
  }, [props.visible]);

  const getStyle = () => {
    const styleObj: any = {};
    if (!center) {
      styleObj["marginBottom"] = `-${pullDownMovement}px`;
    } else {
      styleObj["bottom"] = "unset";
    }
    if (fullVhHeight) {
      styleObj["maxHeight"] = "100vh";
    }
    return styleObj;
  };

  return (
    <div
      className={cx(
        "modal-dialog",
        props?.bottomSheet ? "overflow-hidden p-0" : "overflow-y-auto p-3"
      )}
      style={getStyle()}
      data-unit-test-label={`modal-${props.unitTestLabel}`}
    >
      {props?.showOuterCloseIcon && (
        <span
          style={{ float: "right" }}
          onClick={props?.onCloseIconClick}
          className="flex close-icon mr-6 mb-3"
          data-unit-test-label={`modal-close-${props.unitTestLabel}`}
          data-e2e-test-label="modal-close-icon"
        >
          <Image
            height={16}
            width={16}
            src={cross}
            alt="user profile"
            className="my-4"
          />
        </span>
      )}
      <div
        style={mergedStyles}
        className={className}
        onTouchStart={(evt) => {
          if (center) {
            return;
          }
          props.isPullable && setPullDownStart(evt.touches[0].clientY);
        }}
        onTouchMove={(evt) => {
          if (center) {
            return;
          }
          const scrollY = evt.touches[0].clientY;
          const diffInScrollY = scrollY - pullDownStart;
          if (props.isPullable) {
            setPullDownMovement(diffInScrollY);
            props.pullDownMovementCallback &&
              props.pullDownMovementCallback(pullDownMovement);
          }
        }}
        onTouchEnd={() => {
          if (center) {
            return;
          }
          if (props.isPullable) {
            if (pullDownMovement > 150) props.onClick();
            else {
              setPullDownStart(0);
              setPullDownMovement(0);
            }
          }
        }}
      >
        {props?.showCloseIcon && (
          <span
            onClick={props?.onCloseIconClick}
            className="flex close-icon m-1 mb-3"
            data-unit-test-label={`modal-close-${props.unitTestLabel}`}
            data-e2e-test-label="modal-close-icon"
          >
            <Image
              height={16}
              width={16}
              src={cross}
              alt="user profile"
              className="my-4"
            />
          </span>
        )}
        {props.modalHeader && (
          <div className="flex justify-center">
            <div>{props.headerIcon}</div>
            <p className={cx(props.modalHeaderClass, "font-semibold")}>
              {props.modalHeader}
            </p>
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  showMask = true,
  className,
  children,
  isPullable = true,
  modalHeader,
  modalHeaderClass = "",
  showCloseIcon,
  isBackgroundBlur,
  onCloseIconClick,
  headerIcon,
  unitTestLabel,
  center,
  rectangleVisible = true,
  showOuterCloseIcon = false,
  bottomSheet = false,
  disableBackdropClick = false,
  customStyles,
  fullVhHeight,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [animationType, setAnimationType] = useState("leave");
  const [pullDownMovement, setPullDownMovement] = useState(5);

  useEffect(() => {
    visible && enter();
    return () => {
      leave();
    };
  });

  useEffect(() => {
    visible ? enter() : leave();
  }, [visible]);

  const enter = () => {
    setIsShow(true);
    setAnimationType("enter");
    setPullDownMovement(4);
    try {
      if (document.getElementById("screen-content-scroll"))
        document.getElementById("screen-content-scroll")!.style.overflow =
          "hidden";
    } catch (err) {
      console.log(err);
    }
  };

  const leave = () => {
    setAnimationType("leave");
    try {
      if (document.getElementById("screen-content-scroll"))
        document.getElementById("screen-content-scroll")!.style.overflow =
          "auto";
    } catch (err) {
      console.log(err);
    }
  };

  const style: StyleType = {
    display: isShow ? "" : "none",
    animationDuration: 300 + "ms",
    WebkitAnimationDuration: 300 + "ms",
  };

  const animationEnd = () => {
    if (animationType === "leave") {
      setIsShow(false);
    }
  };
  const mask = showMask ? (
    <div
      className={cx("modal-mask", `back-drop-${pullDownMovement}`)}
      onClick={
        !disableBackdropClick
          ? onClose ?? onCloseIconClick
          : () => {
              //
            }
      }
    />
  ) : null;

  return (
    <div
      style={{
        backdropFilter: `blur(${isBackgroundBlur ? pullDownMovement : 0}px)`,
        ...style,
      }}
      className={cx(
        "modal modal-fade-" + animationType + " " + className,
        center && "content-center"
      )}
      onAnimationEnd={animationEnd}
      tabIndex={-1}
    >
      {mask}
      <Dialog
        center={center}
        rectangleVisible={rectangleVisible}
        animation={"slideUp"}
        animationType={animationType}
        duration={300}
        width={100}
        visible={visible}
        isPullable={isPullable}
        modalHeader={modalHeader}
        onClick={onClose ?? onCloseIconClick}
        pullDownMovementCallback={(pullDownMovement: number) => {
          setPullDownMovement(
            4 - pullDownMovement / 70 > 4 ? 4 : 4 - pullDownMovement / 70
          );
        }}
        modalHeaderClass={modalHeaderClass}
        showCloseIcon={showCloseIcon}
        onCloseIconClick={onCloseIconClick}
        headerIcon={headerIcon}
        unitTestLabel={unitTestLabel}
        showOuterCloseIcon={showOuterCloseIcon}
        customStyles={customStyles}
        fullVhHeight={fullVhHeight}
        bottomSheet={bottomSheet}
      >
        {children}
      </Dialog>
    </div>
  );
};

export default Modal;
