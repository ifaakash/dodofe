import React from "react";
import PropTypes from "prop-types";
import styles from "./ctaSection.module.css"; // Optional CSS for styling

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import cx from "classnames";
import Image from "next/image";

import gotoIcon from "public/icons/gotoIcon.svg";
import profileIcon from "public/assets/userProfile.png";
import { isEmpty } from "@utils/index";

const CtaSection = ({
  title = "DodoPage",
  description = "Create dynamic links in your bio that stands out",
  buttonLabel = "Create now",
  onClick = () => { },
  onButtonClick = () => { },
  onImageClick = () => { },
  img = profileIcon,
  imgSize = -1,
  floatingPosition = "bottom-right", // 'top-right' or 'bottom-right'
  bgColor = "#fdfbff",
  textColor = "#000",
  buttonBgColor = "#00c853",
  buttonTextColor = "#fdfbff",
  showProfileImage = false,
  profileImageURL = "",
}) => {
  if (!title) {
    return (
      <div className={styles.floatingSection} style={{ color: "#000" }}>
        <div className={styles.firstPart} style={{ backgroundColor: bgColor }}>
          <Skeleton height={28} width={"60%"} style={{ borderRadius: "8px" }} />
          <Skeleton height={18} width={"50%"} style={{ borderRadius: "8px" }} />
        </div>
        <div className={styles.secondThirdContainer}>
          <div
            className={cx(
              styles.floatingSectionButton,
              styles.secondPart,
              floatingPosition === "top-right"
                ? styles.topRight
                : styles.bottomRight
            )}
            style={{ minHeight: "38px", maxHeight: "100px" }}
          >
            <Skeleton height={38} width={128} borderRadius={12} />
          </div>
          <div
            className={styles.curvedTriangle}
            style={{ backgroundColor: bgColor }}
          ></div>
          <div
            className={styles.thirdPart}
            style={{ backgroundColor: bgColor }}
          >
            <Skeleton circle height={32} width={32} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.floatingSection}
      style={{ color: textColor }}
      onClick={onClick}
    >
      <div className={styles.firstPart} style={{ backgroundColor: bgColor }}>
        <div>
          {showProfileImage && (
            <div className="flex items-center justify-center">
              <Image
                src={profileImageURL ? profileImageURL : profileIcon}
                alt="profile"
                height={52}
                width={52}
                className="rounded-full aspect-square"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold mb-1">{title}</h1>
          <p className="text-base font-light leading-[20px]">{description}</p>
        </div>
      </div>
      <div className={styles.secondThirdContainer}>
        <div
          className={cx(
            styles.floatingSectionButton,
            styles.secondPart,
            floatingPosition === "top-right"
              ? styles.topRight
              : styles.bottomRight
          )}
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
            minHeight: "38px",
            maxHeight: "40px",
            padding: "0px 20px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
        >
          <span className="text-xs font-normal whitespace-nowrap">{buttonLabel}</span>

          {buttonLabel !== "Coming soon..." && (
            <Image
              height={12}
              width={12}
              src={gotoIcon}
              alt="user"
              className="ml-2"
            />
          )}
        </div>
        <div
          className={styles.curvedTriangle}
          style={{ backgroundColor: bgColor }}
        ></div>

        <div className={styles.thirdPart} style={{ backgroundColor: bgColor }}>
          <div onClick={onImageClick}>
            <Image
              height={imgSize > 0 ? imgSize : 84}
              width={imgSize > 0 ? imgSize : 84}
              src={img}
              alt="user"
              className="mb-2 mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

CtaSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  floatingPosition: PropTypes.oneOf(["top-right", "bottom-right"]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  buttonBgColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
};

export default CtaSection;
