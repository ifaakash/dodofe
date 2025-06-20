'use client'
import GeneralStats from "@components/molecules/mediaKitBlocks/GeneralStats"
import FollowerCount from "@components/molecules/mediaKitBlocks/FollowerCount"
import GenderDistribution from "../mediaKitBlocks/GenderDistribution"
import AgeDistribution from "../mediaKitBlocks/AgeDistribution"
import BrandCollaboration from "../mediaKitBlocks/BrandCollaboration"
import LocationDistribution from "../mediaKitBlocks/LocationDistribution"
import InstaRateCard from "../mediaKitBlocks/InstaRateCard"
import { useState } from "react"

const MediaKitBlocks = ({mediaKitDetails}: {mediaKitDetails: any}) => {
    const [blocksToShow, setBlocksToShow] = useState({
        genderDistribution: true,
        brandCollaboration: true,
        ageDistribution: true,
        locationDistribution: true,
        instaRateCard: true,
    })

    console.log({
        from : 'mediaKitBlocks',
        mediaKitDetails
    })
    return (
        <div className="flex flex-col gap-[10px] w-full pb-4">
            <div className="flex flex-col gap-1">
                <FollowerCount />
                <GeneralStats />
            </div>
            <GenderDistribution setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
            <BrandCollaboration setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow} brandData={mediaKitDetails?.brandCollabs}/>
            <AgeDistribution setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
            <LocationDistribution setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
            <InstaRateCard setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
        </div>
    )
}

export default MediaKitBlocks