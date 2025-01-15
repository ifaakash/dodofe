"use client";

import { useState } from "react";
import { Button, Input } from "@components/atoms"; // Assuming Button and Input are atom components
import cx from "classnames";
import styles from "./invoiceDetails.module.css"; // Optional modular CSS
import { useRouter } from "next/navigation";

export function InvoiceDetails() {
    const router = useRouter();

    const [items, setItems] = useState([
        { itemName: "", quantity: "", price: "" }, // Initial row
    ]);

    // Calculate the subtotal
    const calculateSubtotal = () => {
        return items.reduce((total, currentItem) => {
            const quantity = parseFloat(currentItem.quantity) || 0;
            const price = parseFloat(currentItem.price.replace(/,/g, "")) || 0;
            return total + quantity * price;
        }, 0);
    };

    // Handle changes in the input fields
    const handleInputChange = (index: number, field: any, value: any) => {
        setItems((prevItems) => {
            const updatedItems: any = [...prevItems];
            updatedItems[index][field] = value;
            return updatedItems;
        });
    };

    // Add a new item row
    const handleAddMore = () => {
        setItems((prevItems) => [
            ...prevItems,
            { itemName: "", quantity: "", price: "" },
        ]);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Process the form data (log or send to API)
        console.log("Invoice Form Data:", items);

        // Navigate to the next page
        router.push("/invoice/payment-details");
    };

    return (
        <div className={cx("p-4 bg-white rounded-lg shadow-md", styles.invoiceDetails)}>
            {/* Header */}
            <h2 className="text-lg font-medium text-gray-800 mb-4">Invoice Details</h2>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-6 relative">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                <span className="absolute right-0 text-sm text-green-500">40%</span>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">ITEMS</h3>
                {items.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <Input
                            placeholder="Item Name"
                            value={item.itemName}
                            onChange={(e: any) =>
                                handleInputChange(index, "itemName", e.target.value)
                            }
                        />
                        <Input
                            placeholder="Quantity"
                            type="number"
                            value={item.quantity}
                            onChange={(e: any) =>
                                handleInputChange(index, "quantity", e.target.value)
                            }
                        />
                        <Input
                            placeholder="Price"
                            value={item.price}
                            onChange={(e: any) =>
                                handleInputChange(index, "price", e.target.value)
                            }
                        />
                    </div>
                ))}
                <Button
                    text="Add More +"
                    onClick={handleAddMore}
                    className="mt-4 w-full text-green-600 border border-green-600"
                />
            </div>

            {/* Dynamic Display of Items */}
            <div className="mt-6 space-y-4">
                {items.map((item, index) => {
                    if (item.itemName && item.quantity && item.price) {
                        return (
                            <div key={`summary-${index}`} className="flex justify-between items-center">
                                <span className="text-gray-700">{item.itemName}</span>
                                <span className="text-gray-700">
                                    {item.quantity} x ₹{item.price}
                                </span>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Subtotal Section */}
            <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Sub Total</h3>
                <div className="text-lg font-bold text-gray-800">
                    ₹{calculateSubtotal().toLocaleString()}
                </div>
            </div>

            {/* Note Section */}
            <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">NOTE</h3>
                <Input placeholder="Add a note (optional)" />
            </div>

            {/* Submit Button */}
            <Button text="Next" onClick={handleSubmit} className="mt-6 w-full bg-green-500 text-white" />
        </div>
    );
}
