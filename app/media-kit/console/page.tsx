'use client'
import { Header } from "@components/molecules/Header";
import MediaKitHeader from "@components/molecules/mediaKitConsole/MediaKitHeader";
import MediaKitBlocks from "@components/molecules/mediaKitConsole/MediaKitBlocks";
import MediaKitPage from "@components/templates/MediaKitPage";
import leftArrow from "public/icons/leftArrow.svg";
import Image from "next/image";
import { getMediaKitByInstaId, getUserDetails } from "api/services";
import { useEffect, useState } from "react";
import { userDetailsProps } from "types";
import { loadState } from "@utils/localStorage";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Share2Icon } from "lucide-react";
import { toast } from "react-hot-toast";

const shimmerStyles = `
.pending-bar {
    position: relative;
    overflow: hidden;
}

.pending-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 70%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    animation: pendingShimmer 4s infinite ease-in-out;
    transform: skewX(-15deg);
}

@keyframes pendingShimmer {
    0% {
        left: -100%;
    }
    100% {
        left: 200%;
    }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = shimmerStyles;
    document.head.appendChild(style);
}

const MediaKitConsole = () => {
    const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null)
    const userId = loadState(STORAGE_CONSTANTS.userId)
    const [updateMediaKit, setUpdateMediaKit] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const router = useRouter()

    const [pendingItems, setPendingItems] = useState(0);

    useEffect(() => {
        if (!userDetails?.mediaKit?.isVerified) {
            router.push(ROUTE_CONSTANTS.MEDIA_KIT_WAITLIST)
            return;
        }

        if (!userDetails?.mediaKit) {
            router.push(ROUTE_CONSTANTS.MEDIA_KIT)
        }
    }, [userDetails?.mediaKit?.isVerified, router])

    useEffect(() => {
        let pendingItems = 0;

        if (!userDetails?.mediaKit?.genderAnalytics?.genderData) {
            pendingItems++;
        }

        if (!userDetails?.mediaKit?.ageAnalytics?.ageData) {
            pendingItems++;
        }

        if (!userDetails?.mediaKit?.contentAnalytics?.contentData) {
            pendingItems++;
        }

        if (!userDetails?.mediaKit?.locationAnalytics?.locationData) {
            pendingItems++;
        }

        setPendingItems(pendingItems);
    }, [userDetails]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (isFirstLoad) {
                setIsLoading(true);
            }
            const response = await getUserDetails(userId as string);
            setUserDetails(response.user);
            setUpdateMediaKit(false);
            if (isFirstLoad) {
                setIsLoading(false);
                setIsFirstLoad(false);
            }
        };
        fetchUserDetails();

    }, [updateMediaKit, isFirstLoad]);

    useEffect(() => {
        if (!isLoading && !userDetails?.mediaKit) {
            router.push(ROUTE_CONSTANTS.MEDIA_KIT)
        }
    }, [isLoading, userDetails?.mediaKit, router])

    const handleShare = async () => {
        const messageText = "👋 Hey! You've seen my content, now see the numbers behind it. From audience insights to brand collabs, pricing to reach… It's all here in my media kit.👇";
        const url = `${window.location.origin}/media-kit/${userDetails?.mediaKit?.instaId}`;

        navigator.clipboard.writeText(`${messageText}\n\n${url}`);
        toast.success('Link copied to clipboard');

        const response = await fetch("/assets/mediakitShare.png");
        const blob = await response.blob();
        const file = new File([blob], "mediakit-share.png", { type: blob.type });

        // Detect iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (navigator.share) {
            try {
                if (isIOS) {
                    // iOS sharing - include URL in text, no separate URL parameter
                    await navigator.share({
                        title: "Check out my Media Kit",
                        text: `${messageText}\n\n${url}`,
                    });
                } else {
                    // Non-iOS sharing - use separate URL parameter
                    await navigator.share({
                        title: "Check out my Media Kit",
                        text: messageText,
                        url: url,
                    });
                }
                toast.success("Shared successfully!");
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error sharing:", error);
                    toast.error("Failed to share content.");
                }
            }
        } else {
            toast.error("Sharing not supported on this device");
        }
    }

    const navigateToHome = () => {
        router.push(ROUTE_CONSTANTS.HOME)
    }

    const handleComplete = () => {
        router.push('/media-kit/console/complete');
    };

    return (
        <div className='h-screen w-screen overflow-auto'>
            <div className="px-5 py-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-2 cursor-pointer" onClick={navigateToHome}>
                    <Image src={leftArrow} className="w-5 h-5" alt="left arrow" />
                    <div className="font-semibold">Mediakit</div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-4 py-2 rounded-full text-md font-bold hover:shadow-xl hover:shadow-purple-500/20 transition-all shimmer-tag"
                    onClick={handleShare}
                >
                    <span className="flex items-center gap-2 text-sm">
                        Share with Brands
                        <Share2Icon className="w-4 h-4" /></span>
                    <div className="shimmer-effect"></div>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-6">
                <MediaKitHeader data={userDetails} variant="edit" isLoading={isLoading} />

                {/* Pending Items Section */}
                {isLoading ? null : pendingItems > 0 && (
                    <div className="bg-black text-white px-4 py-2 flex justify-between items-center rounded-xl pending-bar" onClick={handleComplete}
                    >
                        <div>
                            <div className="text-md font-semibold">{pendingItems} {pendingItems === 1 ? 'item' : 'items'} pending</div>
                            <div className="text-sm text-gray-400">takes less than {pendingItems > 2 ? 2 : 1} min</div>
                        </div>
                        <button
                            className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2"
                            onClick={handleComplete}
                        >
                            <div className="text-xs font-semibold">Complete now</div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="pending-shimmer"></div>
                    </div>
                )}

                <MediaKitBlocks mediaKitDetails={userDetails?.mediaKit} setUpdateMediaKit={setUpdateMediaKit} isLoading={isLoading} />
            </div>
        </div>
    );
}

export default MediaKitConsole;