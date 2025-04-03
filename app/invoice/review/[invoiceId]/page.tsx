"use client";
import React, { useState, useEffect, useRef } from "react";
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
import EditPen from "public/icons/EditPen.svg";
import { useRouter } from "next/navigation";

const ReviewInvoice = () => {
  const { invoiceId } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<InvoiceProps>()
  const [isEdited, setIsEdited] = useState(false);
  const [subHeading, setSubHeading] = useState("");
  const [originalSubHeading, setOriginalSubHeading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [isEditingSubheading, setIsEditingSubheading] = useState(false);
  const subHeadingRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.style.width = `${input.value.length + 1}ch`; // +1 for caret space
    }
  }, [subHeading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subHeadingRef.current &&
        !subHeadingRef.current.contains(event.target as Node)
      ) {
        setIsEditingSubheading(false);
        if (subHeading !== originalSubHeading) {
          setIsEdited(true);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [subHeading, originalSubHeading]);

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

  const handleSubHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSubHeading(newValue);
    setIsEdited(newValue !== originalSubHeading);
  };

  const handleEditNagigation = ({ section }: { section: string }) => {
    router.push(`/invoice/edit/${invoiceId}?section=${section}`);
  }

  // Add type guard check
  if (!('clientDetails' in invoice)) {
    return <div>Loading client details...</div>;
  }

  return (
    <div className="h-full">
      <div className={cx(styles.backgroundDots)}></div>
      <div className="pt-6 pb-16">
        {/* Header */}
        <Header onBackClick={()=>router.push('/invoice')}/>
        <div className="pb-7 pt-10 text-center flex flex-col items-center gap-1">
          {/* Heading */}
          <div className="text-xl font-semibold">INVOICE</div>

          {/* Subheading + Edit */}
          <div
            ref={subHeadingRef}
            className="flex items-center justify-center gap-1"
          >
            {isEditingSubheading ? (
              <input
                ref={inputRef}
                value={subHeading}
                onChange={handleSubHeadingChange}
                type="text"
                autoFocus
                className="text-xs font-semibold focus:outline-none text-center bg-transparent border-b border-gray-400"
                placeholder="Add sub-heading"
              />
            ) : (
              <span className="text-xs font-semibold">
                {subHeading || "Add sub-heading"}
              </span>
            )}
            <button onClick={() => setIsEditingSubheading(true)}>
              <Image src={EditPen} alt="Edit" className="w-4 h-4" />
            </button>
          </div>

          {/* Date */}
          <div className="text-sm text-[#3D4966] font-medium">
            <span>{formatDateLong(invoice.invoiceDate)}</span>
          </div>
        </div>


        {/* Invoice Blocks */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          <InvoiceDetails mode="edit" invoiceNumber={invoice.invoiceNumber.toString()} dueDate={invoice.dueDate} handleEditNagigation={handleEditNagigation} />
          <UserCard type="recipient" mode="edit" userDetails={invoice.recipientDetails} handleEditNagigation={handleEditNagigation} />
          <ItemsDetails mode="edit" items={invoice.items} discount={invoice.discount} gst={invoice.gst} tds={invoice.tds} handleEditNagigation={handleEditNagigation} />
          <UserCard type="sender" mode="edit" userDetails={invoice.clientDetails} handleEditNagigation={handleEditNagigation} />
          <PaymentDetails mode="edit" bankDetails={invoice.bankDetails} handleEditNagigation={handleEditNagigation} />
          <Note mode="edit" note={invoice.note} handleEditNagigation={handleEditNagigation} />
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
          Save & Share
          <Image src={ShareIcon} alt="share" width={20} height={20} />
        </button>
      </div>


    </div>
  );
};

export default ReviewInvoice;
