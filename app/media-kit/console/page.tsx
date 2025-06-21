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
import { STORAGE_CONSTANTS } from "@utils/constants";
import { useSearchParams } from "next/navigation";

const MediaKitConsole = () => {
    const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null)
    const userId = loadState(STORAGE_CONSTANTS.userId)
    const [updateMediaKit, setUpdateMediaKit] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')
    const [isLoading, setIsLoading] = useState<boolean>(false)

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

    const handlePreviewToggle = () => {
        if (mode === 'preview') {
            window.location.href = '/media-kit/console'
        } else {
            window.location.href = '/media-kit/console?mode=preview'
        }
    }

    return (
        <div className='h-screen w-screen overflow-auto'>
            <div className="px-5 py-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-2">
                    <Image src={leftArrow} className="w-5 h-5" alt="left arrow" />
                    <div className="font-semibold">Mediakit</div>
                </div>

                <div className="flex items-center py-2 px-3 rounded-md bg-white gap-1" onClick={handlePreviewToggle}>
                    <div className="text-[#3D4966] text-xs font-semibold ">
                        {
                            mode === 'preview' ? 'Edit' : 'Preview'
                        }
                    </div>
                    <Image
                        src={EyeIcon}
                        alt="pen"
                        width={16}
                        height={16}
                    />
                </div>
            </div>

            {
                mode === 'preview' ? (
                    <div>
                        Preview
                    </div>
                ) : (
                    <div className="p-4 flex flex-col gap-6">
                        <MediaKitHeader data={userDetails} />
                        <MediaKitBlocks mediaKitDetails={userDetails?.mediaKit} setUpdateMediaKit={setUpdateMediaKit} />
                    </div>
                )
            }
        </div>
    )
}

export default MediaKitConsole;