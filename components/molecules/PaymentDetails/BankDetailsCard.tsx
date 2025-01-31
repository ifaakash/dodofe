import React from "react";
import type { BankDetails } from "types";

interface BankDetailsProps {
  bankDetail: BankDetails;
  bankDetailsID: string | null;
  onSelect: (id: string) => void;
}

const BankDetailsCard = ({ bankDetail, bankDetailsID, onSelect }: BankDetailsProps) => {
  const isSelected = bankDetailsID === bankDetail._id;

  return (
    <div
      className="bg-white p-4 rounded-lg flex flex-col gap-2.5 cursor-pointer"
      onClick={() => onSelect(bankDetail._id || '')}
    >
      <div className="flex justify-end">
        <input
          type="radio"
          checked={isSelected}
          name="bank-details"
          readOnly
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">Bank Name</div>
        <div className="text-sm font-semibold">{bankDetail.bankName}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">Account Number</div>
        <div className="text-sm font-semibold">{bankDetail.accountNumber}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">IFSC Code</div>
        <div className="text-sm font-semibold">{bankDetail.ifscCode}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">Account Holder Name</div>
        <div className="text-sm font-semibold">{bankDetail.accountName}</div>
      </div>
      {bankDetail.upiId && (
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">UPI</div>
          <div className="text-sm font-semibold">{bankDetail.upiId}</div>
        </div>
      )}
      {/* <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">Address</div>
        <div className="text-sm font-semibold">{bankDetail.upi}</div>
      </div> */}
    </div>
  );
};

export default BankDetailsCard;