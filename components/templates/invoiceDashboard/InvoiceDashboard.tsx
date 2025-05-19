"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LeftArrow from "public/icons/leftArrow.svg";
import HelpIcon from "public/icons/HelpIcon.svg";
import RightArrow from "public/icons/rightArrow.svg";
import LastInvoiceCard from "@components/molecules/InvoiceDashboard/LastInvoiceCard";
import InvoiceFootImg from "public/assets/InvoiceFootImg.png";
import StatsCard from "@components/molecules/InvoiceDashboard/StatsCard";
import { getAllInvoices, getInvoiceStats } from "api";
import { userDetailsProps, InvoiceProps, Timeframe } from "types";
import { Header } from "@components/molecules/Header";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@utils/constants";
import { UserInvoicesData } from "types";
import useLoaderVisibility from "hooks/useLoaderVisibility";

interface DashboardProps {
  userDetails: userDetailsProps;
}

const InvoiceDashboard = ({ userDetails }: DashboardProps) => {
  const [invoices, setInvoices] = useState<InvoiceProps[]>([]);
  const [timePeriod, setTimePeriod] = useState<Timeframe>("overall");
  const { isVisible: isLoaderVisible } = useLoaderVisibility();
  const [userInvoicesData, setUserInvoicesData] = useState<UserInvoicesData | null>(null);
  const [isPaymentStatusChanged, setIsPaymentStatusChanged] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const res = await getAllInvoices({ userId: userDetails?.id });
        console.log("res", res);
        if (res && res.data) {
          // Sort invoices by invoiceDate in descending order and take the latest 2
          const sortedInvoices = res.data.sort((a: InvoiceProps, b: InvoiceProps) =>
            new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime()
          ).slice(0, 2);
          setInvoices(sortedInvoices);
        }
      } catch (err) {
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [userDetails]);

  useEffect(() => {
    const fetchStatsData = async () => {
      setLoading(true);
      const res = await getInvoiceStats({
        userId: userDetails?.id,
        timeFrame: timePeriod,
      });
      if (!res.success) {
        console.log("Something went wrong");
        return;
      }
      setUserInvoicesData(res.data);
      setIsPaymentStatusChanged(false);
      setLoading(false);
    };

    if (userDetails?.id) {
      fetchStatsData();
    }
  }, [timePeriod, userDetails, isPaymentStatusChanged]);

  const onBackClick = () => {
    router.push(ROUTE_CONSTANTS.HOME);
  };

  return (
    <div className="flex flex-col">
      <div className="h-64 bg-[#D8D6DC] absolute top-0 left-0 right-0 -z-10"></div>
      <div className="pt-20 w-full flex flex-col gap-6 h-full">
        <Header onBackClick={onBackClick} title="Invoice Dashboard" />

        {userDetails && (
          <StatsCard
            userInvoicesData={userInvoicesData}
            setTimePeriod={setTimePeriod}
            timePeriod={timePeriod}
          />
        )}

        <div className="px-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Last 2 invoices</div>
            <Link
              href={"/invoice/history"}
              className="flex items-center gap-0.5 cursor-pointer"
            >
              <div className="text-xs font-semibold">View All</div>
              <Image
                src={RightArrow}
                width={16}
                alt="right arrow"
              />
            </Link>
          </div>

          {invoices.length > 0 ? (
            <div className="flex flex-col gap-2">
              {invoices.map((invoice) => (
                <LastInvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  setIsPaymentStatusChanged={
                    setIsPaymentStatusChanged
                  }
                />
              ))}
            </div>
          ) : isLoaderVisible ? (
            <div
              className="text-gray-500 text-center text-sm"
              style={{ minHeight: "480px" }}
            >
              No invoices available.
            </div>
          ) : null}
        </div>

        <div className="mt-[80px] px-5 flex flex-col gap-2 py-10 items-center">
          <Image
            src={InvoiceFootImg}
            width={150}
            height={150}
            alt="running"
          />
          <div className="text-2xl font-semibold text-gray-400">
            Create Track Get{" "}
            <span className="text-brandPrimary">Paid</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDashboard;