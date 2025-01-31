import React, { useEffect, useState } from "react";
import { Input } from "@components/atoms";
import BankDetailsCard from "./BankDetailsCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addBankDetailsID,
  addCurrentBankDetails,
} from "store/slice/invoiceSlice";
import { Plus } from "lucide-react";
import { BankDetails } from "types";
import { RootState } from 'store/store';

interface PaymentDetailsProps {
  bankDetails: BankDetails[];
}

const PaymentDetails = ({ bankDetails } : PaymentDetailsProps) => {
  const dispatch = useDispatch();
  const [showInputFields, setShowInputFields] = useState(bankDetails.length === 0);
  const [bankDetailsID, setBankDetailsID] = useState("");

  const { currentBankDetails } = useSelector((state: RootState) => state.invoice);

  useEffect(() => {
    if (bankDetailsID) {
      dispatch(addBankDetailsID(bankDetailsID));
    }
  }, [bankDetailsID, dispatch]);

  const handleInputChange = (field: keyof BankDetails, value: string) => {
    dispatch(addCurrentBankDetails({ [field]: value }));
  };

  const handleSelectBank = (id: string) => {
    setBankDetailsID(id);
  };

  return (
    <div className="py-4 px-5">
      {showInputFields ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">BANK</div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Bank Name"
                className="my-0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("bankName", e.target.value)}
                value={currentBankDetails.bankName || ""}
              />
              <Input
                placeholder="Account number"
                className="my-0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("accountNumber", e.target.value)
                }
                value={currentBankDetails.accountNumber || ""}
              />
              <Input
                placeholder="IFSC code"
                className="my-0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleInputChange("ifscCode", e.target.value)
                }
                value={currentBankDetails.ifscCode || ""}
              />
              <Input
                placeholder="Account holder name"
                className="my-0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("accountName", e.target.value)
                }
                value={currentBankDetails.accountName || ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">UPI</div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Enter UPI here"
                className="my-0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleInputChange("upiId", e.target.value)
                }
                value={currentBankDetails.upiId || ""}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[10px]">
           <div className="flex justify-end">
            <div
              className="flex gap-2 items-center border-[1px] border-brandPrimary py-2 px-4 w-fit rounded-full"
              onClick={() => setShowInputFields(true)}
            >
              <div className="text-sm font-semibold">Add New Bank Details</div>
              <Plus
                size={16}
                className="text-white bg-brandPrimary rounded-full p-0.5 cursor-pointer"
              />
            </div>
          </div>
          {bankDetails.map((bankDetail) => (
            <BankDetailsCard
              key={bankDetail._id}
              bankDetail={bankDetail}
              bankDetailsID={bankDetailsID}
              onSelect={handleSelectBank}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
