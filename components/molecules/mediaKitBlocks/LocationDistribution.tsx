"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import LocationDistributionIcon from "../../../public/assets/LocationImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { useState } from "react"
import LocaltionDistributionChart from "@components/atoms/Charts/LocaltionDistributionChart"



const LocationDistribution = ({
    setBlocksToShow,
    blocksToShow
}: {
    setBlocksToShow: (blocksToShow: any) => void,
    blocksToShow: any
}) => {
    const [locationDistributionData, setLocationDistributionData] = useState([
        {
            location: "Delhi",
            percentage: 20
        },
        {
            location: "Lucknow",
            percentage: 32
        },
        {
            location: "Mumbai",
            percentage: 15
        },
        {
            location: "Gujrat",
            percentage: 40
        },
    ])
    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1 ${!blocksToShow.locationDistribution ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-center">
                <Image className="w-5 h-5" src={DragIcon} alt="Drag" />
                <Toggle checked={blocksToShow.locationDistribution} onCheckedChange={() => setBlocksToShow({
                    ...blocksToShow,
                    locationDistribution: !blocksToShow.locationDistribution
                })} />
            </div>

            <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                <div className="text-[#1167F1] w-full px-2 py-1 flex gap-1">
                    <div className="text-xs font-semibold"> Location </div>
                    <div className="text-[10px]"> DISTRIBUTION </div>
                </div>
                <Image src={LocationDistributionIcon} alt="Gender Distribution" />
            </div>

            <LocaltionDistributionChart locationDistributionData={locationDistributionData} />

            <div className="p-2 flex justify-between items-center border rounded-[10px]">
                <div className="flex flex-col gap-0.5 text-[10px]">
                    <div className="font-semibold">Upload Location Distribution</div>
                    <div className="font-medium text-[#8B39FF] underline">How to upload?</div>
                </div>
                <div className="border-[1px] border-[#EAE9EC] flex gap-0.5 px-[10px] py-1 rounded-full">
                    <div className="text-[10px] font-medium">Upload</div>
                    <Image src={UploadIcon} alt="Upload" />
                </div>
            </div>
        </div>
    )
}

export default LocationDistribution