"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@components/atoms";
import InvoiceUserCard from "../UserCard/InvoiceUserCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentRecipientDetails,
  addClientDetailsID,
  addRecipientDetailsID,
} from "store/slice/invoiceSlice";
import { Plus } from "lucide-react";
import { RootState } from "store/store";
import { RecipientDetails } from "types";

interface ReceiverFormProps {
  receiverDetails: RecipientDetails[];
}

const ReceiverForm = ({ receiverDetails }: ReceiverFormProps) => {
  const dispatch = useDispatch();
  const [showInputFields, setShowInputFields] = useState(true);
  const [receiveID, setReceiveID] = useState("");

  useEffect(() => {
    if (receiveID) {
      dispatch(addRecipientDetailsID(receiveID));
    }
  }, [receiveID, dispatch]);


    useEffect(() => {
      setShowInputFields(receiverDetails.length === 0);
    }, [receiverDetails]);

  const currentRecipientDetails = useSelector(
    (state: RootState) => state.invoice.currentRecipientDetails
  );

  return (
    <div className="py-4 px-5 overflow-scroll h-[calc(100vh-150px)]">
      {showInputFields ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">BASIC</div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Enter name"
                className=""
                value={currentRecipientDetails.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentRecipientDetails({ name: e.target.value }))
                }
              />
              <Input
                placeholder="Email"
                className=""
                value={currentRecipientDetails.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    addCurrentRecipientDetails({ email: e.target.value })
                  )
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">
              FULL ADDRESS
            </div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Zip Code"
                className=""
                value={currentRecipientDetails.zipcode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    addCurrentRecipientDetails({ zipcode: e.target.value })
                  )
                }
              />

              <Input
                placeholder="State"
                className=""
                value={currentRecipientDetails.state}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentRecipientDetails({ state: e.target.value }))
                }
              />
              <Input
                placeholder="City"
                className=""
                value={currentRecipientDetails.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentRecipientDetails({ city: e.target.value }))
                }
              />
              <Input
                placeholder="Address"
                className=""
                value={currentRecipientDetails.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentRecipientDetails({ address: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">OPTIONAL</div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="GSTN number"
                className=""
                value={currentRecipientDetails.gst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentRecipientDetails({ gst: e.target.value }))
                }
              />
              <Input
                placeholder="PAN number"
                className=""
                value={currentRecipientDetails.pan}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentRecipientDetails({ pan: e.target.value }))
                }
              />
              {/* TODO */}
              <Input placeholder="Upload image/logo" className="" />
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
              <div className="text-sm font-semibold">Add New Receiver</div>
              <Plus
                size={16}
                className="text-white bg-brandPrimary rounded-full p-0.5 cursor-pointer"
              />
            </div>
          </div>
          {receiverDetails.map((detail, index) => (
            <InvoiceUserCard
              key={index}
              detail={detail}
              setUserID={setReceiveID}
              userID={receiveID}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceiverForm;
