"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import DodoIcon from "public/icons/dodoIconName.svg";
import Image from "next/image";

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

    return (
        <div className="min-h-screen flex flex-col">
            {/* <Header /> */}

            <div className="py-12 px-4 md:px-6 lg:px-8 flex flex-col gap-5 flex-grow">
                <div className="max-w-[1200px] mx-auto w-full">
                    <MediaKitHeader data={mediaKitData} variant="public" />

                    <div className="flex flex-col gap-[10px] mt-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/3">
                                <FollowerCount followerCount={mediaKitData?.followers} />
                            </div>
                            <div className="w-full md:w-2/3">
                                <GeneralStats
                                    mode="public"
                                    instaId={mediaKitData?.instaId}
                                    contentAnalytics={mediaKitData?.contentAnalytics}
                                    avgLike={mediaKitData?.avgLike}
                                    avgComments={mediaKitData?.avgComments}
                                    mediaCount={mediaKitData?.mediaCount}
                                    engagement={mediaKitData?.engagement}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {
                                mediaKitData?.genderAnalytics?.isActive && mediaKitData?.genderAnalytics?.genderData && (
                                    <div className="w-full">
                                        <GenderDistribution
                                            genderAnalytics={mediaKitData?.genderAnalytics}
                                            instaId={mediaKitData?.instaId}
                                            mode={'public'}
                                        />
                                    </div>
                                )
                            }
                            {
                                mediaKitData?.ageAnalytics?.isActive && mediaKitData?.ageAnalytics?.ageData && (
                                    <div className="w-full">
                                        <AgeDistribution
                                            ageDistributionData={mediaKitData?.ageAnalytics}
                                            instaId={mediaKitData?.instaId}
                                            mode={'public'}
                                        />
                                    </div>
                                )
                            }
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {
                                mediaKitData?.locationAnalytics?.isActive && mediaKitData?.locationAnalytics?.locationData && (
                                    <div className="w-full">
                                        <LocationDistribution
                                            locationDistributionData={mediaKitData?.locationAnalytics}
                                            instaId={mediaKitData?.instaId}
                                            mode={'public'}
                                        />
                                    </div>
                                )
                            }
                            {
                                mediaKitData?.brandCollabs?.isActive && (
                                    <div className="w-full">
                                        <BrandCollaboration
                                            brandData={mediaKitData?.brandCollabs}
                                            instaId={mediaKitData?.instaId}
                                            mode={'public'}
                                        />
                                    </div>
                                )
                            }
                        </div>

                        {
                            mediaKitData?.rateCard?.isActive && (
                                <div className="w-full">
                                    <InstaRateCard
                                        rateCardData={mediaKitData?.rateCard}
                                        instaId={mediaKitData?.instaId}
                                        engagementRate={mediaKitData?.engagementRate}
                                        followers={mediaKitData?.followers}
                                        mode={'public'}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <Link href={'http://dodoclub.in/'} className="flex items-center gap-2 justify-center w-full py-6 bg-white">
                <div className="text-[#3D4966] text-xs">powered by:</div>
                <Image src={DodoIcon} alt="dodo icon" height={20} />
            </Link>
        </div>
    );
};

export default MediaKitPage;
