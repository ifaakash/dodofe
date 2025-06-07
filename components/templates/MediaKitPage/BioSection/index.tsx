"use client";
import React from "react";
import Image from "next/image";

interface BioSectionProps {
    name?: string;
    avatar?: string;
    roles?: string[];
    email?: string;
}

const BioSection: React.FC<BioSectionProps> = ({
    name = "Rajveer Singh",
    avatar = "/images/avatar-placeholder.png",
    roles = ["freelance", "Designer", "Techie"],
    email = "design.rajveer@gmail.com"
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 max-w-sm mx-auto">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-green-100 to-orange-100 p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                        src={avatar}
                        alt={name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Name */}
            <h1 className="mt-4 text-2xl font-bold text-gray-800">{name}</h1>

            {/* Roles */}
            <div className="mt-2 flex items-center gap-2">
                {roles.map((role, index) => (
                    <React.Fragment key={role}>
                        <span className="text-gray-600">{role}</span>
                        {index < roles.length - 1 && (
                            <span className="text-gray-400">•</span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Email */}
            <div className="mt-3 flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
                <span className="text-gray-600">{email}</span>
            </div>

            {/* Collab Button */}
            {/* <button
                className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
                Collab with me
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                </svg>
            </button> */}
        </div>
    );
};

export default BioSection;