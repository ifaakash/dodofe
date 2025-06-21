'use client'
import GeneralStats from "@components/molecules/mediaKitBlocks/GeneralStats"
import FollowerCount from "@components/molecules/mediaKitBlocks/FollowerCount"
import GenderDistribution from "../mediaKitBlocks/GenderDistribution"
import AgeDistribution from "../mediaKitBlocks/AgeDistribution"
import BrandCollaboration from "../mediaKitBlocks/BrandCollaboration"
import LocationDistribution from "../mediaKitBlocks/LocationDistribution"
import InstaRateCard from "../mediaKitBlocks/InstaRateCard"
import { useState } from "react"

const MediaKitBlocks = ({mediaKitDetails, setUpdateMediaKit}: {mediaKitDetails: any, setUpdateMediaKit: (updateMediaKit: boolean) => void}) => {
    console.log({
        from : 'mediaKitBlocks',
        mediaKitDetails
    })
    
    const [blocksToShow, setBlocksToShow] = useState({
        genderDistribution: true,
        brandCollaboration: true,
        ageDistribution: true,
        locationDistribution: true,
        instaRateCard: true,
    })

    return (
        <div className="flex flex-col gap-1 w-full pb-4">
            <div className="flex flex-col gap-1">
                <FollowerCount followerCount={mediaKitDetails?.followers}/>
                <GeneralStats />
            </div>
            
            <GenderDistribution 
                genderAnalytics={mediaKitDetails?.genderAnalytics} 
                instaId={mediaKitDetails?.instaId} 
                setUpdateMediaKit={setUpdateMediaKit}
            />
            <BrandCollaboration 
                brandData={mediaKitDetails?.brandCollabs} 
                instaId={mediaKitDetails?.instaId} 
                setUpdateMediaKit={setUpdateMediaKit}
            />
            <AgeDistribution 
                ageDistributionData={mediaKitDetails?.ageAnalytics} 
                instaId={mediaKitDetails?.instaId} 
                setUpdateMediaKit={setUpdateMediaKit}/>
                
            <LocationDistribution 
                locationDistributionData={mediaKitDetails?.locationAnalytics} 
                instaId={mediaKitDetails?.instaId} 
                setUpdateMediaKit={setUpdateMediaKit}
                />
            <InstaRateCard 
                rateCardData={mediaKitDetails?.rateCard} 
                instaId={mediaKitDetails?.instaId} 
                setUpdateMediaKit={setUpdateMediaKit}
                engagementRate={mediaKitDetails?.engagementRate}
                followers={mediaKitDetails?.followers}
                />
        </div>
    )
}

export default MediaKitBlocks