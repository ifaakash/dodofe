"use client";

import { useState } from "react";

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

    return (
      <div>
        Final Invoice Dta
      </div>
    );
}
