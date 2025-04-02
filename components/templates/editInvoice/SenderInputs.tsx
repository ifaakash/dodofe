import React from 'react'
import Input from '@components/atoms/Input'
import { INDIAN_STATES } from '@utils/constants'
import { useDispatch } from 'react-redux'
import { updateClientDetails } from 'store/slice/editInvoiceSlice'

const SenderInputs = ({ senderDetails }: { senderDetails: any }) => {
    const dispatch = useDispatch()

    const handleChange = (field: string, value: string) => {
        dispatch(updateClientDetails({
            ...senderDetails,
            [field]: value
        }))
    }

    return (
        <div className='py-4 px-5 overflow-scroll h-[calc(100vh-150px)]'>
            <div className="flex flex-col gap-6 pb-5">
                <div className="flex flex-col gap-3">
                    <div className="text-[#5E6C84] text-xs font-semibold">BASIC</div>
                    <Input
                        placeholder="Enter name"
                        value={senderDetails?.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        value={senderDetails?.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="text-[#5E6C84] text-xs font-semibold">
                        FULL ADDRESS
                    </div>
                    <Input
                        placeholder="Zip Code"
                        value={senderDetails?.zipcode || ""}
                        onChange={(e) => handleChange("zipcode", e.target.value)}
                    />
                    <select
                        className="p-2 border rounded"
                        value={senderDetails?.state || ""}
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
                        value={senderDetails?.city || ""}
                        onChange={(e) => handleChange("city", e.target.value)}
                    />
                    <Input
                        placeholder="Address"
                        value={senderDetails?.address || ""}
                        onChange={(e) => handleChange("address", e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="text-[#5E6C84] text-xs font-semibold">OPTIONAL</div>
                    <Input
                        placeholder="GSTN number"
                        value={senderDetails?.gst || ""}
                        onChange={(e) => handleChange("gst", e.target.value)}

                    />
                    <Input
                        placeholder="PAN number"
                        value={senderDetails?.pan || ""}
                        onChange={(e) => handleChange("pan", e.target.value)}

                    />
                </div>
            </div>
        </div>
    )
}

export default SenderInputs