"use client";
import React from 'react';

interface LocationData {
    city: string;
    percentage: number;
}

interface FileInfo {
    name: string;
    date: string;
}

interface LocationDistributionProps {
    distributions?: LocationData[];
    uploadedFile?: FileInfo;
    onReupload?: () => void;
    onDelete?: () => void;
}

const LocationDistributionSection: React.FC<LocationDistributionProps> = ({
    distributions = [
        { city: 'Delhi', percentage: 20 },
        { city: 'Lucknow', percentage: 32 },
        { city: 'Mumbai', percentage: 15 },
        { city: 'Gujrat', percentage: 40 }
    ],
    uploadedFile = {
        name: "filename.png",
        date: "12 may 2025"
    },
    onReupload,
    onDelete
}) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <span className="text-[#2196F3] font-bold text-xl">Location</span>
                <span className="text-gray-400 uppercase text-xl tracking-wider">DISTRIBUTION</span>
                <div className="ml-auto">
                    <button className="bg-white rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#2196F3]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Distribution Bars */}
            <div className="space-y-4">
                {distributions.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-20">
                            <span className="text-[#47466A] text-sm">{item.city}</span>
                        </div>
                        <div className="flex-1">
                            <div className="h-8 bg-gray-50 rounded-lg overflow-hidden">
                                <div
                                    className="h-full bg-[#47466A] rounded-lg transition-all duration-500 ease-out"
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                        <div className="w-12 text-right">
                            <span className="text-[#47466A] text-sm">{item.percentage}%</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* File Upload Section */}
            <div className="bg-gray-50 rounded-xl p-4">
                {/* File Upload Info */}
                {uploadedFile && (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-600">{uploadedFile.name}</span>
                        </div>
                        <button
                            className="text-red-500"
                            onClick={onDelete}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Upload Date and Re-upload Button */}
                {uploadedFile && (
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <div className="text-sm text-gray-500">Uploaded on</div>
                            <div className="text-gray-700">{uploadedFile.date}</div>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-green-600 shadow-sm"
                            onClick={onReupload}
                        >
                            <span>Re-upload</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Upload Prompt when no file */}
                {!uploadedFile && (
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-2">
                        {/* File Upload Info */}
                        {uploadedFile && (
                            <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600">{uploadedFile.name}</span>
                                </div>
                                <button className="text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Upload Date and Re-upload Button */}
                        {uploadedFile && (
                            <div className="rounded-xl pt-4 flex justify-between items-center">
                                <div>
                                    <div className="text-sm">Uploaded on</div>
                                    <div className="text-gray-700">{uploadedFile.date}</div>
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
                )}
            </div>
        </div>
    );
};

export default LocationDistributionSection; 