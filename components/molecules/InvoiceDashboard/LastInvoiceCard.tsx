import React from "react";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { InvoiceProps } from "types";
import MarkAsPaidButton from "./MarkAsPaidButton";

interface LastInvoiceCardProps {
  invoice: InvoiceProps;
}

const LastInvoiceCard = ({ invoice }: LastInvoiceCardProps) => {
  const formatDate = (isoDate: string | undefined) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return invoice.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calculate TDS and GST
  const calculateTDS = (subtotal: number) => (subtotal * invoice.tds) / 100;
  const calculateGST = (subtotal: number) => (subtotal * invoice.gst) / 100;

  const subtotal = calculateSubtotal();
  const tdsAmount = calculateTDS(subtotal);
  const gstAmount = calculateGST(subtotal);
  const totalAmount = subtotal - tdsAmount + gstAmount - invoice.discount;

  return (
    <div className="bg-white rounded-xl p-3 flex flex-col gap-3">
      <Link href={`/invoice/${invoice.id}`} className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div>
            <div className="text-xs">Billed to</div>
            <div className="font-semibold">
              {invoice?.recipientDetails?.name || "Unknown"}
            </div>
          </div>
          <div>
            <div className="text-xs text-end">Amount</div>
            <div className="font-semibold">
              {totalAmount ? `₹${totalAmount.toLocaleString()}` : "N/A"}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <div className="text-xs">Invoice Number</div>
            <div className="font-semibold">
              {invoice?.invoiceNumber.toString().padStart(3, "0") || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-xs text-end">Due Date</div>
            <div className="font-semibold">{formatDate(invoice?.dueDate)}</div>
          </div>
        </div>
      </Link>
      <div
        style={{
          border: "1px solid #C1C7D0",
          borderStyle: "dashed",
          borderWidth: "0.5px",
          borderImage:
            "repeating-linear-gradient(to right, #C1C7D0 0, #C1C7D0 5px, transparent 5px, transparent 10px) 1",
        }}
      ></div>

      <div className="flex gap-2">
        {/* Edit Button */}
        <Link
          href={`/invoice/review/${invoice.id}`}
          className="border-[1px] border-[#CEF2DC] py-2 px-[10px] rounded-full flex items-center gap-[6px] w-[100px] justify-center cursor-pointer"
        >
          <div className="text-xs font-bold">Edit</div>
          <Image src={EditPen} width={16} height={16} alt="edit" />
        </Link>

        <MarkAsPaidButton />
      </div>
    </div>
  );
};

export default LastInvoiceCard;
