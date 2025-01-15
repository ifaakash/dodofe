"use client";

import styles from "./home.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userProfileImg from "public/assets/userProfile.png";
import noUserDp from "public/assets/noUserDp.png";
import footerImg from "public/assets/footerImg.png";
import engagementCalc from "public/assets/engagementCalc.png";
import priceCalc from "public/assets/priceCalc.png";
import copy from "public/icons/copy.svg";
import sideBarIcon from "public/icons/sideBarIcon.svg";
import otherFeatures from "public/assets/otherFeatures.png";

import { useRouter } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useEffect, useState } from "react";
import Screen from "@components/molecules/Screen";
import { createUserBlock, getUserBlocks, getUserDetails } from "api";
import { loadState } from "@utils/localStorage";
import { isEmpty } from "@utils/index";
import { toast } from "react-toastify";
import { sidebarUI } from "@utils/uiUtils";

export default function Home() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({} as any);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {

    getUserDetails(userId).then((res) => {
      setUserDetails(res);
    })
  }, [])

  const gotoLinksPage = () => {
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

    if (isEmpty(userDetails?.socialLinks)) {
      router.push(ROUTE_CONSTANTS.ADD_STUFF + `?pageType=${BLOCKS.SOCIAL}&userId=${userId}`);

      return;
    }

    router.push(ROUTE_CONSTANTS.LINKS + `?userId=${userId}`, { scroll: false });
  };

  const getNewCardUI = () => {
    return (
      <div
        className={cx(
          "card px-4 py-1 flex items-center flex-col",
          styles.cardDimensions
        )}
      >
        <Image
          height={180}
          width={180}
          src={userProfileImg}
          alt="user profile"
          className="mb-4"
        />
        <span className="text-lg clr-heading-text mb-2">Create your first</span>
        <div className="flex flex-row">
          <span className="text-4xl font-black clr-heading-text mr-1">Dodo</span>
          <span className="text-4xl font-light theme-3">page</span>
        </div>

        <br></br>
        <Button
          text="Create now"
          btnColor="white"
          className="mx-4 my-4 font-bold w-full py-4 rounded-2xl"
          onClick={() => gotoLinksPage()}
        />
      </div>
    );
  };

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Your link is copied')
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
        toast.error("Failed to copy text.");
      });
  }

  const shareContent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out my Dodo Page",
          text: "Here's my Dodo Page, check it out!",
          url: `https://dodoclub.in/${userId}`, // Replace with dynamic URL
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Error sharing:", error);
            toast.error("Failed to share content.");
          }
        });
    } else {
      toast.error("Sharing is not supported on this browser.");
    }
  };

  const getOldCardUI = () => {
    return (
      <div
        className={cx(
          "card mt-4 p-4 flex items-center flex-col h-66",
          styles.cardDimensions
        )}
      >
        <Image
          height={80}
          width={80}
          src={noUserDp}
          alt="user profile"
          className="my-4 circle"
        />
        <span className="text-lg mb-2">{userDetails?.dodoPageName || userDetails?.userName || 'Dodo user'}</span>

        <div className="rounded-lg h-11 w-full items-center bg-theme justify-between flex pl-2">
          <span
            className="clr-dark-green text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ maxWidth: '200px' }}
          >
            {'dodoclub.in/' + userId}</span>
          <Image
            height={20}
            width={20}
            src={copy}
            alt="user profile"
            className="circle mr-2"
            onClick={() => copyToClipboard('https://dodoclub.in/' + userId)}
          />
        </div>

        <div className="flex flex-row mt-4">
          <Button btnColor="white" text="Share" onClick={shareContent}
            className="mx-4 my-2 font-bold py-2" />

          <Button
            text="Manage"
            btnColor="theme-1"
            className="mx-4 my-2 font-bold py-2 rounded-lg"
            onClick={() => gotoLinksPage()}
          />
        </div>
      </div>
    );
  };


  return (
    <Screen>
      <div className="mt-16 px-4 text-center">
        <div className="flex justify-between mb-6">
          <span className="text-xl">
            👋 Hey! <span className="font-extrabold">Dodo user</span>
          </span>

          <Image
            height={24}
            width={24}
            src={sideBarIcon}
            alt="side bar"
            onClick={toggleSidebar}
          />
        </div>

        {isEmpty(userId) ? getNewCardUI() : getOldCardUI()}

        <Image
          height={21}
          width={205}
          src={otherFeatures}
          alt="user profile"
          className="mx-auto my-6"
        />

        <div className="absolute-center">
          <Image
            height={200}
            width={152}
            src={priceCalc}
            alt="user profile"
            className="mx-auto my-6"
          />

          <Image
            height={200}
            width={152}
            src={engagementCalc}
            alt="user profile"
            className="mx-auto my-6"
          />

        </div>

        <Image
          // height={100}
          // width={300}
          src={footerImg}
          layout="responsive"
          alt="user profile"
          className="my-4"
        />

        {sidebarUI(isSidebarOpen, toggleSidebar)}
        {/* 
           < div className="absolute w-full bottom-2 font-light">
         Crafted with ❤️ in <span className="font-semibold">BHARAT</span>
       </div> */}
      </div>
    </Screen >
  );
}
