"use client";

import { ReceiverForm } from "components/molecules/InvoiceReceiverForm/receiverForm";
import ProgressSteps from "components/atoms/ProgressBar";

export default function ReceiverDetails() {
  return (
    <div className="min-h-[100dvh] bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-[400px] w-full mx-auto p-4 space-y-4">
        {/* <PageHeader title="Enter Receiver's Details" backHref="/sender" /> */}
        <ProgressSteps currentStep={2} totalSteps={5} />
        <div className="p-4">
          <ReceiverForm />
        </div>
      </div>
    </div>
  );
}