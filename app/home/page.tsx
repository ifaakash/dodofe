"use client";

import styles from "./home.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userProfileImg from "public/assets/userProfile.png";
import crossBg from "public/icons/crossBg.svg";
import noUserDp from "public/assets/noUserDp.png";
// import footerImg from "public/assets/footerImg.png";
import engagementCalc from "public/assets/engagementCalc.svg";
import priceCalc from "public/assets/priceCalc.svg";
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
import { Card } from "@utils/uiUtils";
import CtaSection from "@components/molecules/CtaSection";
import HomeFooter from "./homeFooter";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the Sidebar component with SSR disabled
const Sidebar = dynamic(() => import("@components/molecules/Sidebar"), { ssr: false });

export default function Home() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({} as any);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const dodoPageDetail = userDetails?.dodoPages?.[0];
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [mainContentVisible, setMainContentVisible] = useState(false);
    const [blurAmount, setBlurAmount] = useState(0);

    useEffect(() => {
        setIsMounted(true);

        let handleScroll: any;

        if (typeof window !== 'undefined') {
            handleScroll = () => {
                const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

                let blurValue = Math.min((scrollProgress + 10) / 10, 10);

                if (scrollProgress === 0) {
                    blurValue = 0;
                }

                setBlurAmount(blurValue);
            };

            window.addEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
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
            return <></>;
        }

        return (
            <div>
                {userDetails.dodoPages.map((page: any) => (
                    <CtaSection
                        key={page.id}
                        title={dodoPageDetail?.name || "Dodo user"}
                        description={dodoPageDetail?.url}
                        buttonBgColor="var(--pink)"
                        profileImageURL={dodoPageDetail?.profilePicture}
                        onClick={() => gotoLinksPage(page.url)}
                        onImageClick={() => copyToClipboard(dodoPageDetail?.url)}
                        img={copy}
                        imgSize={32}
                        onButtonClick={shareContent}
                        buttonLabel=""
                        showProfileImage={true}
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

            <div className={cx("pt-12 text-center", styles["transition-wrapper"], mainContentVisible && styles.visible)}
                style={{ backgroundImage: `url(${crossBg.src})`, backgroundAttachment: 'fixed' }}>
                <div className="fixed w-full"
                    style={{
                        filter: `blur(${blurAmount}px)`,
                        transition: 'filter 0.15s ease-out',
                    }}
                    onClick={(e) => {
                        if (blurAmount > 0) {
                            e.stopPropagation(); // Prevent inside clicks
                            setBlurAmount(0);
                            if (window) {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }
                    }}
                >
                    <div className="flex">
                        <div className={cx("flex mb-6", !userId ? 'w-full absolute-center' : 'justify-between')}>
                            {!userId && (
                                <Image
                                    height={50}
                                    width={220}
                                    src={welcomeToDodo}
                                    alt="welcome"
                                />
                            )}

                            {userId && (
                                <div className="ml-4" style={{ transform: "rotate(180deg)" }}>
                                    <div
                                        onClick={toggleSidebar}
                                        data-sidebar-toggle
                                        className="cursor-pointer p-2"
                                    >
                                        <Image
                                            height={24}
                                            width={24}
                                            src={sideBarIcon}
                                            alt="side bar"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {userId && (
                            <div className="flex row justify-between w-full ml-2">
                                <p>
                                    Hi,{" "}
                                    <span className="font-bold">
                                        {dodoPageDetail?.name?.split(" ")[0]}
                                    </span>
                                </p>

                                <div
                                    className="flex rounded-xl bg-white mr-4 items-center justify-between px-2"
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
                                    "rounded-2xl flex px-3 py-2 clr-white my-4 pl-4 shimmer-bg justify-between items-center ",
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
                                    500 dodo coins
                                </div>

                                <Image
                                    width={24}
                                    height={24}
                                    src={gotoIcon}
                                    alt="creators"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="mx-4 py-4">{getUserCard()}</div>
                    )}
                </div>
                <div
                    className={cx(
                        "w-full px-4 rounded-t-[32px] bg-white",
                        styles.lowerDiv,
                        !userId && 'mt-24'
                    )}
                >
                    <Image
                        height={53}
                        width={251}
                        src={otherFeatures}
                        alt="user profile"
                        className="mx-auto mb-6 mt-3"
                        priority
                    />

                    <div className="absolute-center flex-col">
                        <CtaSection
                            onClick={handleInvoiceNavigation}
                            bgColor="var(--yellow)"
                            img={invoiceIcon}
                            title="Invoice"
                            description="Create stunning digital invoices in a few seconds"
                        />

                        <div className="flex flex-row justify-between w-full gap-x-4 my-6">
                            <Card
                                title="Engagement Calculator"
                                description="Calculate your instagram engagement"
                                icon={engagementCalc}
                                bgColor="var(--neon-purple)"
                                bgColorGo="var(--neon-blue)"
                                className="flex-1 max-w-[calc(50%-0.5rem)]"
                            />
                            <Card
                                title="Price Estimator"
                                description="Calculate your instagram price"
                                icon={priceCalc}
                                bgColor="var(--neon-rose)"
                                bgColorGo="var(--neon-yellow)"
                                className="flex-1 max-w-[calc(50%-0.5rem)]"
                            />
                        </div>
                    </div>

                    <CtaSection
                        bgColor="var(--warm-green)"
                        img={mediakitIcon}
                        title="MediaKit"
                        description="A digital resume for you"
                        buttonLabel="Coming soon..."
                    />

                    <span className="absolute-center text-sm mt-4">
                        more coming soon.
                    </span>

                </div>
                <HomeFooter />
                {isMounted && <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
            </div>

        </Screen>
    );
}
