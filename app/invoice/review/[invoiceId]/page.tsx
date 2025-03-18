"use client";
import React, { useState, useEffect } from "react";
import DodoIconCircle from "public/icons/dodoIconCircle.svg";
import Image from "next/image";
import Rajveer from "public/assets/rajveer.png";
import DodoIconName from "public/icons/dodoIconName.svg";
import DownloadIcon from "public/icons/downloadIcon.svg";
import EditPen from "public/icons/EditPen.svg";
import Link from "next/link";
import { useParams } from "next/navigation";
import { addSubHeading, getInvoiceById } from "api";
import { InvoiceProps } from "../../../../types";
import { toast } from "react-toastify";
import { Header } from "@components/molecules/Header";


const ReviewInvoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState<InvoiceProps>()
  const isEditable = true;
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

  const handleSubHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSubHeading(newValue);
    setIsEdited(newValue !== originalSubHeading);
  };

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

  const {
    invoiceNumber,
    items,
    discount,
    subTotal,
    note,
    totalAmount,
    gst,
    tds
  } = invoice;

  // Add type guard check
  if (!('clientDetails' in invoice)) {
    return <div>Loading client details...</div>;
  }

  const { clientDetails, recipientDetails, bankDetails } = invoice;

  return (
    <div className="h-full w-full">
      <div className="h-64 bg-[#D8D6DC] absolute top-0 left-0 right-0 -z-10"></div>

      <Header title="Edit Invoice" />

      <div className="py-8 mt-12 flex justify-center">
        <div className="flex flex-col gap-1">
          <div className="uppercase font-bold text-[22px] text-center">
            Invoice
          </div>
          <div className="flex gap-1 justify-center items-center py-0">
            <input
              value={subHeading}
              onChange={handleSubHeadingChange}
              type="text"
              className="text-xs font-semibold focus:outline-none text-center bg-transparent leading-none w-fit"
              placeholder="Add sub-heading"
            />
            <Image src={EditPen} alt="EditPen" />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <span className="text-xs font-semibold">Invoice number:</span>
            <span className="text-sm font-semibold">{invoiceNumber.toString().padStart(3, "0")}</span>
          </div>

        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[10px] px-5">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Invoice for</div>
            {isEditable && (
              <Link
                href={"/invoice/create"}
                className="flex gap-1 items-center"
              >
                <div className="text-sm font-semibold">edit</div>
                <Image src={EditPen} alt="EditPen" />
              </Link>
            )}
          </div>

          <div className="p-4 rounded-[10px] bg-white flex flex-col gap-[10px]">
            <Image width={40} src={DodoIconCircle} alt="Dodo Icon Circle" />
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

          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Task Items</div>
              {isEditable && (
                <div className="flex gap-1 items-center">
                  <div className="text-sm font-semibold">edit</div>
                  <Image src={EditPen} alt="EditPen" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="bg-white p-4 rounded-t-[10px]">
                {items.map((item) => (
                  <div key={item._id}>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">
                          {item.name}
                        </span>
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
                    <div className="text-sm text-[#5E6C84] font-medium">
                      Sub-total
                    </div>
                    <span className="text-sm font-medium">₹{subTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-[#5E6C84] font-medium">
                      Discount
                    </div>
                    <span className="text-sm font-medium">{discount}%</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="text-sm text-[#5E6C84] font-medium">
                      GST
                    </div>
                    <span className="text-sm font-medium">{gst}%</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="text-sm text-[#5E6C84] font-medium">
                      TDS
                    </div>
                    <span className="text-sm font-medium">{tds}%</span>
                  </div>
                </div>
              </div>
              <div className="py-[14px] px-4 rounded-b-[10px] bg-[#D8D6DC] flex justify-between">
                <div className="text-sm font-[#5E6C84]">Total</div>
                <span className="font-semibold">₹{totalAmount}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Invoice by</div>
              {isEditable && (
                <div className="flex gap-1 items-center">
                  <div className="text-sm font-semibold">edit</div>
                  <Image src={EditPen} alt="EditPen" />
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-[10px] flex flex-col gap-[10px]">
              <Image
                src={DodoIconCircle}
                alt="Dodo Icon Circle"
                width={40}
                className="rounded-full"
              />
              <div className="flex flex-col gap-2">
                <div className="font-semibold">{recipientDetails.name}</div>
                <div className="text-sm flex flex-col gap-1 text-[#5E6C84] font-medium">
                  <div>{recipientDetails.email}</div>
                  <div>{recipientDetails.address}</div>
                  <div>
                    {recipientDetails.city}, {recipientDetails.state},{" "}
                    {recipientDetails.zipcode}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Payment Details</div>
              {isEditable && (
                <div className="flex gap-1 items-center">
                  <div className="text-sm font-semibold">edit</div>
                  <Image src={EditPen} alt="EditPen" />
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded-[10px] flex flex-col gap-[10px]">
              <div className="flex justify-between items-center">
                <div className="text-xs font-[#5E6C84]">Bank Name</div>
                <div className="text-sm font-semibold">
                  {bankDetails.bankName}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs font-[#5E6C84]">Account number</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {bankDetails.accountNumber}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs font-[#5E6C84]">IFSC Code</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {bankDetails.ifscCode}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs font-[#5E6C84]">
                  Account Holder Name
                </div>
                <div className="text-sm font-semibold">
                  {" "}
                  {bankDetails.accountName}
                </div>
              </div>
            </div>
          </div>
          {
            note && (
              <div className="p-4 bg-white rounded-[10px] flex flex-col gap-[10px]">
                <div className="text-xs font-semibold text-[#5E6C84]">Note</div>
                <div className="text-xs font-medium text-[#5E6C84]">{note}</div>
              </div>
            )
          }
        </div>

        <div className="flex justify-center mt-20 gap-1 items-center px-5">
          <div className="text-xs font-medium text-[#5E6C84]">
            generated with ❤️ by
          </div>
          <Image src={DodoIconName} alt="DodoIconName" />
        </div>

        <div className="mt-6 py-4 px-5 bg-white flex gap-[10px] fixed bottom-0 w-full border-t border-[#D8D6DC]">
          <button className="rounded-xl border-brandPrimary flex items-center gap-1 border-[1px] py-[10px] px-5 text-brandPrimary font-semibold text-sm">
            <div className="flex w-full">
              <div>Pdf</div>
              <Image src={DownloadIcon} alt="DownloadIcon" />
            </div>
          </button>

          <button className="bg-brandPrimary w-full rounded-xl text-white" onClick={shareInvoice}>
            {isEdited ? "Save & Share" : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewInvoice;
