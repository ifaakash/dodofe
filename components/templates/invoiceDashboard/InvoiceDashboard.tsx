"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LeftArrow from "public/icons/leftArrow.svg";
import HelpIcon from "public/icons/HelpIcon.svg";
import RightArrow from "public/icons/rightArrow.svg";
import LastInvoiceCard from "@components/molecules/InvoiceDashboard/LastInvoiceCard";
import RunningGirl from "public/assets/RunningGirl.svg";
import StatsCard from "@components/molecules/InvoiceDashboard/StatsCard";
import { getAllInvoices } from "api";
import { userDetailsProps, InvoiceProps } from "types";

interface DashboardProps {
  userDetails: userDetailsProps;
}

const InvoiceDashboard = ({ userDetails }: DashboardProps) => {
  const [invoices, setInvoices] = useState<InvoiceProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const res = await getAllInvoices({ userId: userDetails?.id });
        if (res && res.data) {
          // Sort invoices by createdAt in descending order and take the latest 2
          const sortedInvoices = res.data.sort((a: InvoiceProps, b: InvoiceProps) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

  return (
    <div className="flex flex-col">
      <div className="bg-[#D8D6DC] h-48 w-full flex flex-col gap-6 h-full">
        <div className="pt-12">
          <div className="pt-[10px] px-5 flex gap-[10px] items-center justify-between w-full">
            <div className="flex gap-[10px] items-center">
              <Link href={"/"} className="p-2">
                <Image src={LeftArrow} width={20} alt="left arrow" />
              </Link>
              <div className="font-semibold">Invoice Dashboard</div>
            </div>
            <div className="flex p-1 gap-1 rounded-full bg-[#EAE9EC] font-medium text-xs text-[#3D4966] items-center">
              <Image src={HelpIcon} width={20} alt="help icon" />
              <div>Help</div>
            </div>
          </div>
          <StatsCard userDetails={userDetails} />
        </div>

        <div className="px-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Last invoices</div>
            <Link href={'/invoice/history'} className="flex items-center gap-0.5 cursor-pointer">
              <div className="text-xs font-semibold">View All</div>
              <Image src={RightArrow} width={16} alt="right arrow" />
            </Link>
          </div>

          {invoices.length > 0 ? (
            <div className="flex flex-col gap-2">
              {invoices.map((invoice) => (
                <LastInvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center text-sm">
              No invoices available.
            </div>
          )}
        </div>

        <div className="mt-[100px] px-5 flex py-10 items-center">
          <div className="text-[#CDCBD2] text-[40px] leading-10 font-bold">
            Create Track <br /> Get Paid
          </div>
          <Image src={RunningGirl} width={150} height={210} alt="running" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDashboard;