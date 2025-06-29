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

    if(isError) {
        return <GeneralErrorPage />;
    }

    if(isLoading) {
        return (
            <div className="p-4 max-w-3xl mx-auto">
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-8">
                    <Skeleton circle width={120} height={120} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                    <Skeleton width={200} height={24} className="mt-4" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                    <Skeleton width={150} height={20} className="mt-2" baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                </div>

                {/* Content Sections */}
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-2 rounded-lg">
                            <Skeleton height={150} baseColor="#c4c4c4" highlightColor="#dbdbdb" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if(!mediaKitData || !instaId) {
        return <GeneralErrorPage />;
    }

    return <MediaKitPage mediaKitData={mediaKitData} />;
};

export default MediaKit;