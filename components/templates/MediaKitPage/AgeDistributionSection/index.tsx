"use client";
import React from 'react';

interface AgeRange {
    range: string;
    percentage: number;
}

interface FileInfo {
    name: string;
    date: string;
}

interface AgeDistributionProps {
    distributions?: AgeRange[];
    uploadedFile?: FileInfo;
    onReupload?: () => void;
    onDelete?: () => void;
}

const AgeDistributionSection: React.FC<AgeDistributionProps> = ({
    distributions = [
        { range: '15-24', percentage: 15 },
        { range: '25-34', percentage: 55 },
        { range: '35-44', percentage: 32 },
        { range: '45-54', percentage: 20 }
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
                <span className="text-[#FF4085] font-bold text-xl">Age</span>
                <span className="text-gray-400 uppercase text-xl tracking-wider">DISTRIBUTION</span>
            </div>

            {/* Distribution Bars */}
            <div className="space-y-4">
                {distributions.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <div
                                    className="h-full bg-[#47466A] rounded-lg transition-all duration-500 ease-out"
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                        <div className="w-16 text-right text-[#47466A]">
                            {item.range}
                        </div>
                    </div>
                ))}
            </div>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-2">
                {/* File Upload Info */}
                {uploadedFile && (
                    <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
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
                    <div className="rounded-xl pt-4 flex justify-between items-center">
                        <div>
                            <div className="text-sm text-gray-500">Uploaded on</div>
                            <div className="text-gray-700">{uploadedFile.date}</div>
                        </div>
                        <button
                            className="flex items-center gap-2 text-green-600"
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

export default AgeDistributionSection; 