"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@components/atoms";
import InvoiceUserCard from "../UserCard/InvoiceUserCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentRecipientDetails,
  addRecipientDetailsID,
  setShowInputFields,
} from "store/slice/invoiceSlice";
import { Plus } from "lucide-react";
import { RootState } from "store/store";
import { RecipientDetails } from "types";
import { INDIAN_STATES } from "@utils/constants";
import NewButton from "@components/atoms/Button/NewButton";
import { isEmpty } from "@utils/index";
import cx from 'classnames';

interface ReceiverFormProps {
  receiverDetails: RecipientDetails[];
  setCurrentStage: (currentStage: string) => void;
}

const ReceiverForm = ({
  receiverDetails,
  setCurrentStage,
}: ReceiverFormProps) => {
  const dispatch = useDispatch();
  const [receiveID, setReceiveID] = useState(receiverDetails[0]?._id);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [disableNextButton, setDisableNextButton] = useState(true);
  const showInputFields = useSelector((state: RootState) => state.invoice.showInputFields);

  const currentRecipientDetails: any = useSelector(
    (state: RootState) => state.invoice.currentRecipientDetails || {}
  );

  const selectedReceiverID = useSelector(
    (state: RootState) => state.invoice.recipientDetailsID
  );

  useEffect(() => {
    if (receiveID) {
      dispatch(addRecipientDetailsID(receiveID));
    }
  }, [receiveID, dispatch]);

  useEffect(() => {
    dispatch(setShowInputFields(receiverDetails.length === 0))
  }, [receiverDetails]);

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = '4rem'; // Reset height to 2 rows
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = scrollHeight + 'px';
    }
  }, [currentRecipientDetails.address]);



  console.log('selectedReceiverID', selectedReceiverID)

  useEffect(() => {
    // Only validate form when showing input fields
    if (showInputFields) {
      const hasErrors = Object.values(errors).some((error) => error !== "");
      const hasEmptyRequired = requiredFields.some((field) => !currentRecipientDetails[field]);
      setDisableNextButton(hasErrors || hasEmptyRequired);
    } else {
      // When showing receiver cards, only disable if no receiver is selected
      setDisableNextButton(!selectedReceiverID);
    }
  }, [currentRecipientDetails, errors, selectedReceiverID, showInputFields]);

  const requiredFields = [
    "name",
    "email",
    "zipcode",
    "state",
    "city",
    "address",
  ];

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "name":
        if (!value) error = "Name is required.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = "Invalid email address.";
        break;
      case "zipcode":
        if (!/^\d{6}$/.test(value)) error = "Zip code must be 6 digits.";
        break;
      case "gst":
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
        if (value && !gstRegex.test(value)) error = "Invalid GST number.";
        break;
      case "pan":
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (value && !panRegex.test(value)) error = "Invalid PAN number.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));

    return error === "";
  };

  const handleChange = (field: string, value: string) => {
    const isValid = validateField(field, value);
    dispatch(addCurrentRecipientDetails({ [field]: value }));

    // Check if all required fields are filled and valid
    const hasErrors = Object.values(errors).some((err) => err);
    const allRequiredFilled = requiredFields.every(
      (field) => currentRecipientDetails[field] && currentRecipientDetails[field].trim() !== ''
    );

    setDisableNextButton(hasErrors || !allRequiredFilled || !isValid);
  };

  useEffect(() => {
    validateFormOnLoad();
  }, [currentRecipientDetails]);

  const allFields = ["name", "email", "zipcode", "gst", "pan"];

  const validateFormOnLoad = () => {
    let validationErrors = {} as { [key: string]: string };
    let initialTouched = {} as { [key: string]: boolean };

    allFields.forEach((field) => {
      const value = currentRecipientDetails[field] || "";
      const isValid = validateField(field, value);
      if (!isValid) {
        validationErrors[field] = errors[field];
      }
      initialTouched[field] = !!value;
    });

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => error !== "");
    const hasEmptyRequired = requiredFields.some((field) => !currentRecipientDetails[field]);

    setDisableNextButton(hasErrors || hasEmptyRequired);
  };


  return (
    <div className="py-4 px-5 overflow-scroll h-[calc(100vh-150px)]">
      {showInputFields ? (
        <div className="flex flex-col gap-6 pb-5">
          <div className="flex flex-col gap-1">
            <div className="text-[#5E6C84] text-xs font-semibold">BASIC</div>
            <Input
              placeholder="Enter name"
              value={currentRecipientDetails.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />
            <Input
              placeholder="Email"
              value={currentRecipientDetails.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-[#5E6C84] text-xs font-semibold">
              FULL ADDRESS
            </div>
            <Input
              placeholder="Zip Code"
              value={currentRecipientDetails.zipcode || ""}
              onChange={(e) => handleChange("zipcode", e.target.value)}
              error={errors.zipcode}
              type="number"
            />
            {/* <select
              className="p-2 border rounded"
              value={currentRecipientDetails.state || ""}
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
            </select> */}
            <Input
              placeholder="State"
              value={currentRecipientDetails.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              error={errors.state}
            />
            <Input
              placeholder="City"
              value={currentRecipientDetails.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            {/* <Input
              placeholder="Address"
              value={currentRecipientDetails.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            /> */}
            <div className="relative">
              <textarea
                className="border border-[#E5E7EB] rounded-lg p-2 h-fit w-full"
                placeholder="Address"
                value={currentRecipientDetails.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={2}
                maxLength={40}
                style={{
                  resize: 'none',
                  minHeight: '4rem',
                  height: 'auto'
                }}
              />
              <span
                className={`absolute bottom-2 right-2 text-xs ${(currentRecipientDetails.address?.length || 0) >= 40 ? 'text-red-500' : 'text-gray-500'
                  }`}
              >
                {(currentRecipientDetails.address?.length || 0)}/40
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-[#5E6C84] text-xs font-semibold">OPTIONAL</div>
            <Input
              placeholder="GSTN number"
              value={currentRecipientDetails.gst || ""}
              onChange={(e) => handleChange("gst", e.target.value)}
              error={errors.gst}
            />
            <Input
              placeholder="PAN number"
              value={currentRecipientDetails.pan || ""}
              onChange={(e) => handleChange("pan", e.target.value)}
              error={errors.pan}
            />
            {/* <Input
              placeholder="Upload image/logo"
              type="file"
              accept="image/*"
            /> */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-end">
            <button
              className="flex gap-2 items-center border-[1px] border-brandPrimary py-2 px-4 w-fit rounded-full"
              onClick={() => dispatch(setShowInputFields(true))}
            >
              <span className="text-sm font-semibold">Add New Receiver</span>
              <Plus
                size={16}
                className="text-white bg-brandPrimary rounded-full p-0.5"
              />
            </button>
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

      <div className={cx(
        "bottom-0 py-4 fixed justify-center w-[90%]"
      )}
      // style={isEmpty(receiverDetails) ? { width: '80%' } : { width: '90%' }
      // }
      >
        <NewButton
          size="large"
          variant={
            showInputFields
              ? (disableNextButton ? "disabled" : "primary")
              : (selectedReceiverID ? "primary" : "disabled")
          }
          className="w-full"
          onClick={() => setCurrentStage('invoiceDetails')}
        >
          Next
        </NewButton>
      </div>
    </div>
  );
};

export default ReceiverForm;