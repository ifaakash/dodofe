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
import { getAllInvoices } from "api";
import { userDetailsProps, InvoiceProps } from "types";
import { Header } from "@components/molecules/Header";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@utils/constants";
import useLoaderVisibility from "hooks/useLoaderVisibility";

interface DashboardProps {
  userDetails: userDetailsProps;
}

const InvoiceDashboard = ({ userDetails }: DashboardProps) => {
  const [invoices, setInvoices] = useState<InvoiceProps[]>([]);
  const { isVisible: isLoaderVisible } = useLoaderVisibility();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

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


  const onBackClick = () => {
    router.push(ROUTE_CONSTANTS.HOME);
  };

  return (
    <div className="flex flex-col">
         <div className="h-64 bg-[#D8D6DC] absolute top-0 left-0 right-0 -z-10"></div>
      <div className="pt-20 w-full flex flex-col gap-6 h-full">
        <Header onBackClick={onBackClick} title="Invoice Dashboard" />

        {/* <div className="pt-[10px] px-5 flex gap-[10px] items-center justify-between w-full">
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
          </div> */}

        {userDetails && <StatsCard userDetails={userDetails} />}

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
            isLoaderVisible ? (
              <div className="text-gray-500 text-center text-sm" style={{ minHeight: '480px' }} >
                No invoices available.
              </div>) : null

          )}
        </div>

        <div className="mt-[80px] px-5 flex flex-col gap-2 py-10 items-center">
          <Image src={InvoiceFootImg} width={150} height={150} alt="running" />
          <div className="text-2xl font-semibold text-gray-400">Create Track Get <span className="text-brandPrimary">Paid</span></div>
        </div>
      </div>
    </div >
  );
};

export default InvoiceDashboard;