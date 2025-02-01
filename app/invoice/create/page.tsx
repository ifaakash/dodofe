"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReceiverForm from "@components/molecules/InvoiceReceiverForm/receiverForm";
import PaymentDetails from "@components/molecules/PaymentDetails/paymentDetails";
import Arrow from "public/icons/leftArrow.svg";
import NewButton from "@components/atoms/Button/NewButton";
import SenderForm from "@components/molecules/InvoiceSenderForm/senderForm";
import InvoiceDetails from "@components/molecules/InvoiceDetails/invoiceDetails";
import InvoiceDueDate from "@components/molecules/InvoiceDueDate/InvoiceDueDate";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getUserDetails } from "api";
import { RootState } from 'store/store';

import { userDetailsProps } from "types";
import {
  createRecipient,
  createClient,
  addBankDetails,
  createInvoice,
} from "api/services";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";


const CreateInvoice = () => {
  const [currentStage, setCurrentStage] = useState("senderDetails");
  const router = useRouter();
  const state = useSelector((state: RootState) => state);
  const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserDetails(userId);
        if (res) {
          setUserDetails(res.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const stages = [
    "senderDetails",
    "receiverDetails",
    "invoiceDetails",
    "paymentDetails",
    "dueDate",
  ];

  const currentIndex = stages.indexOf(currentStage);
  const progressPercentage = ((currentIndex + 1) / stages.length) * 100;

  const renderStage = () => {
    if (!userDetails) return <div>Loading...</div>; // Handle loading state

    switch (currentStage) {
      case "senderDetails":
        return <SenderForm clientDetails={userDetails.clientDetails} />;
      case "receiverDetails":
        return <ReceiverForm receiverDetails={userDetails.recipientDetails} />;
      case "invoiceDetails":
        return <InvoiceDetails />;
      case "paymentDetails":
        return <PaymentDetails bankDetails={userDetails.bankDetails} />;
      case "dueDate":
        return <InvoiceDueDate />;
      default:
        return <SenderForm clientDetails={userDetails.clientDetails} />;
    }
  };

  const getNextLink = () => {
    return stages[currentIndex + 1] || "senderDetails";
  };

  const getHeaderText = () => {
    switch (currentStage) {
      case "senderDetails":
        return "Enter Sender details";
      case "receiverDetails":
        return "Enter Receiver details";
      case "invoiceDetails":
        return "Invoice details";
      case "paymentDetails":
        return "Payment details";
      case "dueDate":
        return "Invoice Terms";
      default:
        return "Enter Your details";
    }
  };

  const handleInvoiceSubmit = async () => {
    try {
      const invoice = state.invoice;

      if (!userDetails?.id) {
        console.error("User details are missing.");
        return;
      }

      let bankDetailId = invoice.bankDetailsID;
      let clientDetailId = invoice.clientDetailsID;
      let recipientDetailId = invoice.recipientDetailsID;

      if (!bankDetailId) {
        const newBankDetails = await createBankDetails();
        console.log("New Bank Details HERE :  ", newBankDetails);
        bankDetailId = newBankDetails.data?._id || null;
      }
      if (!clientDetailId) {
        const newClient = await createClientDetails();
        clientDetailId = newClient.data?._id || null;
      }
      if (!recipientDetailId) {
        const newRecipient = await createRecipientDetails();
        recipientDetailId = newRecipient.data?._id || null;
      }

      console.log({
        bankDetailId,
        clientDetailId,
        recipientDetailId,
      })

      if (!bankDetailId || !clientDetailId || !recipientDetailId) {
        console.log("Failed to create required details.");
        return;
      }

      await submitInvoice({
        bankDetailId,
        clientDetailId,
        recipientDetailId,
      });
    } catch (error) {
      console.error("An error occurred while handling the invoice submission:", error);
    }
  };

  const createBankDetails = async () => {
    try {
      const invoice = state.invoice;
      const newBankDetails = await addBankDetails({
        userId: userDetails!.id,
        bankName: invoice.currentBankDetails.bankName,
        accountNumber: invoice.currentBankDetails.accountNumber,
        ifscCode: invoice.currentBankDetails.ifscCode,
        accountName: invoice.currentBankDetails.accountName,
        upiId: invoice.currentBankDetails.upiId,
      });
      console.log("New Bank Details:", newBankDetails);
      return newBankDetails;
    } catch (error) {
      console.error("Error creating bank details:", error);
      return null;
    }
  };

  const createClientDetails = async () => {
    try {
      const invoice = state.invoice;
      const newClient = await createClient({
        userId: userDetails!.id,
        name: invoice.currentClientDetails.name,
        email: invoice.currentClientDetails.email,
        state: invoice.currentClientDetails.state,
        city: invoice.currentClientDetails.city,
        address: invoice.currentClientDetails.address,
        zipcode: invoice.currentClientDetails.zipcode,
        gstin: invoice.currentClientDetails.gst,
        pan: invoice.currentClientDetails.pan,
      });
      console.log("New Client:", newClient);
      return newClient;
    } catch (error) {
      console.error("Error creating client details:", error);
      return null;
    }
  };

  const createRecipientDetails = async () => {
    try {
      const invoice = state.invoice;
      const newRecipient = await createRecipient({
        userId: userDetails!.id,
        name: invoice.currentRecipientDetails.name,
        email: invoice.currentRecipientDetails.email,
        state: invoice.currentRecipientDetails.state,
        city: invoice.currentRecipientDetails.city,
        address: invoice.currentRecipientDetails.address,
        zipcode: invoice.currentRecipientDetails.zipcode,
        gstin: invoice.currentRecipientDetails.gst,
        pan: invoice.currentRecipientDetails.pan,
      });
      console.log("New Recipient:", newRecipient);
      return newRecipient;
    } catch (error) {
      console.error("Error creating recipient details:", error);
      return null;
    }
  };

  const submitInvoice = async ({
    bankDetailId,
    clientDetailId,
    recipientDetailId,
  }: {
    bankDetailId: string;
    clientDetailId: string;
    recipientDetailId: string;
  }) => {
    console.log("Submitting the invoice...");
    try {
      const invoice = state.invoice;

      const res = await createInvoice({
        userId: userDetails!.id,
        bankDetailId,
        clientDetailId,
        recipientDetailId,
        items: invoice.items,
        discount: invoice.discount,
        note: invoice.note,
        date: invoice.date || new Date().toISOString(),
        dueDate: invoice.dueDate,
        gst: invoice.gst,
        tds: invoice.tds,
      });

      if (res.success) {
        router.push("/invoice/review/" + res.data._id);
      } else {
        console.error("Failed to create invoice:", res.message);
      }
    } catch (error) {
      console.error("Error submitting the invoice:", error);
    }
  };

  const handleBackNavigation = () => {
    switch (currentStage) {
      case "senderDetails":
        router.push("/invoice");
        break;
      case "receiverDetails":
        setCurrentStage("senderDetails");
        break;
      case "invoiceDetails":
        setCurrentStage("receiverDetails");
        break;
      case "paymentDetails":
        setCurrentStage("invoiceDetails");
        break;
      case "dueDate":
        setCurrentStage("paymentDetails");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="relative">
      <div className="py-[10px] px-5 flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <div onClick={handleBackNavigation} className="p-2 cursor-pointer">
            <Image src={Arrow} width={20} alt="back" />
          </div>
          <div className="overflow-auto font-semibold">{getHeaderText()}</div>
        </div>
        <div className="flex justify-between items-center gap-1">
          <div className="w-full bg-[#D8D7DB] rounded-full h-3">
            <div
              className="bg-brandPrimary h-3 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="py-2 px-1 font-bold rounded-full bg-brandPrimary text-xs h-fit text-white">
            {Math.round(progressPercentage)}%
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-150px)] overflow-scroll">
        {renderStage()}
      </div>
      {currentStage === "dueDate" ? (
        <div className="bottom-0 px-5 py-4 w-full fixed">
          <NewButton
            size="large"
            variant="primary"
            onClick={handleInvoiceSubmit}
          >
            Review and Share
          </NewButton>
        </div>
      ) : (
        <div className="bottom-0 px-5 py-4 w-full fixed">
          <NewButton
            size="large"
            variant="primary"
            onClick={() => setCurrentStage(getNextLink())}
          >
            Next
          </NewButton>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
