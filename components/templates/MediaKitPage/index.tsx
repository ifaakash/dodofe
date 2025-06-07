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

const MediaKitPage: React.FC<any> = ({
    userData,
    followers,
    grade,
    contentSplit,
    mediaCount,
    engagement,
    avgLike,
    avgComments,
    uploadedFile,
    brandCollaborations
}) => {
    const instaStats = {
        followers,
        grade,
        contentSplit,
        mediaCount,
        engagement,
        avgLike,
        avgComments,
        uploadedFile
    };
    console.log(instaStats)
    return (
        <div className="min-h-screen">
            <Header />

            {/* Main container with max width and centered */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Bio Section */}
                <div className="mb-4">
                    <BioSection {...userData} />
                </div>

                <div className="mb-4">
                    <InstaFollowerSection
                        followers={instaStats.followers}
                        grade={instaStats.grade}
                    />
                </div>

                <div className="mb-4">
                    <div className="bg-white rounded-2xl shadow-sm p-6 pt-8">
                        <InstaSection stats={instaStats} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                    <BrandSection
                        collaborations={brandCollaborations}
                        onCollaborationAdded={() => {
                            // Trigger a refetch of the media kit data
                            if (typeof window !== 'undefined') {
                                window.location.reload();
                            }
                        }}
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                    <AgeDistributionSection />
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                    <GenderDistributionSection />
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                    <LocationDistributionSection />
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                    <InstagramPriceSection />
                </div>
            </div>
        </div>
    );
};

export default MediaKitPage;
