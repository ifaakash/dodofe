import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import Link from "next/link";
import CreatedIcon from "public/icons/CreatedIcon.svg";
import PaidIcon from "public/icons/PaidIcon.svg";
import DueIcon from "public/icons/DuesIcon.svg";
import { getInvoiceStats } from "api";
import { userDetailsProps, Timeframe } from "types";
import { useRouter } from "next/navigation";
import HalfDonutChart from "@components/atoms/Charts/HalfDonutChart";
import TabSwitch from "@components/atoms/TabSwitch/TabSwitch";
import { TIME_PERIODS } from "@utils/constants";
import { UserInvoicesData } from "types";

interface StatsCardProps {
    userInvoicesData: UserInvoicesData;
    setTimePeriod: (value: Timeframe) => void;
    timePeriod: Timeframe;
}

const StatsCard = ({
    userInvoicesData,
    setTimePeriod,
    timePeriod,
}: StatsCardProps) => {
    const router = useRouter();

    const handleTimePeriodChange = (value: Timeframe) => {
        setTimePeriod(value);
    };

    return (
        <div className="px-5 flex flex-col gap-2">
            <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
                <TabSwitch
                    timeRange={timePeriod}
                    setTimeRange={setTimePeriod}
                    timeRangeOptions={TIME_PERIODS.map((time) => ({
                        label: time.label,
                        value: time.value as Timeframe,
                    }))}
                    handleTimeRangeChange={handleTimePeriodChange}
                />

                <div className="flex flex-col gap-3">
                    <div className="flex justify-center relative">
                        {userInvoicesData ? (
                            <HalfDonutChart
                                paidAmount={userInvoicesData?.paidAmount ?? 0}
                                pendingAmount={
                                    userInvoicesData?.unpaidAmount ?? 0
                                }
                            />
                        ) : (
                            <div className="flex justify-center items-center h-[200px]">
                                <div className="text-sm font-medium">
                                    Not Enough Data Available
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-0.5 absolute bottom-0 items-center">
                            <div className="text-[#5E6C84] text-xs font-medium">
                                Get paid
                            </div>
                            <div className="font-semibold text-xl">
                                ₹
                                {(
                                    (userInvoicesData?.outStandingAmount ?? 0) +
                                    (userInvoicesData?.unpaidAmount ?? 0)
                                ).toLocaleString("en-IN")}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-0.5">
                            <div className="text-[#5E6C84] text-xs font-medium">
                                Paid
                            </div>
                            <div className="text-[#3D4966] font-semibold">
                                ₹
                                {userInvoicesData?.paidAmount?.toLocaleString(
                                    "en-IN"
                                ) ?? "--"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="text-[#5E6C84] text-xs font-medium text-end">
                                Pending
                            </div>
                            <div className="text-[#3D4966] font-semibold text-end">
                                ₹
                                {userInvoicesData?.unpaidAmount?.toLocaleString(
                                    "en-IN"
                                ) ?? "--"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#C1C7D0] w-full h-[1px]"></div>
                <div
                    onClick={() => router.push("/invoice/create")}
                    className="cursor-pointer border-[1px] border-[#C1C7D0] rounded-[10px] py-3 px-4 flex justify-center gap-1 items-center"
                >
                    <div className="text-sm font-bold">Create new invoice</div>
                    <FileText size={16} className="text-brandPrimary" />
                </div>
            </div>

            <div className="flex gap-2">
                <Link
                    href={"/invoice/history?mode=all"}
                    className="bg-white w-full rounded-xl flex flex-col justify-between p-3 text-center"
                >
                    <div className="text-xl font-semibold text-[#414D55]">
                        {userInvoicesData?.invoices.created
                            ? userInvoicesData?.invoices.created
                            : "--"}
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <div>Created</div>
                        <Image
                            src={CreatedIcon}
                            width={20}
                            alt="created icon"
                        />
                    </div>
                </Link>
                <Link
                    href={"/invoice/history?mode=paid"}
                    className="bg-white w-full rounded-xl flex flex-col justify-between p-3 text-center"
                >
                    <div className="text-xl font-semibold text-[#414D55]">
                        {userInvoicesData?.invoices.paid
                            ? userInvoicesData?.invoices.paid
                            : "--"}
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <div>Paid</div>
                        <Image src={PaidIcon} width={20} alt="created icon" />
                    </div>
                </Link>
                <Link
                    href={"/invoice/history?mode=due"}
                    className="bg-white w-full rounded-xl flex flex-col justify-between p-3 text-center"
                >
                    <div className="text-xl font-semibold text-[#414D55]">
                        {userInvoicesData?.invoices.due
                            ? userInvoicesData?.invoices.due
                            : "--"}
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <div>Due</div>
                        <Image src={DueIcon} width={20} alt="created icon" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default StatsCard;
