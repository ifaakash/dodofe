"use client";

import styles from "./home.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userProfileImg from "public/assets/userProfile.png";
import crossBg from "public/icons/crossBg.svg";
import noUserDp from "public/assets/noUserDp.png";
// import footerImg from "public/assets/footerImg.png";
import engagementCalc from "public/assets/content.png";
import priceCalc from "public/assets/priceEstimate.png";
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
import { lazy, useEffect, useRef, useState, useCallback, useMemo } from "react";
import Screen from "@components/molecules/Screen";
import { createUserBlock, getUserBlocks, getUserDetails } from "api";
import { loadState } from "@utils/localStorage";
import { isEmpty } from "@utils/index";
import { toast } from "react-toastify";
import { Card } from "@utils/uiUtils";
import CtaSection from "@components/molecules/CtaSection";
const HomeFooter = lazy(() => import("./homeFooter"));
import Link from "next/link";
import dynamic from "next/dynamic";
import LogoutModal from "@components/templates/LogoutModal";
import { useSelector } from "react-redux";

// Dynamically import the Sidebar component with SSR disabled
const Sidebar = dynamic(() => import("@components/molecules/Sidebar"), { ssr: false });

export default function Home() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({} as any);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const dodoPageDetail = useMemo(() => userDetails?.dodoPages?.[0], [userDetails]);
    const [mainContentVisible, setMainContentVisible] = useState(false);
    const [blurAmount, setBlurAmount] = useState(0);
    const scrollAnimationFrame = useRef<number | null>(null);
    const isLogoutModalOpen = useSelector((state: any) => {
        return state.common.logoutModalState;
    });

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            if (scrollAnimationFrame.current === null) {
                scrollAnimationFrame.current = requestAnimationFrame(() => {
                    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                    let blurValue = Math.min((scrollProgress + 10) / 10, 10);

                    if (scrollProgress === 0) {
                        blurValue = 0;
                    }

                    setBlurAmount(blurValue);
                    scrollAnimationFrame.current = null;
                });
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (scrollAnimationFrame.current !== null) {
                cancelAnimationFrame(scrollAnimationFrame.current);
            }
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(!isSidebarOpen);
    }, [isSidebarOpen]);

    useEffect(() => {
        if (userId) {
            getUserDetails(userId).then((res) => {
                setUserDetails(res?.user);
            });
        }
    }, [userId]);

    const gotoLinksPage = useCallback((url: string) => {
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
    }, [router, userDetails]);

    const handleInvoiceNavigation = useCallback(() => {
        const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";

        if (!userId) {
            router.push(ROUTE_CONSTANTS.LOGIN);
            return;
        }

        router.push(ROUTE_CONSTANTS.INVOICE);
    }, [router]);

    const copyToClipboard = useCallback((e: any, textToCopy: string) => {
        e.stopPropagation();

        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                toast.success("Your link is copied");
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error);
                toast.error("Failed to copy text.");
            });
    }, []);

    const shareContent = useCallback(() => {
        const dodoPageDetail = userDetails?.dodoPages?.[0];
        const content = `Check out my Dodo Page: https://dodoclub.in/${dodoPageDetail?.url}`;

        if (typeof navigator !== 'undefined' && navigator.share && !isEmpty(dodoPageDetail)) {
            // Web sharing
            navigator
                .share({
                    title: "Check out my Dodo Page",
                    text: "Here's my Dodo Page, check it out!",
                    url: `https://dodoclub.in/${dodoPageDetail?.url}`,
                })
                .then(() => toast.success("Shared successfully!"))
                .catch((error) => {
                    if (error.name !== "AbortError") {
                        console.error("Error sharing:", error);
                        toast.error("Failed to share content.");
                    }
                });
        } else if (window.ReactNativeWebView) {
            // Native sharing via postMessage
            window.ReactNativeWebView.postMessage(JSON.stringify({
                action: 'shareContent',
                content: content
            }));
        } else {
            toast.error("Sharing is not supported on this platform.");
        }
    }, [userDetails]);

    const getUserCard = () => {
        const dodoPageDetail = userDetails?.dodoPages?.[0];

        if (isEmpty(dodoPageDetail)) {
            return <CtaSection title="Dodo user" description="Some issue in fetching your dodo pages" noImg onClick={() => router.push(ROUTE_CONSTANTS.LOGIN)} />;
        }

        return (
            <div>
                {userDetails?.dodoPages?.map((page: any) => (
                    <CtaSection
                        key={page.id}
                        title={dodoPageDetail?.name || "Dodo user"}
                        description={dodoPageDetail?.url}
                        buttonBgColor="var(--pink)"
                        profileImageURL={dodoPageDetail?.profilePicture}
                        onClick={() => gotoLinksPage(page.url)}
                        onImageClick={(e) => copyToClipboard(e, 'https://dodoclub.in/' + dodoPageDetail?.url)}
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

    const handleCoinsNavigation = useCallback(() => {
        router.push(ROUTE_CONSTANTS.COINS);
    }, [router]);

    if (!isMounted) {
        return null;
    }

    return (
        <Screen>

            <div className={cx("pt-8 text-center", styles["transition-wrapper"], mainContentVisible && styles.visible)}
                style={{ backgroundImage: `url(${crossBg.src})`, backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
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
                        <div className={cx("flex", !userId ? 'w-full absolute-center mb-6' : 'justify-between mb-4')}>
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
                                        className="cursor-pointer p-2 pr-0 pb-0"
                                    >
                                        <Image
                                            height={32}
                                            width={32}
                                            src={sideBarIcon}
                                            alt="side bar"
                                            priority
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {userId && (
                            <div className="flex row justify-between w-full ml-1">
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
                                    "rounded-full flex px-5 py-3 clr-white my-4 pl-4 shimmer-bg justify-between items-center ",
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
                            title="Dodo  Invoice"
                            description="Create stunning digital invoices in clicks."
                        />

                        <div className="flex flex-row justify-between w-full gap-x-4 my-6">
                            <Card
                                title="Script Generator"
                                description=""
                                icon={engagementCalc}
                                onClick={() => router.push(ROUTE_CONSTANTS.SCRIPT_GENERATOR)}
                                bgColor="var(--light-orange)"
                                bgColorGo="var(--orange)"
                                className="flex-1 max-w-[calc(50%-0.5rem)]"
                            />
                            <Card
                                title="IG Price Estimator"
                                description=""
                                icon={priceCalc}
                                bgColor="var(--neon-purple)"
                                onClick={() => router.push(ROUTE_CONSTANTS.PRICE_CALCULATOR)}
                                bgColorGo="var(--purple)"
                                className="flex-1 max-w-[calc(50%-0.5rem)]"
                            />
                        </div>
                    </div>

                    <CtaSection
                        bgColor="var(--warm-green)"
                        img={mediakitIcon}
                        title="Your MediaKit"
                        description="A Digital & Dyanamic resume for you!"
                        buttonLabel="Know More"
                        onClick={() => router.push(ROUTE_CONSTANTS.MEDIA_KIT)}
                    />

                    <span className="absolute-center text-sm mt-4">
                        more coming soon.
                    </span>

                </div>
                <HomeFooter />
                {isMounted && isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} url={dodoPageDetail?.url} />}
            </div>

            <LogoutModal isModalOpen={isLogoutModalOpen} />
        </Screen>
    );
}
