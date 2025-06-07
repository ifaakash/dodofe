"use client";
import React from "react";
import Image from "next/image";
import instaIcon from "public/icons/insta.svg";

interface InstaStats {
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
}

interface InstaSectionProps {
    stats: InstaStats;
}

const InstaSection: React.FC<InstaSectionProps> = ({
    stats = {
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
    }
}) => {
    return (
        <div className="space-y-4">

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F1F9F3] rounded-xl p-4">
                    <div className="text-[#4A4E65] text-2xl font-bold">{stats.mediaCount}</div>
                    <div className="text-[#4A4E65] text-sm">Media Count</div>
                </div>
                <div className="bg-[#FDF3F0] rounded-xl p-4">
                    <div className="text-[#4A4E65] text-2xl font-bold">{stats.engagement}%</div>
                    <div className="text-[#4A4E65] text-sm">Engagement</div>
                </div>
                <div className="bg-[#F3EFFD] rounded-xl p-4">
                    <div className="text-[#4A4E65] text-2xl font-bold">{stats.avgLike}</div>
                    <div className="text-[#4A4E65] text-sm">Avg. Like</div>
                </div>
                <div className="bg-[#EFF6FF] rounded-xl p-4">
                    <div className="text-[#4A4E65] text-2xl font-bold">{stats.avgComments}</div>
                    <div className="text-[#4A4E65] text-sm">Avg. Comments</div>
                </div>
            </div>

            {/* Content Split Visualization */}
            <div className="bg-white rounded-xl p-6 relative h-[200px]">
                {/* Reel Circle */}
                <div
                    className="absolute"
                    style={{
                        left: '20%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '140px',
                        height: '140px',
                        background: 'rgba(255, 192, 203, 0.1)',
                        borderRadius: '50%',
                    }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-pink-500 text-2xl font-bold">{stats.contentSplit.reel}%</div>
                        <div className="text-sm text-gray-400">REEL</div>
                    </div>
                </div>

                {/* Post Circle */}
                <div
                    className="absolute"
                    style={{
                        right: '25%',
                        top: '50%',
                        transform: 'translate(0, -50%)',
                        width: '100px',
                        height: '100px',
                        background: 'rgba(173, 216, 230, 0.1)',
                        borderRadius: '50%',
                    }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-blue-400 text-xl font-bold">{stats.contentSplit.post}%</div>
                        <div className="text-sm text-gray-400">POST</div>
                    </div>
                </div>

                {/* Story Circle */}
                <div
                    className="absolute"
                    style={{
                        right: '15%',
                        bottom: '20%',
                        width: '70px',
                        height: '70px',
                        background: 'rgba(255, 182, 193, 0.1)',
                        borderRadius: '50%',
                    }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-red-300 text-lg font-bold">{stats.contentSplit.story}%</div>
                        <div className="text-xs text-gray-400">STORY</div>
                    </div>
                </div>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-2">
                {/* File Upload Info */}
                {stats.uploadedFile && (
                    <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-600">{stats.uploadedFile.name}</span>
                        </div>
                        <button className="text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Upload Date and Re-upload Button */}
                {stats.uploadedFile && (
                    <div className="rounded-xl pt-4 flex justify-between items-center">
                        <div>
                            <div className="text-sm">Uploaded on</div>
                            <div className="text-gray-700">{stats.uploadedFile.date}</div>
                        </div>
                        <button className="flex items-center gap-2 text-green-600">
                            <span>Re-upload</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstaSection;
