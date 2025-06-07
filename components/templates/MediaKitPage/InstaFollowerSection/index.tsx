"use client";
import React from "react";
import Image from "next/image";
import instaIcon from "public/icons/insta.svg";

interface InstaFollowerSectionProps {
    followers: string;
    grade: string;
}

const InstaFollowerSection: React.FC<InstaFollowerSectionProps> = ({
    followers = "1.2M",
    grade = "B+"
}) => {
    return (
        <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm mb-1 relative z-10">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                    <Image
                        src={instaIcon}
                        alt="Instagram"
                        width={32}
                        height={32}
                        className="w-full h-full"
                    />
                </div>
                <div>
                    <div className="text-gray-600 text-sm">Instagram followers</div>
                    <div className="text-xl font-bold">{followers}</div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold text-orange-500">{grade}</div>
                <div className="text-sm text-gray-500">Grade</div>
            </div>
        </div>
    );
};

export default InstaFollowerSection;
