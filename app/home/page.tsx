"use client";

import styles from "./home.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userProfileImg from "public/assets/userProfile.png";
import crossBg from "public/icons/crossBg.svg";
import noUserDp from "public/assets/noUserDp.png";
// import footerImg from "public/assets/footerImg.png";
import engagementCalc from "public/assets/engagementCalc.png";
import priceCalc from "public/assets/priceCalc.png";
import copy from "public/icons/copy.svg";
import sideBarIcon from "public/icons/sideBarIcon.svg";
import dodoCoinIcon from "public/icons/dodoCoin.svg";
import otherFeatures from "public/assets/otherFeatures.png";
import welcomeToDodo from "public/assets/welcome.png";

import { useRouter } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useEffect, useState } from "react";
import Screen from "@components/molecules/Screen";
import { createUserBlock, getUserBlocks, getUserDetails } from "api";
import { loadState } from "@utils/localStorage";
import { isEmpty } from "@utils/index";
import { toast } from "react-toastify";
import { sidebarUI } from "@utils/uiUtils";
import CtaSection from "@components/molecules/CtaSection";
import HomeFooter from "./homeFooter";

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

  const getUserCard = () => {
    const dodoPageDetail = userDetails?.dodoPages[0];

    return <CtaSection
      title={dodoPageDetail?.url || 'Dodo user'}
      description={dodoPageDetail?.url}
      buttonBgColor="var(--pink)"
      onImageClick={() => copyToClipboard(dodoPageDetail?.url)}
      img={copy}
      onButtonClick={gotoLinksPage}
    />

    // return (
    //   <div
    //     className={cx(
    //       "card mt-4 p-4 flex items-center flex-col h-66",
    //       styles.cardDimensions
    //     )}
    //   >
    //     <Image
    //       height={80}
    //       width={80}
    //       src={noUserDp}
    //       alt="user profile"
    //       className="my-4 circle"
    //     />
    //     <span className="text-lg mb-2">{userDetails?.dodoPageName || userDetails?.userName || 'Dodo user'}</span>

    //     <div className="rounded-lg h-11 w-full items-center bg-theme justify-between flex pl-2">
    //       <span
    //         className="clr-dark-green text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap"
    //         style={{ maxWidth: '200px' }}
    //       >
    //         {'dodoclub.in/' + userId}</span>
    //       <Image
    //         height={20}
    //         width={20}
    //         src={copy}
    //         alt="user profile"
    //         className="circle mr-2"
    //         onClick={() => copyToClipboard('https://dodoclub.in/' + userId)}
    //       />
    //     </div>

    //     <div className="flex flex-row mt-4">
    //       <Button btnColor="white" text="Share" onClick={shareContent}
    //         className="mx-4 my-2 font-bold py-2" />

    //       <Button
    //         text="Manage"
    //         btnColor="theme-1"
    //         className="mx-4 my-2 font-bold py-2 rounded-lg"
    //         onClick={() => gotoLinksPage()}
    //       />
    //     </div>
    //   </div>
    // );
  };


  return (
    <Screen>
      <div className="mt-16 text-center">

        <div className="px-4" style={{ backgroundImage: `url(${crossBg.src})` }}>
          <div className="flex justify-between mb-6">
            <Image
              height={50}
              width={260}
              src={welcomeToDodo}
              alt="side bar"
              className="ml-16"
              onClick={toggleSidebar}
            />

            <Image
              height={24}
              width={24}
              src={sideBarIcon}
              alt="side bar"
              onClick={toggleSidebar}
            />
          </div>

          {isEmpty(userId) ? <div>
            <CtaSection onButtonClick={gotoLinksPage} />

            <div className="rounded-2xl flex p-2 clr-white my-4 pl-4" style={{ background: 'grey' }}>
              Login to get free
              <Image
                className="mx-2"
                height={18}
                width={22}
                src={dodoCoinIcon}
                alt="dodo coin"
              />
              1000 dodo coins
            </div>
          </div> :
            getUserCard()
          }
        </div>
        {/* {isEmpty(userId) ? getNewCardUI() : getOldCardUI()} */}


        <div className={cx('w-full px-4 rounded-t-2xl bg-white', styles.lowerDiv)} >
          <Image
            height={21}
            width={205}
            src={otherFeatures}
            alt="user profile"
            className="mx-auto my-6"
          />

          <div className="absolute-center flex-col">
            <CtaSection bgColor="var(--yellow)" title="Invoice" description="Create stunning digital invoices in a few seconds" />

            <div className="flex flex-row justify-between block w-full">
              <Image
                height={320}
                width={172}
                src={engagementCalc}
                alt="engagement calc"
                className="ml-2 my-6"
              />

              <Image
                height={320}
                width={172}
                src={priceCalc}
                alt="price calc"
                className="mr-2 my-6"
              />
            </div>

          </div>

          <CtaSection bgColor="var(--warm-green)" title="MediaKit" description="Your digital resume" buttonLabel="Coming soon..." />

          <span className="absolute-center text-sm mt-4">more coming soon.</span>

          {sidebarUI(isSidebarOpen, toggleSidebar)}

        </div>

        <HomeFooter />
      </div>


    </Screen >
  );
}
