import React from "react";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { InvoiceProps } from "types";
import MarkAsPaidButton from "./MarkAsPaidButton";
import { formatDate } from "@utils/helperFunctions";

interface LastInvoiceCardProps {
  invoice: InvoiceProps;
  setIsPaymentStatusChanged: (value: boolean) => void;
}

const LastInvoiceCard = ({
    invoice,
    setIsPaymentStatusChanged,
}: LastInvoiceCardProps) => {
    // Calculate Subtotal
    const calculateSubtotal = () => {
        return invoice.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    // Calculate adjustments based on subtotal
    const calculateAdjustments = (subtotal: number) => {
        const gstAmount = (subtotal * (invoice.gst || 0)) / 100;
        const tdsAmount = (subtotal * (invoice.tds || 0)) / 100;
        const discountAmount = (subtotal * (invoice.discount || 0)) / 100;

        // Final amount = subtotal + gst - tds - discount
        return subtotal + gstAmount - tdsAmount - discountAmount;
    };

    const subtotal = calculateSubtotal();
    const totalAmount = calculateAdjustments(subtotal);

    return (
        <div className="bg-white rounded-xl p-3 flex flex-col gap-3">
            <Link
                href={`/invoice/review/${invoice.id}`}
                className="flex flex-col gap-3"
            >
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
                            {totalAmount
                                ? `₹${totalAmount.toLocaleString()}`
                                : "N/A"}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div>
                        <div className="text-xs">Invoice Number</div>
                        <div className="font-semibold">
                            {invoice?.invoiceNumber}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-end">Due Date</div>
                        <div className="font-semibold">
                            {formatDate(invoice?.dueDate)}
                        </div>
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
                    className="border-[1px] border-[#CEF2DC] py-2 px-5 rounded-full flex items-center gap-[6px] w-[100px] justify-center cursor-pointer"
                >
                    <div className="text-xs font-bold">Edit</div>
                    <Image src={EditPen} width={16} height={16} alt="edit" />
                </Link>

                <MarkAsPaidButton
                    invoice={invoice}
                    setIsPaymentStatusChanged={setIsPaymentStatusChanged}
                />
            </div>
        </div>
    );
};

export default LastInvoiceCard;
