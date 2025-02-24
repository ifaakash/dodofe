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
import invoiceIcon from "public/assets/invoice.png";
import mediakitIcon from "public/assets/mediakit.png";
import gotoIcon from "public/icons/goto.svg";

import { useRouter } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useEffect, useState } from "react";
import Screen from "@components/molecules/Screen";
import { createUserBlock, getUserBlocks, getUserDetails } from "api";
import { loadState } from "@utils/localStorage";
import { isEmpty } from "@utils/index";
import { toast } from "react-toastify";
import { getSidebarUI } from "@utils/uiUtils";
import CtaSection from "@components/molecules/CtaSection";
import HomeFooter from "./homeFooter";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({} as any);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const dodoPageDetail = userDetails?.dodoPages?.[0];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (userId) {
            getUserDetails(userId).then((res) => {
                setUserDetails(res?.user);
            });
        }
    }, [userId]);

    console.log(userDetails);

    if (!isMounted) {
        return null;
    }

    const gotoLinksPage = (url: string) => {
        const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";

        if (!userId) {
            router.push(ROUTE_CONSTANTS.LOGIN);
            return;
        }

        if (isEmpty(userDetails?.socialLinks)) {
            router.push(
                ROUTE_CONSTANTS.DODOPAGE + ROUTE_CONSTANTS.SLASH + `${url}`
            );
            return;
        }

        router.push(ROUTE_CONSTANTS.LINKS + `?userId=${userId}`, {
            scroll: false,
        });
    };

    const handleInvoiceNavigation = () => {
        const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";

        if (!userId) {
            router.push(ROUTE_CONSTANTS.LOGIN);
            return;
        }

        router.push(ROUTE_CONSTANTS.INVOICE);
    };

    const copyToClipboard = (textToCopy: string) => {
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                toast.success("Your link is copied");
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error);
                toast.error("Failed to copy text.");
            });
    };

    const shareContent = () => {
        const dodoPageDetail = userDetails?.dodoPages?.[0];

        if (navigator.share && !isEmpty(dodoPageDetail)) {
            navigator
                .share({
                    title: "Check out my Dodo Page",
                    text: "Here's my Dodo Page, check it out!",
                    url: `https://dodoclub.in/${dodoPageDetail?.url}`, // Replace with dynamic URL
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
        const dodoPageDetail = userDetails?.dodoPages?.[0];
        if (isEmpty(dodoPageDetail)) {
            return <CtaSection title="" />
        }
        return (
            <div>
                {userDetails.dodoPages.map((page: any) => (
                    <CtaSection
                        title={dodoPageDetail?.name || "Dodo user"}
                        description={dodoPageDetail?.url}
                        buttonBgColor="var(--pink)"
                        onClick={() => gotoLinksPage(page.url)}
                        onImageClick={() => copyToClipboard(dodoPageDetail?.url)}
                        img={copy}
                        imgSize={32}
                        onButtonClick={shareContent}
                        buttonLabel=""
                    />
                ))}
            </div>
        );
    };

    const handleCoinsNavigation = () => {
        router.push(ROUTE_CONSTANTS.COINS);
    };

    return (
        <Screen>
            <div className="mt-4 text-center">
                <div style={{ backgroundImage: `url(${crossBg.src})` }}>
                    <div className="flex">
                        <div className="flex mb-6 w-full absolute-center">
                            {!userId && (
                                <Image
                                    height={50}
                                    width={220}
                                    src={welcomeToDodo}
                                    alt="welcome"
                                />
                            )}

                            {userId && (
                                <div style={{ transform: "rotate(180deg)" }}>
                                    <Image
                                        height={24}
                                        width={24}
                                        src={sideBarIcon}
                                        alt="side bar"
                                        onClick={toggleSidebar}
                                        data-sidebar-toggle
                                        className="cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>

                        {userId && (
                            <div className="flex row justify-between w-full">
                                <p>
                                    Hi,{" "}
                                    <span className="font-bold">
                                        {dodoPageDetail?.name?.split(" ")[0]}
                                    </span>
                                </p>

                                <div
                                    className="flex rounded-xl bg-white mr-2 items-center justify-between px-2"
                                    style={{ height: 30, width: 80 }}
                                    onClick={handleCoinsNavigation}
                                >
                                    <Image
                                        className="flex-shrink-0"
                                        height={18}
                                        width={22}
                                        src={dodoCoinIcon}
                                        alt="dodo coin"
                                    />
                                    <span className="flex-1 text-center font-bold">
                                        {userDetails?.dodoCoins ?? 0}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    {isEmpty(userId) ? (
                        <div className="mx-4">
                            <CtaSection
                                onButtonClick={() =>
                                    gotoLinksPage(dodoPageDetail?.url)
                                }
                            />

                            <div
                                className={cx(
                                    "rounded-2xl flex p-3 clr-white my-4 pl-4 shimmer-bg justify-between",
                                    styles.shimmerBg
                                )}
                                onClick={() => gotoLinksPage(dodoPageDetail?.url)}
                            >
                                <div className="flex text-sm">
                                    Login to get free
                                    <Image
                                        className="mx-1"
                                        height={18}
                                        width={22}
                                        src={dodoCoinIcon}
                                        alt="dodo coin"
                                    />
                                    1000 dodo coins
                                </div>

                                <Image
                                    width={20}
                                    height={20}
                                    src={gotoIcon}
                                    alt="creators"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="m-4">{getUserCard()}</div>
                    )}

                    <div
                        className={cx(
                            "w-full px-4 rounded-t-2xl bg-white",
                            styles.lowerDiv
                        )}
                    >
                        <Image
                            height={53}
                            width={251}
                            src={otherFeatures}
                            alt="user profile"
                            className="mx-auto my-6"
                        />

                        <div className="absolute-center flex-col">
                            <CtaSection
                                onClick={handleInvoiceNavigation}
                                bgColor="var(--yellow)"
                                img={invoiceIcon}
                                title="Invoice"
                                description="Create stunning digital invoices in a few seconds"
                            />

                            <div className="flex flex-row justify-between w-full gap-x-4">
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

                        <CtaSection
                            bgColor="var(--warm-green)"
                            img={mediakitIcon}
                            title="MediaKit"
                            description="Your digital resume"
                            buttonLabel="Coming soon..."
                        />

                        <span className="absolute-center text-sm mt-4">
                            more coming soon.
                        </span>
                    </div>

                    <HomeFooter />
                </div>
            </div>
            {isMounted && getSidebarUI({ isSidebarOpen, toggleSidebar })}
        </Screen>
    );
}
