'use client'
import { Header } from "@components/molecules/Header";
import MediaKitHeader from "@components/molecules/mediaKitConsole/MediaKitHeader";
import MediaKitBlocks from "@components/molecules/mediaKitConsole/MediaKitBlocks";
import MediaKitPage from "@components/templates/MediaKitPage";
import leftArrow from "public/icons/leftArrow.svg";
import Image from "next/image";
import EyeIcon from "../../../public/icons/greenEye.svg";
import { getMediaKitByInstaId, getUserDetails } from "api/services";
import { useEffect, useState } from "react";
import { userDetailsProps } from "types";
import { loadState } from "@utils/localStorage";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Share2Icon } from "lucide-react";
import { toast } from "react-hot-toast";

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

    console.log(pendingItems)
    return (
        <div className='h-screen w-screen overflow-auto'>
            <div className="px-5 py-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-2 cursor-pointer" onClick={navigateToHome}>
                    <Image src={leftArrow} className="w-5 h-5" alt="left arrow" />
                    <div className="font-semibold">Mediakit</div>
                </div>

                <div className="flex items-center py-2 px-3 rounded-md bg-white gap-1" onClick={handleShare}>
                    <div className="text-[#3D4966] text-xs font-semibold ">
                        Share
                    </div>
                    <Share2Icon size={14} className="text-brandPrimary" strokeWidth={2} />
                </div>
            </div>

            <div className="p-4 flex flex-col gap-6">
                <MediaKitHeader data={userDetails} variant="edit" isLoading={isLoading} />

                {/* Pending Items Section */}
                {pendingItems > 0 && (
                    <div className="bg-black text-white px-4 py-2 flex justify-between items-center rounded-xl">
                        <div>
                            <div className="text-lg font-semibold">{pendingItems} {pendingItems === 1 ? 'item' : 'items'} pending</div>
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
                    </div>
                )}

                <MediaKitBlocks mediaKitDetails={userDetails?.mediaKit} setUpdateMediaKit={setUpdateMediaKit} isLoading={isLoading} />
            </div>
        </div>
    );
}

export default MediaKitConsole;