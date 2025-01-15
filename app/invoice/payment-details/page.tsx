"use client";

import ProgressSteps from "components/atoms/ProgressBar";
import { PaymentDetails } from "@components/molecules/PaymentDetails/paymentDetails";

export default function PaymentDetailsPage() {
    return (
        <div className="min-h-[100dvh] bg-gray-50 flex flex-col">
            <div className="flex-1 max-w-[400px] w-full mx-auto p-4 space-y-4">
                {/* <PageHeader title="Enter Receiver's Details" backHref="/sender" /> */}
                <ProgressSteps currentStep={4} totalSteps={5} />
                <div className="p-4">
                    <PaymentDetails />
                </div>
            </div>
        </div>
    );
}