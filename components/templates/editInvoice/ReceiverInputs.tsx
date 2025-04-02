import Input from '@components/atoms/Input'
import React from 'react'
import { INDIAN_STATES } from '@utils/constants'
import { useDispatch } from 'react-redux'
import { updateRecipientDetails } from 'store/slice/editInvoiceSlice'


const ReceiverInputs = ({ recipientDetails }: { recipientDetails: any }) => {
  const dispatch = useDispatch()

  const handleChange = (field: string, value: string) => {
    dispatch(updateRecipientDetails({
      ...recipientDetails,
      [field]: value
    }))
  }

  return (
    <div className='px-5'>
       <div className="flex flex-col gap-6 pb-5">
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">BASIC</div>
            <Input
              placeholder="Enter name"
              value={recipientDetails?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              placeholder="Email"
              value={recipientDetails?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">
              FULL ADDRESS
            </div>
            <Input
              placeholder="Zip Code"
              value={recipientDetails?.zipcode || ""}
              onChange={(e) => handleChange("zipcode", e.target.value)}
            />
            <select
              className="p-2 border rounded"
              value={recipientDetails?.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
            >
              <option value="" disabled>
                Select State
              </option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <Input
              placeholder="City"
              value={recipientDetails?.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <Input
              placeholder="Address"
              value={recipientDetails?.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">OPTIONAL</div>
            <Input
              placeholder="GSTN number"
              value={recipientDetails?.gst || ""}
              onChange={(e) => handleChange("gst", e.target.value)}
            />
            <Input
              placeholder="PAN number"
              value={recipientDetails?.pan || ""}
              onChange={(e) => handleChange("pan", e.target.value)}
            />
          </div>
        </div>
    </div>
  )
}

export default ReceiverInputs