"use client";

import ProgressSteps from "components/atoms/ProgressBar";
import InvoiceFinalDetails from "@components/molecules/InvoiceFinalDetails";

export default function InvoiceDetailsPage() {
    return (
        <div className="min-h-[100dvh] bg-gray-50 flex flex-col">
            <div className="flex-1 max-w-[400px] w-full mx-auto p-4 space-y-4">
                {/* <PageHeader title="Enter Receiver's Details" backHref="/sender" /> */}
                <ProgressSteps currentStep={5} totalSteps={5} />
                <div className="p-4">
                    <InvoiceFinalDetails />
                </div>
            </div>
        </div>
    );
}