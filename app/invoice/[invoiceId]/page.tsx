"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DodoIconCircle from "public/icons/dodoIconCircle.svg";
import Rajveer from "public/assets/rajveer.png";
import DodoIconName from "public/icons/dodoIconName.svg";
import { useParams } from "next/navigation";
import { getInvoiceById } from "api";
import { InvoiceProps } from "../../../types";
import { formatCurrency } from "@utils/helperFunctions";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/slice/loaderSlice"; // Adjust the import path as needed
import ErrorPage from "@components/molecules/ErrorPage"; // Import the error page
import { Header } from "@components/molecules/Header";

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
    return <ErrorPage message={error} />; // Render error page if there's an error
  }

  if (!invoice) {
    return;
  }

  // Handling both cases (full details vs. only IDs)
  const clientDetails =
    "clientDetails" in invoice ? invoice.clientDetails : null;
  const recipientDetails =
    "recipientDetails" in invoice ? invoice.recipientDetails : null;
  const bankDetails = "bankDetails" in invoice ? invoice.bankDetails : null;

  const discountAmount = (invoice.subTotal * invoice.discount) / 100;
  const gstAmount = (invoice.subTotal * invoice.gst) / 100;
  const tdsAmount = (invoice.subTotal * invoice.tds) / 100;

  const totalAmount = invoice.subTotal - discountAmount + gstAmount + tdsAmount;

  return (
    <div className="pt-16">
      <Header title={invoice.subHeading || "Invoice"} />
      <div className="h-64 bg-[#D8D6DC] absolute top-0 left-0 right-0 -z-10"></div>

      <div className="w-full lg:px-[280px] px-0">
        <div className="py-6 flex justify-center">
          <div className="flex flex-col gap-1">
            <h1 className="uppercase font-bold text-[22px] text-center">
              Invoice
            </h1>
            <div className="flex gap-2 justify-center items-center">
              <span className="text-xs font-semibold">
                {invoice.subHeading || ""}
              </span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <span className="text-xs font-semibold">Invoice number:</span>
              <span className="text-sm font-semibold">
                {invoice.invoiceNumber?.toString().padStart(3, "0") || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 flex flex-col gap-5">
          <div className="flex justify-between w-full gap-4">
            {clientDetails && (
              <div className="flex flex-col gap-[10px] w-full">
                <h2 className="font-semibold">Invoice for</h2>
                <div className="p-4 rounded-[10px] bg-white flex flex-col gap-[10px] md:h-[180px]">
                  <Image
                    width={40}
                    src={DodoIconCircle}
                    alt="Dodo Icon Circle"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">{clientDetails.name}</h3>
                    <div className="text-sm flex flex-col gap-1 text-[#5E6C84] font-medium">
                      <span>{clientDetails.email}</span>
                      <span>{clientDetails.address}</span>
                      <span>
                        {clientDetails.city}, {clientDetails.state},{" "}
                        {clientDetails.zipcode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {recipientDetails && (
              <div className="lg:flex flex-col gap-[10px] hidden w-full">
                <h2 className="font-semibold">Invoice by</h2>
                <div className="bg-white p-4 rounded-[10px] flex flex-col gap-[10px] md:h-[180px]">
                  <Image
                    src={DodoIconCircle}
                    alt="DodoIconCircle"
                    width={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">{recipientDetails.name}</h3>
                    <div className="text-sm flex flex-col gap-1 text-[#5E6C84] font-medium">
                      <span>{recipientDetails.email}</span>
                      <span>{recipientDetails.address}</span>
                      <span>
                        {recipientDetails.city}, {recipientDetails.state},{" "}
                        {recipientDetails.zipcode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold">Task Items</h2>
            <div className="bg-white p-4 rounded-t-[10px] mt-3">
              {invoice.items.map((item) => (
                <div key={item._id}>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">{item.name}</span>
                      <span className="text-xs text-[#5E6C84]">
                        {item.quantity} x ₹{item.price}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      ₹{item.quantity * item.price}
                    </span>
                  </div>
                  <div className="border-b-2 border-dotted w-full my-3"></div>
                </div>
              ))}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#5E6C84] font-medium">
                    Sub-total
                  </span>
                  <span className="text-sm font-medium">
                    ₹{invoice.subTotal}
                  </span>
                </div>
                {
                  invoice.discount !== null && (
                    <div className="flex justify-between">
                      <span className="text-sm text-[#5E6C84] font-medium">
                        Discount
                      </span>
                      <span className="text-sm font-medium">
                        {invoice.discount}%
                      </span>
                    </div>
                  )
                }
                {
                  invoice.gst !== null && (
                    <div className="flex justify-between">
                      <span className="text-sm text-[#5E6C84] font-medium">
                        GST
                      </span>
                      <span className="text-sm font-medium">
                        {invoice.gst}%
                      </span>
                    </div>
                  )
                }
                {
                  invoice.tds !== null && (
                    <div className="flex justify-between">
                      <span className="text-sm text-[#5E6C84] font-medium">
                        TDS
                      </span>
                      <span className="text-sm font-medium">
                        {invoice.tds}%
                      </span>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="py-[14px] px-4 rounded-b-[10px] bg-[#D8D6DC] flex justify-between">
              <span className="text-sm text-[#5E6C84]">Total</span>
              <span className="font-semibold">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          {recipientDetails && (
            <div className="flex flex-col gap-[10px] lg:hidden">
              <h2 className="font-semibold">Invoice by</h2>
              <div className="bg-white p-4 rounded-[10px] flex flex-col gap-[10px]">
                <Image
                  src={Rajveer}
                  alt="Rajveer"
                  width={40}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">{recipientDetails.name}</h3>
                  <div className="text-sm flex flex-col gap-1 text-[#5E6C84] font-medium">
                    <span>{recipientDetails.email}</span>
                    <span>{recipientDetails.address}</span>
                    <span>
                      {recipientDetails.city}, {recipientDetails.state},{" "}
                      {recipientDetails.zipcode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Details */}
          {bankDetails && (
            <div className="flex flex-col gap-[10px]">
              <h2 className="font-semibold">Payment Details</h2>
              <div className="bg-white p-4 rounded-[10px] flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#5E6C84]">Bank Name</span>
                  <span className="text-sm font-medium">
                    {bankDetails.bankName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#5E6C84]">Account Number</span>
                  <span className="text-sm font-medium">
                    {bankDetails.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#5E6C84]">IFSC Code</span>
                  <span className="text-sm font-medium">
                    {bankDetails.ifscCode}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#5E6C84]">Account Name</span>
                  <span className="text-sm font-medium">
                    {bankDetails.accountName}
                  </span>
                </div>
                <div
                  style={{
                    border: "1px solid #C1C7D0",
                    borderStyle: "dashed",
                    borderWidth: "0.5px",
                    borderImage:
                      "repeating-linear-gradient(to right, #C1C7D0 0, #C1C7D0 5px, transparent 5px, transparent 10px) 1",
                  }}
                ></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#5E6C84]">UPI</span>
                  <span className="text-sm font-medium">
                    {bankDetails.upiId}
                  </span>
                </div>
              </div>
            </div>
          )}

          {invoice.note && (
            <div className="p-4 bg-white rounded-[10px] flex flex-col gap-[10px]">
              <div className="text-xs font-semibold text-[#5E6C84]">Note</div>
              <div className="text-xs font-medium text-[#5E6C84]">
                {invoice.note}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-center lg:my-20 mt-20 mb-5 items-center gap-1">
            <span className="text-xs font-medium text-[#5E6C84]">
              Generated with ❤️ by
            </span>
            <Image src={DodoIconName} alt="Dodo Icon Name" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewInvoice;
