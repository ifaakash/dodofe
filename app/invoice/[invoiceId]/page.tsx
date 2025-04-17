
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
  const [isDesktop, setIsDesktop] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsDesktop(window.innerWidth >= 768);

      // Add resize listener
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

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
    return <GeneralErrorPage />
  }

  if (!invoice) {
    return;
  }

  return (
    <div className="h-full">
      <div className={cx(styles.backgroundDots)}></div>

      <div className={cx("pt-6 pb-16", isDesktop && "max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-8 border-t-8 border-brandPrimary")}>
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
        <div className={cx("px-4 pb-6 flex flex-col gap-3", isDesktop && "px-8")}>
          <InvoiceDetails mode="view" invoiceNumber={invoice.invoiceNumber.toString()} dueDate={invoice.dueDate} />

          {isDesktop ? (
            <div className="flex gap-6 justify-between">
              <div className="w-1/2">
                <UserCard type="recipient" mode="view" userDetails={invoice.recipientDetails} />
              </div>
              <div className="w-1/2">
                <UserCard type="sender" mode="view" userDetails={invoice.clientDetails} />
              </div>
            </div>
          ) : (
            <>
              <UserCard type="recipient" mode="view" userDetails={invoice.recipientDetails} />
            </>
          )}

          <ItemsDetails mode="view" items={invoice.items} discount={invoice.discount} gst={invoice.gst} tds={invoice.tds} />
          {
            !isDesktop && (
              <UserCard type="sender" mode="view" userDetails={invoice.clientDetails} />
            )
          }
          <PaymentDetails mode="view" bankDetails={invoice.bankDetails} />
          {
            invoice.note && (
              <Note mode="view" note={invoice.note} />
            )
          }
        </div>

        <div className="flex items-center justify-center gap-2 py-6">
          <span className="text-sm"> Generated with ❤️ by </span>
          <Image src={DodoIconName} alt="dodo" width={80} height={80} />
        </div>
      </div>
    </div>
  );
};

export default PreviewInvoice;
