'use client'
import GeneralStats from "@components/molecules/mediaKitBlocks/GeneralStats"
import FollowerCount from "@components/molecules/mediaKitBlocks/FollowerCount"
import GenderDistribution from "../mediaKitBlocks/GenderDistribution"
import AgeDistribution from "../mediaKitBlocks/AgeDistribution"
import BrandCollaboration from "../mediaKitBlocks/BrandCollaboration"
import LocationDistribution from "../mediaKitBlocks/LocationDistribution"
import InstaRateCard from "../mediaKitBlocks/InstaRateCard"
import { useState } from "react"

const MediaKitBlocks = () => {
    const [blocksToShow, setBlocksToShow] = useState({
        genderDistribution: true,
        brandCollaboration: true,
        ageDistribution: true,
        locationDistribution: true,
        instaRateCard: true,
    })
    return (
        <div className="flex flex-col gap-[10px] w-full pb-4">
            <div className="flex flex-col gap-1">
                <FollowerCount />
                <GeneralStats />
            </div>
            <GenderDistribution setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
            <BrandCollaboration setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
            <AgeDistribution setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
            <LocationDistribution setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
            <InstaRateCard setBlocksToShow={setBlocksToShow} blocksToShow={blocksToShow}/>
        </div>
    )
}

export default MediaKitBlocks