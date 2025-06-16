'use client'
import { Header } from "@components/molecules/Header";
import MediaKitHeader from "@components/molecules/mediaKitConsole/MediaKitHeader";
import MediaKitBlocks from "@components/molecules/mediaKitConsole/MediaKitBlocks";
import leftArrow from "public/icons/leftArrow.svg";
import Image from "next/image";
import EyeIcon from "../../../public/icons/greenEye.svg";


const headerData = {
    name: "Rajveer Singh",
    category: ["Actor", "Model", "Influencer"],
    email: "design.rajveer@gmail.com"
}

const MediaKitConsole = () => {
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
                <MediaKitHeader data={headerData} />
                <MediaKitBlocks />
            </div>
        </div>
    )
}

export default MediaKitConsole;