import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import Link from "next/link";
import CreatedIcon from "public/icons/CreatedIcon.svg";
import PaidIcon from "public/icons/PaidIcon.svg";
import DueIcon from "public/icons/DuesIcon.svg";
import HalfDonutChart from "@components/atoms/StatsChart/HalfDonutChart";
import { getInvoiceStats } from "api";
import { userDetailsProps } from "types";

interface InvoiceStats {
  outStandingAmount: number;
  pendingAmount: number;
  paidAmount: number;
  invoices: {
    created: number;
    paid: number;
    due: number;
  };
}

interface StatsCardProps {
  userDetails: userDetailsProps;
}

const timePeriods = [
  {
    title: "Overall",
    value: "overall",
  },
  {
    title: "Week",
    value: "week",
  },
  {
    title: "Month",
    value: "month",
  },
  {
    title: "Year",
    value: "year",
  },
];


const StatsCard = ({ userDetails }: StatsCardProps) => {
  const [timePeriod, setTimePeriod] = useState("overall");
  const [userInvoicesData, setUserInvoicesData] = useState<InvoiceStats | null>(null);
  const [loading, setLoading] = useState(false);

  console.log('invoice data', userInvoicesData)


  useEffect(() => {
    const fetchStatsData = async () => {
      setLoading(true);
      const res = await getInvoiceStats({
        userId: userDetails.id,
        timeFrame: timePeriod,
      });
      if (!res.success) {
        console.log("Something went wrong");
        return;
      }
      setUserInvoicesData(res.data);
      setLoading(false);
    };
    fetchStatsData();
  }, [timePeriod, userDetails]);


  return (
    <div className="px-5 flex flex-col gap-2">
      <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
        <div className="w-full flex border-2 rounded-lg">
          {timePeriods.map((time, index) => (
            <button
              key={index}
              onClick={() => setTimePeriod(time.value)}
              className={`p-2 w-full ${timePeriod === time.value ? "bg-[#EAE9EC] font-semibold" : ""
                }`}
            >
              {time.title}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center relative">
            <HalfDonutChart
              paidAmount={userInvoicesData?.paidAmount ?? 0}
              pendingAmount={userInvoicesData?.pendingAmount ?? 0}
            />
            <div className="flex flex-col gap-0.5 absolute bottom-0 items-center">
              <div className="text-[#5E6C84] text-xs font-medium">Get paid</div>
              <div className="font-semibold text-xl">
                ₹{((userInvoicesData?.outStandingAmount ?? 0) + (userInvoicesData?.pendingAmount ?? 0)).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="text-[#5E6C84] text-xs font-medium">
                Paid
              </div>
              <div className="text-[#3D4966] font-semibold">
                ₹{userInvoicesData?.paidAmount?.toLocaleString('en-IN') ?? '0'}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[#5E6C84] text-xs font-medium text-end">
                Pending
              </div>
              <div className="text-[#3D4966] font-semibold">
                ₹{userInvoicesData?.pendingAmount?.toLocaleString('en-IN') ?? '0'}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#C1C7D0] w-full h-[1px]"></div>
        <Link
          href={"/invoice/create"}
          className="border-[1px] border-[#C1C7D0] rounded-[10px] py-3 px-4 flex justify-center gap-1 items-center"
        >
          <div className="text-sm font-medium">Create new invoice</div>
          <FileText size={16} className="text-brandPrimary" />
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="bg-white w-full rounded-xl flex flex-col justify-between p-3 text-center">
          <div className="text-xl font-semibold text-[#414D55]">{userInvoicesData?.invoices.created}</div>
          <div className="flex gap-2 items-center justify-center">
            <div>Created</div>
            <Image src={CreatedIcon} width={20} alt="created icon" />
          </div>
        </div>
        <div className="bg-white w-full rounded-xl flex flex-col justify-between p-3 text-center">
          <div className="text-xl font-semibold text-[#414D55]">{userInvoicesData?.invoices.paid}</div>
          <div className="flex gap-2 items-center justify-center">
            <div>Paid</div>
            <Image src={PaidIcon} width={20} alt="created icon" />
          </div>
        </div>
        <div className="bg-white w-full rounded-xl flex flex-col justify-between p-3 text-center">
          <div className="text-xl font-semibold text-[#414D55]">{userInvoicesData?.invoices.due}</div>
          <div className="flex gap-2 items-center justify-center">
            <div>Due</div>
            <Image src={DueIcon} width={20} alt="created icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
