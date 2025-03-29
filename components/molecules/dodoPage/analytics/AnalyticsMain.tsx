import React from 'react'
import ClicksIcon from 'public/icons/clicks.svg'
import ClockIcon from 'public/icons/clock.svg'
import CTRIcon from 'public/icons/ctr.svg'
import Image from 'next/image'
import AnalyticsChart from 'components/atoms/Charts/AnalyticsChart'
import TabSwitch from '@components/atoms/TabSwitch/TabSwitch'
import { AnalyticsData } from "types";

const timeRangeOptions = [
    {
        label: "Overall",
        value: "overall",
    },
    {
        label: "Today",
        value: "today",
    },
    {
        label: "This Week",
        value: "thisWeek",
    },
    {
        label: "This Month",
        value: "thisMonth",
    },
];

const formatNumber = (num: number) => {
    if (num >= 1000) {
        const formattedNum = (num / 1000).toFixed(1);
        return formattedNum.endsWith(".0")
            ? formattedNum.slice(0, -2) + "K"
            : formattedNum + "K";
    }
    return num.toString();
};

const AnalyticsMain = ({
    timeRange,
    setTimeRange,
    data,
}: {
    timeRange: string;
    setTimeRange: (value: string) => void;
    data: AnalyticsData;
}) => {
    console.log("data in analytics main", data);
    const handleTimeRangeChange = (value: string) => {
        setTimeRange(value);
    };

    return (
        <div className="flex flex-col gap-3">
            {/* <div className='flex gap-1 items-center'>
        {timeRangeOptions.map((option) => (
          <div key={option.value} className={`text-xs w-full px-3 py-2 ${timeRange === option.value ? 'border-[1px] border-brandPrimary text-black' : 'text-[#979EAD] border-[1px] border-[#E5E7EB]'} rounded-lg bg-white whitespace-nowrap text-center`} onClick={() => handleTimeRangeChange(option.value)}>
            {option.label}
          </div>
        ))}
      </div> */}

            <TabSwitch
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                timeRangeOptions={timeRangeOptions}
                handleTimeRangeChange={handleTimeRangeChange}
            />

            <div className="p-2 flex flex-col bg-white rounded-xl">
                <div className="flex justify-end">
                    <div className="flex items-center border-[1px] border-[#EAE9EC] rounded-full gap-1 px-2 py-1">
                        <div className="flex relative items-center justify-center">
                            <div className="bg-red-500 w-2 h-2 rounded-full"></div>
                            <div className="bg-red-500 w-2 h-2 animate-[ping_1s_ease-in-out_infinite] opacity-75 rounded-full absolute top-0 left-0"></div>
                        </div>
                        <div className="text-[10px]">Live</div>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <AnalyticsChart
                        value1={data.totalViews}
                        value2={data.blockInteractions.length}
                    />
                </div>

                <div className="pt-5 pb-2 flex justify-between px-5">
                    <div className="flex flex-col gap-1">
                        <div className="text-[#414D55] font-bold text-2xl text-center">
                            {data.blockInteractions
                                ? formatNumber(data.blockInteractions.length)
                                : "00"}
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={ClicksIcon} alt="clicks" />
                            <div className="text-xs">Clicks</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="text-[#414D55] font-bold text-2xl text-center">
                            {data.averageDuration
                                ? data.averageDuration + " sec"
                                : "--"}{" "}
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={ClockIcon} alt="clicks" />
                            <div className="text-xs">Avg. Time</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        {/* ctr= clicks/totalViews */}
                        <div className="text-[#414D55] font-bold text-2xl text-center">
                            {data.totalViews
                                ? (data.blockInteractions.length /
                                      data.totalViews) *
                                      100 +
                                  " %"
                                : "--"}{" "}
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={CTRIcon} alt="clicks" />
                            <div className="text-xs">CTR</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsMain