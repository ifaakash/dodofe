"use client";
import React, { useEffect, useState } from "react";
import LeftArrow from "public/icons/leftArrow.svg";
import Image from "next/image";
import Link from "next/link";
import InvoiceHistoryCard from "@components/molecules/InvoiceDashboard/HistoryInvoiceCard";
import { getAllInvoices } from "api";
import { InvoiceProps } from "types";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";



const InvoiceHistory = () => {
  const [timeFrame, setTimeFrame] = useState("all");
  const [invoices, setInvoices] = useState<InvoiceProps[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceProps[]>([]);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await getAllInvoices({
          userId: userId,
        });
        if (res) {
          setInvoices(res.data);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  // TODO : Filter invoices based on timeFrame
  useEffect(() => {
    if (timeFrame === "all") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) => invoice.status.toLowerCase() === timeFrame)
      );
    }
  }, [timeFrame, invoices]);

  return (
    <div className="flex flex-col px-5 gap-4">
      <Link
        href={"/invoice"}
        className="py-[10px] flex gap-[10px] items-center"
      >
        <div className="p-2">
          <Image src={LeftArrow} width={20} alt="left arrow" />
        </div>
        <div className="uppercase font-semibold text-[#1C1C1C]">
          INVOICE HISTORY
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex border border-gray-300 rounded-lg">
          {["All", "Unpaid", "Paid", "Overdue"].map((label, index) => (
            <div
              key={label}
              onClick={() => setTimeFrame(label.toLowerCase())}
              className={`py-2 px-3 w-full text-sm text-center cursor-pointer
                ${
                  index === 0
                    ? "rounded-l-lg"
                    : index === 3
                    ? "rounded-r-lg"
                    : ""
                }
                ${
                  timeFrame === label.toLowerCase()
                    ? "bg-white text-brandPrimary font-medium"
                    : "bg-[#F2F1F3]"
                }
              `}
              role="tab"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice, index) => (
              <div key={index}>
                <InvoiceHistoryCard invoice={invoice} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No invoices found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;
