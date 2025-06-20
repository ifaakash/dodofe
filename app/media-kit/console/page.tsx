'use client'
import { Header } from "@components/molecules/Header";
import MediaKitHeader from "@components/molecules/mediaKitConsole/MediaKitHeader";
import MediaKitBlocks from "@components/molecules/mediaKitConsole/MediaKitBlocks";
import leftArrow from "public/icons/leftArrow.svg";
import Image from "next/image";
import EyeIcon from "../../../public/icons/greenEye.svg";
import { getMediaKitByInstaId, getUserDetails } from "api/services";
import { useEffect, useState } from "react";
import { userDetailsProps } from "types";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";


const headerData = {
    name: "Rajveer Singh",
    category: ["Actor", "Model", "Influencer"],
    email: "design.rajveer@gmail.com"
}

const MediaKitConsole = () => {
    const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null)
    const userId = loadState(STORAGE_CONSTANTS.userId)
    const [mediaKitDetails, setMediaKitDetails] = useState<any>(null)

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(userId as string)
            setUserDetails(response.user)
        }

        const fetchMediaKitDetails = async () => {
            const response = await getMediaKitByInstaId('_keshav_malik')
            setMediaKitDetails(response.data)
        }

        fetchMediaKitDetails()
        fetchUserDetails()
    }, [])

    return (
        <div className='h-screen w-screen overflow-auto'>
            <div className="px-5 py-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-2">
                    <Image src={leftArrow} className="w-5 h-5" alt="left arrow" />
                    <div className="font-semibold">Mediakit</div>
                </div>

                <div className="flex items-center py-2 px-3 rounded-md bg-white gap-1">
                    <div className="text-[#3D4966] text-xs font-semibold ">
                        Preview
                    </div>
                    <Image
                        src={EyeIcon}
                        alt="pen"
                        width={16}
                        height={16}
                    />
                </div>
            </div>

            <div className="p-4 flex flex-col gap-6">
                <MediaKitHeader data={userDetails} />
                <MediaKitBlocks mediaKitDetails={mediaKitDetails}/>
            </div>
        </div>
    )
}

export default MediaKitConsole;