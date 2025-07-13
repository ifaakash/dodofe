"use client";
import MediaKitHeader from "@components/molecules/mediaKitConsole/MediaKitHeader";
import FollowerCount from "@components/molecules/mediaKitBlocks/FollowerCount";
import GeneralStats from "@components/molecules/mediaKitBlocks/GeneralStats";
import GenderDistribution from "@components/molecules/mediaKitBlocks/GenderDistribution";
import AgeDistribution from "@components/molecules/mediaKitBlocks/AgeDistribution";
import LocationDistribution from "@components/molecules/mediaKitBlocks/LocationDistribution";
import BrandCollaboration from "@components/molecules/mediaKitBlocks/BrandCollaboration";
import InstaRateCard from "@components/molecules/mediaKitBlocks/InstaRateCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMediaKitByInstaId } from "api/services";
import Skeleton from "react-loading-skeleton";
import GeneralErrorPage from "@components/templates/errorPages/GeneralError";
import Image from "next/image";
import Link from "next/link";
import DodoIcon from "public/icons/dodoIconName.svg";

export default function MediaKit() {
    const params = useParams();
    const [mediaKitData, setMediaKitData] = useState<any>(null);
    const instaId = params.instaId;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMediaKitData = async () => {
            try {
                setIsLoading(true);
                const data = await getMediaKitByInstaId(instaId as string);
                setMediaKitData(data?.data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMediaKitData();
    }, [params.instaId]);

    if (isError) return <GeneralErrorPage />;
    if (isLoading || !mediaKitData || !instaId) {
        return <div className="min-h-screen flex flex-col items-center justify-center"><Skeleton width={300} height={400} /></div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F5F6FA]">
            <div className="py-12 px-4 md:px-6 lg:px-8 flex flex-col gap-5 flex-grow">
                <div className="max-w-[1100px] mx-auto w-full">
                    <MediaKitHeader data={mediaKitData} variant="public" />

                    {/* Desktop 2-column layout */}
                    <div className="hidden md:grid grid-cols-2 gap-6 mt-8">
                        {/* Left column: FollowerCount + GeneralStats (tall) */}
                        <div className="flex flex-col gap-6 h-full">
                            <FollowerCount followerCount={mediaKitData?.followers} />
                            <div className="flex-1">
                                <GeneralStats
                                    mode="public"
                                    instaId={mediaKitData?.instaId}
                                    contentAnalytics={mediaKitData?.contentAnalytics}
                                    avgLike={mediaKitData?.avgLikes}
                                    avgComments={mediaKitData?.avgComments}
                                    mediaCount={mediaKitData?.mediaCount}
                                    engagement={mediaKitData?.engagement}
                                />
                            </div>
                        </div>
                        {/* Right column: Gender, Age, Location stacked */}
                        <div className="flex flex-col gap-6 h-full">
                            {mediaKitData?.genderAnalytics?.isActive && mediaKitData?.genderAnalytics?.genderData && (
                                <GenderDistribution
                                    genderAnalytics={mediaKitData?.genderAnalytics}
                                    instaId={mediaKitData?.instaId}
                                    mode={'public'}
                                />
                            )}
                            {mediaKitData?.ageAnalytics?.isActive && mediaKitData?.ageAnalytics?.ageData && (
                                <AgeDistribution
                                    ageDistributionData={mediaKitData?.ageAnalytics}
                                    instaId={mediaKitData?.instaId}
                                    mode={'public'}
                                />
                            )}
                            {mediaKitData?.locationAnalytics?.isActive && mediaKitData?.locationAnalytics?.locationData && (
                                <LocationDistribution
                                    locationDistributionData={mediaKitData?.locationAnalytics}
                                    instaId={mediaKitData?.instaId}
                                    mode={'public'}
                                />
                            )}
                        </div>
                    </div>

                    {/* Mobile: stack all sections as before */}
                    <div className="md:hidden flex flex-col gap-4 mt-4">
                        <FollowerCount followerCount={mediaKitData?.followers} />
                        <GeneralStats
                            mode="public"
                            instaId={mediaKitData?.instaId}
                            contentAnalytics={mediaKitData?.contentAnalytics}
                            avgLike={mediaKitData?.avgLikes}
                            avgComments={mediaKitData?.avgComments}
                            mediaCount={mediaKitData?.mediaCount}
                            engagement={mediaKitData?.engagement}
                        />
                        {mediaKitData?.genderAnalytics?.isActive && mediaKitData?.genderAnalytics?.genderData && (
                            <GenderDistribution
                                genderAnalytics={mediaKitData?.genderAnalytics}
                                instaId={mediaKitData?.instaId}
                                mode={'public'}
                            />
                        )}
                        {mediaKitData?.ageAnalytics?.isActive && mediaKitData?.ageAnalytics?.ageData && (
                            <AgeDistribution
                                ageDistributionData={mediaKitData?.ageAnalytics}
                                instaId={mediaKitData?.instaId}
                                mode={'public'}
                            />
                        )}
                        {mediaKitData?.locationAnalytics?.isActive && mediaKitData?.locationAnalytics?.locationData && (
                            <LocationDistribution
                                locationDistributionData={mediaKitData?.locationAnalytics}
                                instaId={mediaKitData?.instaId}
                                mode={'public'}
                            />
                        )}
                    </div>

                    {/* Full-width rows for brands and pricing */}
                    {mediaKitData?.brandCollabs?.isActive && mediaKitData?.brandCollabs?.brands && (
                        <div className="mt-8">
                            <BrandCollaboration
                                brandData={mediaKitData?.brandCollabs}
                                instaId={mediaKitData?.instaId}
                                mode={'public'}
                            />
                        </div>
                    )}
                    {mediaKitData?.rateCard?.isActive && (
                        <div className="mt-6">
                            <InstaRateCard
                                rateCardData={mediaKitData?.rateCard}
                                instaId={mediaKitData?.instaId}
                                engagementRate={mediaKitData?.engagementRate}
                                followers={mediaKitData?.followers}
                                mode={'public'}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Link href={'http://dodoclub.in/'} className="flex items-center gap-2 justify-center w-full py-6 bg-white mt-8">
                <div className="text-[#3D4966] text-xs">powered by:</div>
                <Image src={DodoIcon} alt="dodo icon" height={20} />
            </Link>
        </div>
    );
}