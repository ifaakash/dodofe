"use client";
import { Input } from "@components/atoms";
import React, { useEffect, useState, ChangeEvent } from "react";
import InvoiceUserCard from "../UserCard/InvoiceUserCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addClientDetailsID,
  addCurrentClientDetails,
} from "store/slice/invoiceSlice";
import { Plus } from "lucide-react";
import { ClientDetailsProps } from "types";
import { RootState } from "store/store";

interface SenderFormProps {
  clientDetails: ClientDetailsProps[];
}

const SenderForm = ({ clientDetails }: SenderFormProps) => {
  const dispatch = useDispatch();
  const [showInputFields, setShowInputFields] = useState(true);
  const [clientID, setClientID] = useState("");

  // Update client ID in Redux store whenever it changes
  useEffect(() => {
    if (clientID) {
      dispatch(addClientDetailsID(clientID));
    }
  }, [clientID, dispatch]);

  // Determine whether to show input fields or existing client cards
  useEffect(() => {
    setShowInputFields(clientDetails.length === 0);
  }, [clientDetails]);

  const currentClientDetails = useSelector(
    (state: RootState) => state.invoice.currentClientDetails || {}
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
                value={currentClientDetails.name || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ name: e.target.value }))
                }
              />
              <Input
                placeholder="Email"
                value={currentClientDetails.email || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ email: e.target.value }))
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
                value={currentClientDetails.zipcode || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ zipcode: e.target.value }))
                }
              />
              <Input
                placeholder="State"
                value={currentClientDetails.state || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ state: e.target.value }))
                }
              />
              <Input
                placeholder="City"
                value={currentClientDetails.city || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ city: e.target.value }))
                }
              />
              <Input
                placeholder="Address"
                value={currentClientDetails.address || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ address: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">OPTIONAL</div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="GSTN number"
                value={currentClientDetails.gst || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ gst: e.target.value }))
                }
              />
              <Input
                placeholder="PAN number"
                value={currentClientDetails.pan || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addCurrentClientDetails({ pan: e.target.value }))
                }
              />
              <Input placeholder="Upload image/logo" type="file" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <div
              className="flex gap-2 items-center border-[1px] border-brandPrimary py-2 px-4 w-fit rounded-full"
              onClick={() => setShowInputFields(true)}
            >
              <div className="text-sm font-semibold">Add New Sender</div>
              <Plus
                size={16}
                className="text-white bg-brandPrimary rounded-full p-0.5 cursor-pointer"
              />
            </div>
          </div>
          {clientDetails.map((detail, index) => (
            <InvoiceUserCard
              key={index}
              detail={detail}
              setUserID={setClientID}
              userID={clientID}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SenderForm;
