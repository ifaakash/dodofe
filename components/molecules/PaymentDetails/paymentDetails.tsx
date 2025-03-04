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
import { RootState } from "store/store";
import NewButton from "@components/atoms/Button/NewButton";
import cx from "classnames";

interface PaymentDetailsProps {
  bankDetails: BankDetails[];
  setCurrentStage: (currentStage: string) => void;
}

const PaymentDetails = ({ bankDetails, setCurrentStage }: PaymentDetailsProps) => {
  const dispatch = useDispatch();
  const [showInputFields, setShowInputFields] = useState(bankDetails.length === 0);
  const [bankDetailsID, setBankDetailsID] = useState("");
  const [disableNextButton, setDisableNextButton] = useState(true);

  const { currentBankDetails } = useSelector((state: RootState) => state.invoice);
  const selectedBankID = useSelector((state: RootState) => state.invoice.bankDetailsID);

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

  const validatePaymentDetails = () => {
    // Enable "Next" button if a bank is selected from existing ones
    if (!showInputFields && selectedBankID) {
      setDisableNextButton(false);
      return;
    }

    // For new bank details input validation
    const { bankName, accountNumber, ifscCode, accountName, upiId } = currentBankDetails;

    const isBankDetailsValid =
      bankName?.trim() &&
      accountNumber?.trim() &&
      ifscCode?.trim() &&
      accountName?.trim();

    const isUPIValid = upiId?.trim();

    // Enable the button if either all bank details or the UPI ID is filled
    setDisableNextButton(!(isBankDetailsValid || isUPIValid));
  };

  useEffect(() => {
    validatePaymentDetails();
  }, [currentBankDetails, selectedBankID, showInputFields]);

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("bankName", e.target.value)
                }
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
              className="flex gap-2 items-center border-[1px] border-brandPrimary py-2 px-4 w-fit rounded-full cursor-pointer"
              onClick={() => {
                setShowInputFields(true);
                setBankDetailsID(""); // Clear selected bank when switching to input mode
              }}
            >
              <div className="text-sm font-semibold">Add New Bank Details</div>
              <Plus
                size={16}
                className="text-white bg-brandPrimary rounded-full p-0.5"
              />
            </div>
          </div>
          {bankDetails.map((bankDetail) => (
            <BankDetailsCard
              key={bankDetail._id}
              bankDetail={bankDetail}
              bankDetailsID={selectedBankID}
              onSelect={handleSelectBank}
            />
          ))}
        </div>
      )}

      <div
        className={cx(
          "bottom-0 py-4 fixed justify-center w-[90%]"
        )}
      >
        <NewButton
          size="large"
          variant={disableNextButton ? "disabled" : "primary"}
          className="w-full"
          onClick={() => setCurrentStage("dueDate")}
        >
          Next
        </NewButton>
      </div>
    </div>
  );
};

export default PaymentDetails;