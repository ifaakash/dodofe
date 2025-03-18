"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronsRight } from "lucide-react";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { formatCurrency, formatDate } from "@utils/helperFunctions";
import { InvoiceHistoryCard, StatusBadgeProps } from "types";
import { InvoiceProps } from "types";
import MarkAsPaidButton from "./MarkAsPaidButton";
import Link from "next/link";

const StatusBadge = ({ isDue, status, isExpanded }: StatusBadgeProps) => {
  const getBgColor = () => {

    if (status === "paid") return "bg-brandPrimary";
    if (isDue) return "bg-[#FFA742]";
    return "bg-[#979EAD]";
  };

  return (
    <div
      className={` ${getBgColor()} w-fit ${isExpanded ? "rounded-tl-lg  rounded-br-lg" : "rounded-l-lg"
        } flex justify-center items-center max-w-[21px] transition-all duration-300`}
    >
      <div className="text-[10px] text-white h-fit -rotate-90">
        {isDue ? "Due" : status === "paid" ? "Paid" : "Unpaid"}
      </div>
    </div>
  );
};

const totalAmount = (invoice: InvoiceProps) => {
  if (!invoice || !invoice.items) return 0;

  const totalItemCost = invoice.items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const discountAmount = (invoice.discount / 100) * totalItemCost;
  const discountedTotal = totalItemCost - discountAmount;
  const gstAmount = (invoice.gst / 100) * discountedTotal;
  const tdsAmount = (invoice.tds / 100) * discountedTotal;
  const finalAmount = discountedTotal + gstAmount - tdsAmount;

  return finalAmount;
};

const HistoryInvoiceCard = ({
  invoice,
  onEdit,
  onMarkAsPaid,
  isExpanded,
  handleCardExpand,
  setIsPaymentStatusChanged,
}: InvoiceHistoryCard) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Measure the expanded content height
  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContentHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(contentRef.current);

      return () => {
        if (contentRef.current) {
          resizeObserver.unobserve(contentRef.current);
        }
      };
    }
  }, [isExpanded]);

  const isDue = useMemo(() => {
    return new Date(invoice.dueDate) < new Date();
  }, [invoice.dueDate]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleCardExpand(invoice.id);
    }
  };

  const invoiceNumber = ({ number, year }: { number: number; year: number }) => {
    const yearSuffix = year.toString().slice(-2);
    return `${yearSuffix}${number.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="bg-white flex flex-col rounded-xl hover:shadow-md transition-all duration-300"
      onClick={() => handleCardExpand(invoice.id)}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <div className="flex gap-3">
        <StatusBadge
          isDue={isDue}
          status={invoice.status}
          isExpanded={isExpanded}
        />

        <div className="flex justify-between w-full items-center pr-3">
          <div className="flex flex-col gap-0.5 py-3">
            <div className="text-xs">
              {invoice.subHeading ||
                invoiceNumber({ number: invoice.invoiceNumber, year: new Date().getFullYear() })}
            </div>
            <div className="text-[#414D55] font-semibold">
              {"clientDetails" in invoice
                ? invoice.clientDetails.name
                : "Client Name"}
            </div>
          </div>

          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${contentHeight + 100}px` : '0px',
          opacity: isExpanded ? 1 : 0
        }}
      >
        <div ref={contentRef} className="p-3 flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="text-xs">Amount</div>
            <div className="text-[#414D55] font-semibold">
              {formatCurrency(totalAmount(invoice))}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="text-xs">Invoice number</div>
              <div className="text-[#414D55] font-semibold">
                {invoiceNumber({ number: invoice.invoiceNumber, year: new Date().getFullYear() })}
              </div>
            </div>

            <div className="flex flex-col gap-0.5 text-right">
              <div className="text-xs">Due date</div>
              <div className="text-[#414D55] font-semibold">
                {formatDate(invoice.dueDate)}
              </div>
            </div>
          </div>

          <hr className="border-dashed border-[#C1C7D0] my-2" />

          <div className="flex gap-2">
            {/* Edit Button */}
            <Link
              href={`/invoice/review/${invoice.id}`}
              className="border-[1px] border-[#CEF2DC] py-2 px-[10px] rounded-full flex items-center gap-[6px] w-[100px] justify-center cursor-pointer"
            >
              <div className="text-xs font-bold">Edit</div>
              <Image src={EditPen} width={16} height={16} alt="edit" />
            </Link>

            <MarkAsPaidButton invoice={invoice} setIsPaymentStatusChanged={setIsPaymentStatusChanged} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryInvoiceCard;