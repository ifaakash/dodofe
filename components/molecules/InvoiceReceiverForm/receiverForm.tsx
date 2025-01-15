"use client";

import { useState } from "react";
import { Button, Input } from "@components/atoms";
import { useRouter } from "next/navigation";
import cx from "classnames";
import styles from "./receiverForm.module.css"; // Optional modular CSS

export function ReceiverForm() {
  const router = useRouter();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    zipCode: "",
    city: "",
    address: "",
    gstin: "",
    pan: "",
  });

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Process the form data (log or send to API)
    console.log("Receiver Form Data:", formData);

    // Navigate to the next page
    router.push("/invoice/details");
  };

  return (
    <form
      className={cx("flex flex-col space-y-6 p-4 bg-white rounded-lg shadow-md", styles.receiverForm)}
      onSubmit={handleSubmit}
    >
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Receiver Details</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <Input
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Full Address */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Full Address</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <Input
              id="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <Input
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Optional Details */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Optional Details</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
              GSTIN Number
            </label>
            <Input
              id="gstin"
              placeholder="GSTIN number"
              value={formData.gstin}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="pan" className="block text-sm font-medium text-gray-700">
              PAN Number
            </label>
            <Input
              id="pan"
              placeholder="PAN number"
              value={formData.pan}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
              Upload Image/Logo
            </label>
            <div
              className={cx(
                "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50",
                styles.uploadBox
              )}
            >
              <p className="text-sm text-gray-500">Click to upload</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button text="Done" type="submit" className="w-full" />
    </form>
  );
}
