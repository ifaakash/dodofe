import React from "react";

const MediaKitAgeChart = ({ ageData }: { ageData: { [key: string]: number } }) => {

    const ageGroups = Object.entries(ageData?.ageGroups).map(([age, percentage]) => ({
        age,
        percentage
    }));

    return (
        <div className="flex flex-col gap-2 w-full py-2">
            {ageGroups?.map((data, index) => (
                <div key={index} className="flex items-center w-full">
                    <div className="relative flex-1 h-[18px] rounded-[4px] overflow-hidden flex items-center bg-gray-100">
                        <div
                            className="bg-slate-700 flex items-center h-[18px] rounded-[4px] transition-all duration-300 justify-end min-w-[24px]"
                            style={{ width: `${data.percentage}%` }}
                        >
                            <span className="text-white h-[18px] flex items-center text-[10px] font-medium p-2 whitespace-nowrap truncate">
                                {data.percentage}%
                            </span>
                        </div>
                    </div>
                    <div className="ml-3 min-w-[48px] text-slate-500 text-xs font-medium text-right">
                        {data.age}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MediaKitAgeChart;