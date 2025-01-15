import React from "react";

export default function RectangleSelector({ linkLayout, setLinkLayout }: any) {
    return (
        <div className="flex space-x-4 p-2 bg-gray-700 rounded-lg max-w-md">
            <div
                onClick={() => setLinkLayout("big")}
                className={`flex items-center justify-center w-[75px] h-[40px] rounded-lg cursor-pointer transition-all duration-300 ${linkLayout === "big"
                    ? "bg-white text-gray-700 shadow-md"
                    : "bg-gray-700 text-white"
                    }`}
            >
                <div
                    className={`w-10 h-2 rounded border-2 ${linkLayout === "big" ? "border-gray-500" : "border-white"
                        }`}
                />
            </div>

            <div
                onClick={() => setLinkLayout("small")}
                className={`flex items-center justify-center w-[75px] h-[40px] rounded-lg cursor-pointer transition-all duration-300 ${linkLayout === "small"
                    ? "bg-white text-gray-700 shadow-md"
                    : "bg-gray-700 text-white"
                    }`}
            >
                <div
                    className={`w-10 h-4 rounded border-2 ${linkLayout === "small" ? "border-gray-500" : "border-white"
                        }`}
                />
            </div>
        </div>
    );
}
