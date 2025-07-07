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
                    <div className="relative flex-1 h-[24px] rounded-[4px] overflow-hidden flex items-center bg-gray-100">
                        <div
                            className="bg-slate-700 flex items-center h-[24px] rounded-[4px] transition-all duration-300 justify-end min-w-[24px]"
                            style={{ width: `${data.percentage}%` }}
                        >

                        </div>
                        <span className="text-slate-700 h-[24px] flex items-center text-[10px] font-bold p-2 whitespace-nowrap truncate">
                            {data.percentage}%
                        </span>
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