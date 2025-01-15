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
import { useParams, useRouter } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS } from "@utils/constants";
import DodoUrl from "@components/templates/dodoUrl";
import { getLinkList, getUserDetails } from "api";



// main-bg-theme, text-color, border-color, card-bg

export default function mainPage({
  mainBgTheme,
  textColor,
  borderColor,
  cardBg,
}: any) {


  return <DodoUrl />;
}
