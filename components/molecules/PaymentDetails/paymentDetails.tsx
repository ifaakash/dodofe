"use client";

import { useState } from "react";
import { Button, Input } from "@components/atoms"; // Assuming Button and Input are atom components
import cx from "classnames";
import styles from "./paymentDetails.module.css"; // Optional modular CSS
import { useRouter } from "next/navigation";

export function PaymentDetails() {
    const router = useRouter();

    // State to store bank details
    const [bankDetails, setBankDetails] = useState({
        bankName: "",
        accNumber: "",
        ifscCode: "",
        accName: "",
        upiHandle: "",
    });

    const [upi, setUpi] = useState('');

    // Handle changes in the input fields
    const handleInputChange = (field: string, value: string) => {
        setBankDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Process the form data (log or send to API)
        console.log("Invoice Form Data:", { ...bankDetails, upi });

        // Navigate to the next page
        router.push("/invoice/final-details");
    };

    return (
        <div className={cx("p-4 bg-white rounded-lg shadow-md", styles.paymentDetails)}>
            {/* Header */}
            <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Details</h2>

            {/* Bank Details Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Bank Details</h3>
                <Input
                    placeholder="Bank Name"
                    value={bankDetails.bankName}
                    onChange={(e: any) => handleInputChange("bankName", e.target.value)}
                />
                <Input
                    placeholder="Account Number"
                    value={bankDetails.accNumber}
                    onChange={(e: any) => handleInputChange("accNumber", e.target.value)}
                />
                <Input
                    placeholder="IFSC Code"
                    value={bankDetails.ifscCode}
                    onChange={(e: any) => handleInputChange("ifscCode", e.target.value)}
                />
                <Input
                    placeholder="Account Holder Name"
                    value={bankDetails.accName}
                    onChange={(e: any) => handleInputChange("accName", e.target.value)}
                />
            </div>

            {/* UPI Section */}
            <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">UPI</h3>
                <Input
                    placeholder="Enter UPI handle here"
                    value={bankDetails.upiHandle}
                    onChange={(e: any) => handleInputChange("upiHandle", e.target.value)}
                />
            </div>

            {/* Submit Button */}
            <Button
                text="Next"
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-500 text-white"
            />
        </div>
    );
}
