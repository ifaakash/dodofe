import React from "react";

const MediaKitAgeChart = ({ ageDistributionData }: { ageDistributionData: { age: string; percentage: number }[] }) => {
    return (
        <div className="flex flex-col gap-2 w-full py-2">
            {ageDistributionData.map((data, index) => (
                <div key={index} className="flex items-center w-full">
                    <div className="relative flex-1 h-[18px] rounded-[4px] overflow-hidden flex items-center bg-[#F4F4F6]">
                        <div
                            className="bg-[#3E4863] flex items-center h-[18px] rounded-[4px] transition-all duration-300 justify-end min-w-[24px]"
                            style={{ width: `${data.percentage}%` }}
                        >
                            <span className="text-white h-[18px] flex items-center text-[8px] font-semibold pr-2 whitespace-nowrap truncate">
                                {data.percentage}%
                            </span>
                        </div>
                    </div>
                    <div className="ml-3 min-w-[48px] text-[#6B7897] text-[10px] font-medium text-right">
                        {data.age}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MediaKitAgeChart;