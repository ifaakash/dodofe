"use client";
import MediaKitPage from "@components/templates/MediaKitPage";
import { getMediaKit } from "../../../api/services";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MediaKit = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const [mediaKitData, setMediaKitData] = useState<any>(null);

    useEffect(() => {
        const fetchMediaKitData = async () => {
            try {
                const kitId = params.kitId as string;
                const instaId = searchParams.get('instaId') || 'nutritionwithpalaknagpal';
                const data = await getMediaKit(instaId || undefined);

                setMediaKitData(data?.data);
            } catch (error) {
                console.error('Error fetching media kit data:', error);
            }
        };

        fetchMediaKitData();
    }, [params.kitId, searchParams]);


    return <MediaKitPage {...mediaKitData} />;
};

export default MediaKit;