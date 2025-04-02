import Input from '@components/atoms/Input'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { updateBankDetails } from 'store/slice/editInvoiceSlice';

const PaymentInputs = ({ bankDetails }: { bankDetails: any }) => {
  const dispatch = useDispatch();
  const currentBankDetails = useSelector((state: RootState) => state.invoice.currentBankDetails);

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateBankDetails({
      ...bankDetails,
      [field]: value
    }))
  }
  return (
    <div className='px-5'>
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
              value={bankDetails?.bankName || ""}
            />
            <Input
              placeholder="Account number"
              className="my-0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("accountNumber", e.target.value)
              }
              value={bankDetails?.accountNumber || ""}
            />
            <Input
              placeholder="IFSC code"
              className="my-0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("ifscCode", e.target.value)
              }
              value={bankDetails?.ifscCode || ""}
            />
            <Input
              placeholder="Account holder name"
              className="my-0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("accountName", e.target.value)
              }
              value={bankDetails?.accountName || ""}
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
              value={bankDetails?.upiId || ""}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentInputs