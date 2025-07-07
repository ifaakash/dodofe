'use client'
import GeneralStats from "@components/molecules/mediaKitBlocks/GeneralStats"
import FollowerCount from "@components/molecules/mediaKitBlocks/FollowerCount"
import GenderDistribution from "../mediaKitBlocks/GenderDistribution"
import AgeDistribution from "../mediaKitBlocks/AgeDistribution"
import BrandCollaboration from "../mediaKitBlocks/BrandCollaboration"
import LocationDistribution from "../mediaKitBlocks/LocationDistribution"
import InstaRateCard from "../mediaKitBlocks/InstaRateCard"
import { useState } from "react"
import GeneratedByDodo from "public/images/generatedByDodo.png"
import Image from "next/image"

interface MediaKitBlocksProps {
    mediaKitDetails: any;
    setUpdateMediaKit: (updateMediaKit: boolean) => void;
    isLoading?: boolean;
}

const MediaKitBlocksSkeleton = () => {
    return (
        <div className="flex flex-col gap-1 w-full pb-4 min-h-screen animate-pulse">
            {/* Follower Count Skeleton */}
            <div className="flex flex-col gap-1">
                <div className="bg-[#FDFBFF] rounded-xl p-4">
                    <div className="h-8 w-32 bg-gray-200 rounded-md" />
                </div>
            </div>

            {/* General Stats Skeleton */}
            <div className="bg-[#FDFBFF] rounded-xl p-4">
                <div className="h-[200px] bg-gray-200 rounded-lg mb-3" /> {/* For the chart */}
                <div className="grid grid-cols-2 gap-1">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full px-4 py-2 bg-gray-200 rounded-[10px]">
                            <div className="h-6 w-16 bg-gray-300 rounded mb-1" />
                            <div className="h-4 w-24 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Gender Distribution Skeleton */}
            <div className="bg-[#FDFBFF] rounded-xl p-[10px]">
                <div className="flex justify-between items-center bg-gray-200 rounded-lg p-2 mb-2">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-8 w-8 bg-gray-300 rounded" />
                </div>
                <div className="h-16 bg-gray-200 rounded-lg" /> {/* For the distribution bars */}
            </div>

            {/* Brand Collaboration Skeleton */}
            <div className="bg-[#FDFBFF] rounded-xl p-[10px]">
                <div className="flex justify-between items-center bg-gray-200 rounded-lg p-2 mb-2">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-8 w-8 bg-gray-300 rounded" />
                </div>
                <div className="h-24 bg-gray-200 rounded-lg" /> {/* For brand cards */}
            </div>

            {/* Age Distribution Skeleton */}
            <div className="bg-[#FDFBFF] rounded-xl p-[10px]">
                <div className="flex justify-between items-center bg-gray-200 rounded-lg p-2 mb-2">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-8 w-8 bg-gray-300 rounded" />
                </div>
                <div className="h-32 bg-gray-200 rounded-lg" /> {/* For age chart */}
            </div>

            {/* Location Distribution Skeleton */}
            <div className="bg-[#FDFBFF] rounded-xl p-[10px]">
                <div className="flex justify-between items-center bg-gray-200 rounded-lg p-2 mb-2">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-8 w-8 bg-gray-300 rounded" />
                </div>
                <div className="h-32 bg-gray-200 rounded-lg" /> {/* For location chart */}
            </div>

            {/* Rate Card Skeleton */}
            <div className="bg-[#FDFBFF] rounded-xl p-[10px]">
                <div className="flex justify-between items-center bg-gray-200 rounded-lg p-2 mb-2">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-8 w-8 bg-gray-300 rounded" />
                </div>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
};

const MediaKitBlocks = ({ mediaKitDetails, setUpdateMediaKit, isLoading = false }: MediaKitBlocksProps) => {
    if (isLoading) {
        return <MediaKitBlocksSkeleton />;
    }

    return (
        <div className="flex flex-col gap-2 w-full pb-4 min-h-screen">
            <div className="flex flex-col gap-1">
                <FollowerCount followerCount={mediaKitDetails?.followers} />
                <GeneralStats
                    mode='edit'
                    instaId={mediaKitDetails?.instaId}
                    contentAnalytics={mediaKitDetails?.contentAnalytics}
                    avgLike={mediaKitDetails?.avgLikes}
                    avgComments={mediaKitDetails?.avgComments}
                    mediaCount={mediaKitDetails?.mediaCount}
                    engagement={mediaKitDetails?.engagement}
                />
            </div>

            <GenderDistribution
                genderAnalytics={mediaKitDetails?.genderAnalytics}
                instaId={mediaKitDetails?.instaId}
                setUpdateMediaKit={setUpdateMediaKit}
                mode="edit"
            />
            <BrandCollaboration
                brandData={mediaKitDetails?.brandCollabs}
                instaId={mediaKitDetails?.instaId}
                setUpdateMediaKit={setUpdateMediaKit}
                mode="edit"
            />
            <AgeDistribution
                ageDistributionData={mediaKitDetails?.ageAnalytics}
                instaId={mediaKitDetails?.instaId}
                setUpdateMediaKit={setUpdateMediaKit}
                mode="edit"
            />
            <LocationDistribution
                locationDistributionData={mediaKitDetails?.locationAnalytics}
                instaId={mediaKitDetails?.instaId}
                setUpdateMediaKit={setUpdateMediaKit}
                mode="edit"
            />
            <InstaRateCard
                rateCardData={mediaKitDetails?.rateCard}
                instaId={mediaKitDetails?.instaId}
                setUpdateMediaKit={setUpdateMediaKit}
                engagementRate={mediaKitDetails?.engagementRate}
                followers={mediaKitDetails?.followers}
                mode="edit"
                showDisclaimer={true}
            />

            {/* <div className="flex justify-center items-center mt-auto mb-4">
                <Image src={GeneratedByDodo} alt="Generated by Dodo" />
            </div> */}
        </div>
    )
}

export default MediaKitBlocks