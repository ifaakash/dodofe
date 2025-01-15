"use client";

import { useState, useEffect } from "react";
// import QRCode from "qrcode.react"; // Assuming you use this for generating QR codes
import { Button } from "@components/atoms"; // Assuming Button is part of your atoms
import cx from "classnames";

const dummyData = {
    "invoiceNumber": "1323",
    "issueDate": "10/10/24",
    "dueDate": "10/11/24",
    "sender": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "address": "123 Street, City, State, Pincode"
    },
    "receiver": {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "address": "456 Avenue, City, State, Pincode"
    },
    "items": [
        { "name": "Item A", "quantity": 1, "price": 2000 },
        { "name": "Item B", "quantity": 1, "price": 2000 }
    ],
    "subTotal": 4000,
    "discount": 10,
    "total": 3600,
    "paymentDetails": {
        "bankName": "Punjab National Bank",
        "accNumber": "4078001500233236",
        "ifscCode": "PUNB0407800",
        "accName": "RAJVEER SINGH",
        "upiHandle": "upi@goeshere"
    },
    "note": "Some text goes here",
    "qrCodeData": "upi://pay?pa=upi@goeshere&pn=RAJVEER SINGH"
}


export default function InvoiceFinalDetails() {
    const [invoiceData, setInvoiceData] = useState(dummyData);

    // Fetch data from API (mocked here for demonstration)
    // useEffect(() => {
    //     async function fetchInvoiceData() {
    //         const response = await fetch("/api/invoice"); // Replace with your actual API endpoint
    //         const data = await response.json();
    //         setInvoiceData(data);
    //     }
    //     fetchInvoiceData();
    // }, []);

    if (!invoiceData) {
        return <div className="text-center mt-8 text-gray-500">Loading...</div>;
    }

    const {
        invoiceNumber,
        issueDate,
        dueDate,
        sender,
        receiver,
        items,
        subTotal,
        discount,
        total,
        paymentDetails,
        note,
        // qrCodeData,
    } = invoiceData;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-medium text-gray-800">Your Invoice</h1>
                <span className="text-gray-400">#{invoiceNumber}</span>
            </div>

            {/* Dates */}
            <div className="border border-dashed border-gray-300 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Issue date</p>
                        <p className="font-medium text-gray-800">{issueDate}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Due date</p>
                        <p className="font-medium text-gray-800">{dueDate}</p>
                    </div>
                    <button className="text-green-500">✏️</button>
                </div>
            </div>

            {/* Sender & Receiver Details */}
            <div className="flex flex-col border border-dashed border-gray-300 p-4 rounded-lg mb-6">
                {/* Sender */}
                <div>
                    <p className="text-sm text-gray-500 font-bold">Sender Name</p>
                    <p className="text-gray-800">{sender.name}</p>
                    <p className="text-gray-500">{sender.email}</p>
                    <p className="text-gray-500">{sender.address}</p>
                </div>

                {/* Receiver */}
                <div className="mt-4">
                    <p className="text-sm text-gray-500 font-bold">Receiver Name</p>
                    <p className="text-gray-800">{receiver.name}</p>
                    <p className="text-gray-500">{receiver.email}</p>
                    <p className="text-gray-500">{receiver.address}</p>
                </div>
                <button className="absolute top-2 right-2 text-green-500">✏️</button>
            </div>

            {/* Items */}
            <div className="border border-dashed border-gray-300 p-4 rounded-lg mb-6">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                        <p className="text-gray-800">
                            {item.name} x {item.quantity} @ ₹{item.price}
                        </p>
                        <p className="text-gray-800">₹{item.quantity * item.price}</p>
                    </div>
                ))}
                <div className="flex justify-between items-center font-medium">
                    <p>Sub-total</p>
                    <p>₹{subTotal}</p>
                </div>
                <div className="flex justify-between items-center font-medium text-gray-500">
                    <p>Discount</p>
                    <p>{discount}%</p>
                </div>
                <div className="flex justify-between items-center font-bold text-lg mt-4">
                    <p>Total</p>
                    <p>₹{total}</p>
                </div>
            </div>

            {/* Payment Details */}
            <div className="border border-dashed border-gray-300 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-500 font-medium">PAYMENT DETAILS</p>
                <p className="text-gray-800">Bank Name: {paymentDetails.bankName}</p>
                <p className="text-gray-800">Account Number: {paymentDetails.accNumber}</p>
                <p className="text-gray-800">IFSC Code: {paymentDetails.ifscCode}</p>
                <p className="text-gray-800">Account Name: {paymentDetails.accName}</p>
                <p className="text-gray-800">UPI: {paymentDetails.upiHandle}</p>

                {/* QR Code */}
                <div className="mt-4 flex justify-center">
                    {/* <QRCode value={qrCodeData} size={128} /> */}
                </div>
            </div>

            {/* Note Section */}
            <div className="border border-dashed border-gray-300 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-500 font-medium">NOTE</p>
                <p className="text-gray-800">{note}</p>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center">
                <Button text="Download PDF" className="bg-green-500 text-white w-1/2 mr-2" />
                <Button text="Share" className="bg-blue-500 text-white w-1/2 ml-2" />
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-gray-500 text-sm">
                Generated with ❤️ by <span className="text-green-500 font-medium">DODO</span>
            </p>
        </div>
    );
}
