"use client";
import MediaKitPage from "@components/templates/MediaKitPage";
import { getMediaKitByInstaId } from "api/services";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MediaKit = () => {
    const params = useParams();
    const [mediaKitData, setMediaKitData] = useState<any>(null);
    const instaId = params.instaId;

    useEffect(() => {
        const fetchMediaKitData = async () => {
            try {

                const data = await getMediaKitByInstaId(instaId as string);

                setMediaKitData(data?.data);
            } catch (error) {
                console.error('Error fetching media kit data:', error);
            }
        };

        fetchMediaKitData();
    }, [params.instaId]);

    if(!mediaKitData || !instaId) {
        return <div>Loading...</div>
    }

    return <MediaKitPage mediaKitData={mediaKitData} />;
};

export default MediaKit;