"use client";

import React, { useEffect, useMemo } from "react";
import { ChevronDown, ChevronsRight } from "lucide-react";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { formatCurrency, formatDate } from "@utils/helperFunctions";
import { InvoiceHistoryCard, StatusBadgeProps } from "types";
import { InvoiceProps } from "types";

const StatusBadge = ({ isDue, status, isExpanded }: StatusBadgeProps) => {
  const getBgColor = () => {
    if (isDue) return "bg-[#FFA742]";
    if (status === "paid") return "bg-brandPrimary";
    return "bg-[#979EAD]";
  };

  return (
    <div
      className={` ${getBgColor()} w-fit ${isExpanded ? "rounded-tl-lg  rounded-br-lg" : "rounded-l-lg"
        } flex justify-center items-center max-w-[21px]`}
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
}: InvoiceHistoryCard) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const isDue = useMemo(() => {
    return new Date(invoice.dueDate) < new Date();
  }, [invoice.dueDate]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className="bg-white flex flex-col rounded-xl hover:shadow-md transition-shadow"
      onClick={() => setIsExpanded(!isExpanded)}
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
                `Invoice Number: ${invoice.invoiceNumber
                  .toString()
                  .padStart(3, "0")}`}
            </div>
            <div className="text-[#414D55] font-semibold">
              {'clientDetails' in invoice ? invoice.clientDetails.name : 'Client Name'}
            </div>
          </div>

          <ChevronDown
            size={16}
            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-3 flex flex-col gap-3">
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
                {invoice.invoiceNumber.toString().padStart(3, "0")}
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
            <button
              onClick={onEdit}
              className="border border-[#CEF2DC] py-2 px-[10px] rounded-full flex items-center gap-[6px] w-[100px] justify-center hover:bg-[#CEF2DC] transition-colors"
              aria-label="Edit invoice"
            >
              <span className="text-xs font-bold">Edit</span>
              <Image src={EditPen} width={16} height={16} alt="" />
            </button>

            <button
              onClick={onMarkAsPaid}
              className="flex items-center bg-[#EAE9EC] w-full rounded-full gap-[10px] hover:bg-[#dedde0] transition-colors"
              aria-label="Mark invoice as paid"
            >
              <div className="bg-brandPrimary p-[6px] rounded-full min-h-10 min-w-10 flex justify-center items-center">
                <ChevronsRight size={24} className="text-white" />
              </div>
              <span className="text-[#414D55] text-xs font-medium">
                Mark as Paid
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryInvoiceCard;
