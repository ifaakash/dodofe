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

const MediaKitPage: React.FC<MediaKitPageProps> = ({
    userData = {
        name: "Rajveer Singh",
        avatar: "/images/avatar-placeholder.png",
        roles: ["freelance", "Designer", "Techie"],
        email: "design.rajveer@gmail.com"
    },
    instaStats = {
        followers: "1.2M",
        grade: "B+",
        contentSplit: {
            reel: 55,
            post: 35,
            story: 10
        },
        mediaCount: 120,
        engagement: 24,
        avgLike: "20M",
        avgComments: "150K",
        uploadedFile: {
            name: "filename.png",
            date: "12 may 2025"
        }
    },
    brandCollaborations = [
        {
            brandName: "Brand Name",
            brandLogo: "/icons/coca-cola.png",
            type: "Reel",
            reach: "100K",
            engagement: "10%"
        },
        {
            brandName: "Brand Name 2",
            brandLogo: "/icons/coca-cola.png",
            type: "Reel",
            reach: "100K",
            engagement: "10%"
        }
    ]
}) => {
    return (
        <div className="min-h-screen">
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
                    <BrandSection collaborations={brandCollaborations} />
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
