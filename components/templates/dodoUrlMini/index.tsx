"use client";

import styles from "./mainPage.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userDetailImg from "public/assets/userDetails.png";
import instaIcon from "public/icons/insta.svg";
import fbIcon from "public/icons/fb.svg";
import youtubeIcon from "public/icons/youtube.svg";
import snapchatIcon from "public/icons/snapchat.svg";

import linkIcon from "public/assets/link.png";
import socialIcon from "public/assets/social.png";
import headingIcon from "public/assets/heading.png";
import videoIcon from "public/assets/video.png";
import seperatorIcon from "public/assets/seperator.png";

import leftArrow from "public/icons/leftArrow.svg";
import menuIcon from "public/icons/menu.svg";
import curvyLine from "public/assets/curvyLine.svg";
import { Footer, Input } from "@components/atoms";
import { useEffect, useState } from "react";
import Modal from "@components/molecules/Modal";
import { useRouter } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS } from "@utils/constants";

const socialData = [
  { name: "instagram", icon: instaIcon },
  { name: "facebook", icon: fbIcon },
  { name: "youtube", icon: youtubeIcon },
  { name: "snapchat", icon: snapchatIcon },
];

const blocksData = [
  { name: "link", icon: linkIcon, pageType: BLOCKS.LINK },
  { name: "social", icon: socialIcon, pageType: BLOCKS.SOCIAL },
  { name: "video", icon: videoIcon, pageType: BLOCKS.VIDEO },
  {
    name: "seperator",
    icon: headingIcon,
    width: "50%",
    pageType: BLOCKS.HEADING,
  },
  {
    name: "heading",
    icon: seperatorIcon,
    width: "50%",
    pageType: BLOCKS.SEPARATOR,
  },
];

// main-bg-theme, text-color, border-color, card-bg

export default function DodoUrlMini({
  mainBgTheme,
  textColor,
  borderColor,
  cardBg,
  className,
}: any) {

  useEffect(() => {
    let root = document.documentElement;

    borderColor && root.style.setProperty("--border-color", borderColor);
    textColor && root.style.setProperty("--text-color", textColor);
    cardBg && root.style.setProperty("--card-bg", cardBg);
  }, [mainBgTheme, textColor, borderColor, cardBg]);

  return (
    <div
      className={cx(
        "pt-2 flex flex-col justify-center items-center w-full",
        className
      )}
      style={{ background: mainBgTheme }}
    >
      <Image
        height={44}
        width={44}
        src={userDetailImg}
        alt="user profile"
        className="my-4"
      />
      <span className="text-sm clr-text font-black mb-1">Rajveer Singh</span>
      <span className="text-xs clr-text mb-2">
        A small description goes here
      </span>
      <div className="flex flex-row mt-1">
        {socialData.map((data) => {
          return (
            <div
              key={data.icon}
              className="bg-white p-2 mr-3 rounded-lg"
            >
              <Image
                height={11}
                width={11}
                src={data?.icon}
                alt="user profile"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 w-full">
        <div className="clr-card-bg clr-text clr-border flex items-center justify-between mt-4 px-4 py-1 h-8 text-sm rounded-lg w-full">
          <span className="clr-text">link1</span>
        </div>

        <div className="clr-card-bg clr-text clr-border flex items-center justify-between mt-4 px-4 py-1 h-8 text-sm rounded-lg w-full">
          <span className="clr-text">link2</span>
        </div>

        <div className="clr-card-bg clr-text clr-border flex items-center justify-between mt-4 px-4 py-1 h-8 text-sm rounded-lg w-full">
          <span className="clr-text">link3</span>
        </div>

        <div className="clr-card-bg clr-text clr-border flex items-center justify-between mt-4 px-4 py-1 h-8 text-sm rounded-lg w-full">
          <span className="clr-text">link4</span>
        </div>
      </div>
    </div>
  );
}
