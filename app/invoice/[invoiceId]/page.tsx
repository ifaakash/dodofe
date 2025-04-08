"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DodoIconName from "public/icons/dodoIconName.svg";
import { useParams } from "next/navigation";
import { getInvoiceById } from "api";
import { InvoiceProps } from "../../../types";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/slice/loaderSlice"; // Adjust the import path as needed
import ErrorPage from "@components/molecules/ErrorPage"; // Import the error page
import cx from "classnames";
import InvoiceDetails from "@components/molecules/invoiceBlocks/InvoiceDetails";
import UserCard from "@components/molecules/invoiceBlocks/UserCard";
import ItemsDetails from "@components/molecules/invoiceBlocks/ItemsDetails";
import PaymentDetails from "@components/molecules/invoiceBlocks/PaymentDetails";
import Note from "@components/molecules/invoiceBlocks/Note";
import { formatDateLong } from '@utils/helperFunctions'
import styles from "../invoice.module.css";
import GeneralErrorPage from "@components/templates/errorPages/GeneralError";


const PreviewInvoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
  const [error, setError] = useState<string | null>(null); // Add error state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      dispatch(showLoader(true)); // Show the loader with overlay
      try {
        const response = await getInvoiceById(invoiceId);
        setInvoice(response.invoice);
      } catch (error) {
        console.error("Failed to fetch invoice:", error);
        setError("Failed to load invoice data."); // Set error message
      } finally {
        dispatch(hideLoader()); // Hide the loader
      }
    };

    if (invoiceId) fetchInvoiceData();
  }, [invoiceId, dispatch]);

  if (error) {
    return <GeneralErrorPage/>
  }

  if (!invoice) {
    return;
  }

  return (
    <div className="h-full">
      <div className={cx(styles.backgroundDots)}></div>

      <div className="pt-6 pb-16">
        {/* Header */}
        <div className="pb-7 text-center">
          <div className="text-xl font-semibold capitalize"> INVOICE</div>
          <div className="flex gap-2 justify-center items-center">
              <span className="text-xs font-semibold">
                {invoice.subHeading || ""}
              </span>
            </div>

          <div className="text-sm text-[#3D4966] font-medium">
            <span>{formatDateLong(invoice.invoiceDate)}</span>
          </div>
        </div>

        {/* Invoice Blocks */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          <InvoiceDetails mode="view" invoiceNumber={invoice.invoiceNumber.toString()} dueDate={invoice.dueDate} />
          <UserCard type="recipient" mode="view" userDetails={invoice.recipientDetails} />
          <ItemsDetails mode="view" items={invoice.items} discount={invoice.discount} gst={invoice.gst} tds={invoice.tds} />
          <UserCard type="sender" mode="view" userDetails={invoice.clientDetails} />
          <PaymentDetails mode="view" bankDetails={invoice.bankDetails} />
          <Note mode="view" note={invoice.note} />
        </div>

        <div className="flex items-center justify-center gap-2 py-6">
          <span> Made with ❤️ by </span>
          <Image src={DodoIconName} alt="dodo" width={80} height={80} />
        </div>
      </div>
    </div>
  );
};

export default PreviewInvoice;
