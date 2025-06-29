"use client";
import React from "react";
import BioSection from "./BioSection";
import InstaSection from "./InstaSection";
import InstaFollowerSection from "./InstaFollowerSection";
import BrandSection from "./BrandSection";
import AgeDistributionSection from "./AgeDistributionSection";
import GenderDistributionSection from "./GenderDistributionSection";
import LocationDistributionSection from "./LocationDistributionSection";
import InstagramPriceSection from "./InstagramPriceSection";
import { Header } from "@components/molecules/Header";
import FollowerCount from "@components/molecules/mediaKitBlocks/FollowerCount";
import GeneralStats from "@components/molecules/mediaKitBlocks/GeneralStats";
import GenderDistribution from "@components/molecules/mediaKitBlocks/GenderDistribution";
import MediaKitHeader from "@components/molecules/mediaKitConsole/MediaKitHeader";
import InstaRateCard from "@components/molecules/mediaKitBlocks/InstaRateCard";
import AgeDistribution from "@components/molecules/mediaKitBlocks/AgeDistribution";
import BrandCollaboration from "@components/molecules/mediaKitBlocks/BrandCollaboration";
import BrandCard from "@components/molecules/mediaKitBlocks/BrandCard";
import LocationDistribution from "@components/molecules/mediaKitBlocks/LocationDistribution";

interface MediaKitPageProps {
    userData?: {
        name?: string;
        avatar?: string;
        roles?: string[];
        email?: string;
    };
    instaStats?: {
        followers: string;
        grade: string;
        contentSplit: {
            reel: number;
            post: number;
            story: number;
        };
        mediaCount: number;
        engagement: number;
        avgLike: string;
        avgComments: string;
        uploadedFile?: {
            name: string;
            date: string;
        };
    };
    brandCollaborations?: Array<{
        brandName: string;
        brandLogo: string;
        type: string;
        reach: string;
        engagement: string;
    }>;
}

const MediaKitPage: React.FC<any> = ({ mediaKitData }) => {

    console.log({
        from: 'MediaKitPage',
        mediaKitData
    })

    return (
        <div className="min-h-screen">
            {/* <Header /> */}

            <div className="py-12 px-4 flex flex-col gap-5">
                <MediaKitHeader data={mediaKitData} variant="public" />


                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-1">
                        <FollowerCount followerCount={mediaKitData?.followers} />
                        <GeneralStats mode="public" instaId={mediaKitData?.instaId} contentAnalytics={mediaKitData?.contentAnalytics} />
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        {
                            mediaKitData?.genderAnalytics?.isActive && mediaKitData?.genderAnalytics?.genderData && (
                                <GenderDistribution
                                    genderAnalytics={mediaKitData?.genderAnalytics}
                                    instaId={mediaKitData?.instaId}
                                    mode={'public'}
                                />
                            )
                        }
                        {
                            mediaKitData?.ageAnalytics?.isActive && mediaKitData?.ageAnalytics?.ageData && (
                                <AgeDistribution
                                    ageDistributionData={mediaKitData?.ageAnalytics}
                                    instaId={mediaKitData?.instaId}
                                    mode={'public'}
                                />
                            )
                        }

                        {
                            mediaKitData?.brandCollabs?.isActive && (
                                <BrandCollaboration
                                    brandData={mediaKitData?.brandCollabs}
                                    instaId={mediaKitData?.instaId}
                                    mode={'public'}
                                />
                            )
                        }

                        {
                            mediaKitData?.locationAnalytics?.isActive && mediaKitData?.locationAnalytics?.locationData && (
                                <LocationDistribution
                                    locationDistributionData={mediaKitData?.locationAnalytics}
                                    instaId={mediaKitData?.instaId}
                                    mode={'public'}
                                />
                            )
                        }

                        {
                            mediaKitData?.rateCard?.isActive && (
                                <InstaRateCard
                                    rateCardData={mediaKitData?.rateCard}
                                    instaId={mediaKitData?.instaId}
                                    engagementRate={mediaKitData?.engagementRate}
                                    followers={mediaKitData?.followers}
                                    mode={'public'}
                                />
                            )
                        }
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MediaKitPage;
