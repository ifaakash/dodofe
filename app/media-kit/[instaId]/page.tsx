"use client";
import MediaKitPage from "@components/templates/MediaKitPage";
import { getMediaKitByInstaId } from "api/services";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GeneralErrorPage from "@components/templates/errorPages/GeneralError";

const MediaKit = () => {
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
                console.error('Error fetching media kit data:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMediaKitData();
    }, [params.instaId]);

    console.log({
        from: 'MediaKit',
        isError,
        isLoading,
        instaId
    })

    if (isError) {
        return <GeneralErrorPage />;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="py-12 px-4 flex flex-col gap-5 flex-grow">
                    {/* MediaKitHeader Skeleton */}
                    <div className="flex flex-col items-center text-center">
                        <Skeleton circle width={100} height={100} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                        <Skeleton width={200} height={20} className="mt-4" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} width={100} height={32} className="rounded-2xl" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        {/* Follower Count Skeleton */}
                        <div className="bg-white rounded-[10px] p-4">
                            <Skeleton width={150} height={24} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                        </div>

                        {/* General Stats Skeleton */}
                        <div className="bg-white rounded-[10px] p-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <Skeleton width={80} height={16} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                        <Skeleton width={60} height={24} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Distribution Sections Skeleton */}
                        <div className="flex flex-col gap-[10px]">
                            {/* Gender Distribution */}
                            <div className="bg-white rounded-[10px] p-4">
                                <Skeleton width={200} height={24} className="mb-4" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                <div className="flex justify-between items-center">
                                    <Skeleton width={150} height={150} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                    <div className="flex flex-col gap-2">
                                        {[1, 2].map((i) => (
                                            <Skeleton key={i} width={100} height={24} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Age Distribution */}
                            <div className="bg-white rounded-[10px] p-4">
                                <Skeleton width={200} height={24} className="mb-4" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                <Skeleton height={200} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                            </div>

                            {/* Brand Collaboration */}
                            <div className="bg-white rounded-[10px] p-4">
                                <Skeleton width={200} height={24} className="mb-4" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <Skeleton circle width={60} height={60} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                            <Skeleton width={100} height={16} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                            <Skeleton width={80} height={16} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Location Distribution */}
                            <div className="bg-white rounded-[10px] p-4">
                                <Skeleton width={200} height={24} className="mb-4" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                <div className="flex justify-between">
                                    <Skeleton width={200} height={200} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                    <div className="flex flex-col gap-2">
                                        {[1, 2, 3].map((i) => (
                                            <Skeleton key={i} width={120} height={24} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Instagram Rate Card */}
                            <div className="bg-white rounded-[10px] p-4">
                                <Skeleton width={200} height={24} className="mb-4" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex flex-col gap-2 p-3 border rounded-lg">
                                            <Skeleton width={80} height={16} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                            <Skeleton width={100} height={24} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Powered by Footer */}
                <div className="flex items-center gap-2 justify-center w-full py-6">
                    <Skeleton width={60} height={16} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                    <Skeleton width={80} height={20} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                </div>
            </div>
        );
    }

    if (!mediaKitData || !instaId) {
        return <GeneralErrorPage />;
    }

    return <MediaKitPage mediaKitData={mediaKitData} />;
};

export default MediaKit;