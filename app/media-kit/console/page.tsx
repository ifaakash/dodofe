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
    const router = useRouter()

    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true)
            const response = await getUserDetails(userId as string)
            setUserDetails(response.user)
            setUpdateMediaKit(false)
            setIsLoading(false)
        }
        fetchUserDetails()

    }, [updateMediaKit])

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

        if (navigator.share) {
            try {
                await navigator.share({
                    files: [file],
                    title: "Check out my Media Kit",
                    text: messageText + "\n\n" + url,
                });
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
                <MediaKitHeader data={userDetails} variant="edit" />
                <MediaKitBlocks mediaKitDetails={userDetails?.mediaKit} setUpdateMediaKit={setUpdateMediaKit} />
            </div>


        </div>
    )
}

export default MediaKitConsole;