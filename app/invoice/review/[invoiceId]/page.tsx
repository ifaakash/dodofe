"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { addSubHeading, getInvoiceById } from "api";
import { InvoiceProps } from "../../../../types";
import { toast } from "react-toastify";
import cx from "classnames";
import styles from "../../invoice.module.css";
import InvoiceDetails from "@components/molecules/invoiceBlocks/InvoiceDetails";
import ItemsDetails from "@components/molecules/invoiceBlocks/ItemsDetails";
import PaymentDetails from "@components/molecules/invoiceBlocks/PaymentDetails";
import Note from "@components/molecules/invoiceBlocks/Note";
import UserCard from "@components/molecules/invoiceBlocks/UserCard";
import DodoIconName from 'public/icons/dodoIconName.svg'
import Image from "next/image";
import { Download } from "lucide-react";
import ShareIcon from 'public/icons/share.svg'
import { formatDateLong } from '@utils/helperFunctions'
import { Header } from "@components/molecules/Header";

const ReviewInvoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState<InvoiceProps>()
  const [isEdited, setIsEdited] = useState(false);
  const [subHeading, setSubHeading] = useState("");
  const [originalSubHeading, setOriginalSubHeading] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await getInvoiceById(invoiceId);
        setInvoice(response.invoice);
        setSubHeading(response.invoice.subHeading);
        setOriginalSubHeading(response.invoice.subHeading);
      } catch (error) {
        console.error("Failed to fetch invoice:", error);
      }
    };

    if (invoiceId) fetchInvoiceData();
  }, [invoiceId]);

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading invoice...
      </div>
    );
  }

  const shareInvoice = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Save changes if edited
      if (isEdited) {
        const res = await addSubHeading({
          invoiceId,
          subHeading
        });

        if (!res.success) {
          throw new Error("Failed to save changes");
        }

        setOriginalSubHeading(subHeading);
        setIsEdited(false);
      }

      if (window) {
        // Share functionality
        const url = `${window.location.origin}/invoice/${invoiceId}`;
        await navigator.clipboard.writeText(url);

        // Show success message
        toast.success("Invoice link copied to clipboard!");
      }

    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add type guard check
  if (!('clientDetails' in invoice)) {
    return <div>Loading client details...</div>;
  }

  return (
    <div className="h-full">
      <div className={cx(styles.backgroundDots)}></div>

      <div className="pt-6 pb-16">
        {/* Header */}
        <Header/>
        <div className="pb-7 text-center">
          <div className="text-xl font-semibold"> INVOICE</div>
          <div className="text-sm text-[#3D4966] font-medium">
            <span>{formatDateLong(invoice.invoiceDate)}</span>
          </div>
        </div>

        {/* Invoice Blocks */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          <InvoiceDetails mode="edit" invoiceNumber={invoice.invoiceNumber.toString()} dueDate={invoice.dueDate} />
          <UserCard type="recipient" mode="edit" userDetails={invoice.recipientDetails} />
          <ItemsDetails mode="edit" items={invoice.items} discount={invoice.discount} gst={invoice.gst} tds={invoice.tds} />
          <UserCard type="sender" mode="edit" userDetails={invoice.clientDetails} />
          <PaymentDetails mode="edit" bankDetails={invoice.bankDetails} />
          <Note mode="edit" note={invoice.note} />
        </div>

        <div className="flex items-center justify-center gap-2 py-6">
          <span> Made with ❤️ by </span>
          <Image src={DodoIconName} alt="dodo" width={80} height={80} />
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-md z-50 py-4 px-6 flex gap-4">
        <button className="flex items-center justify-center gap-2 w-28 border-2 border-brandPrimary text-brandPrimary rounded-xl py-3 px-6">
          <span className="font-semibold text-sm">Pdf</span> <Download className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <button onClick={shareInvoice} className="flex items-center justify-center gap-2 w-full bg-brandPrimary text-white rounded-xl py-3 px-6">
          Share
          <Image src={ShareIcon} alt="share" width={20} height={20} />
        </button>
      </div>


    </div>
  );
};

export default ReviewInvoice;
