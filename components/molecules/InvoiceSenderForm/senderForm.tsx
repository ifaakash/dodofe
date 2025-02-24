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
import { INDIAN_STATES } from "@utils/constants";
import NewButton from "@components/atoms/Button/NewButton";
import cx from "classnames";
import { isEmpty } from "@utils/index";

interface SenderFormProps {
  clientDetails: ClientDetailsProps[];
  setCurrentStage: (currentStage: string) => void;
}

const SenderForm = ({ clientDetails, setCurrentStage }: SenderFormProps) => {
  const dispatch = useDispatch();
  const [showInputFields, setShowInputFields] = useState(true);
  const [clientID, setClientID] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [disableNextButton, setDisableNextButton] = useState(true);

  useEffect(() => {
    if (clientID) {
      dispatch(addClientDetailsID(clientID));
    }
  }, [clientID, dispatch]);

  useEffect(() => {
    setShowInputFields(clientDetails.length === 0);
  }, [clientDetails]);

  const currentClientDetails: any = useSelector(
    (state: RootState) => state.invoice.currentClientDetails || {}
  );

  useEffect(() => {
    const requiredFields = {
      name: currentClientDetails.name,
      email: currentClientDetails.email
    };

    const hasEmptyRequired = Object.values(requiredFields).some(val => !val);
    const hasErrors = Object.values(errors).some(error => error !== "");

    setDisableNextButton(hasErrors || hasEmptyRequired);
  }, [currentClientDetails, errors]);

  useEffect(() => {
    validateFormOnLoad();
  }, [currentClientDetails]);

  const requiredFields = ["name", "email"];
  const allFields = ["name", "email", "zipcode", "gst", "pan"];

  const validateFormOnLoad = () => {
    let validationErrors = {} as { [key: string]: string };
    let initialTouched = {} as { [key: string]: boolean };

    allFields.forEach((field) => {
      const value = currentClientDetails[field] || "";
      const isValid = validateField(field, value);
      if (!isValid) {
        validationErrors[field] = errors[field];
      }
      initialTouched[field] = !!value;
    });

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => error !== "");
    const hasEmptyRequired = requiredFields.some((field) => !currentClientDetails[field]);

    setDisableNextButton(hasErrors || hasEmptyRequired);
  };


  const validateField = (field: string, value: string) => {
    let error = "";
    let hasErrors = false;

    switch (field) {
      case "name":
        if (!value) {
          error = "Name is required.";
          hasErrors = true;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          error = "Invalid email address.";
          hasErrors = true;
        }
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

    const requiredFields = {
      name: currentClientDetails.name,
      email: currentClientDetails.email
    };

    const hasEmptyRequired = Object.values(requiredFields).some(val => !val);
    console.log(hasEmptyRequired, hasErrors);
    setDisableNextButton(hasErrors || hasEmptyRequired);

    return error === "";
  };

  const handleChange = (field: string, value: string) => {
    validateField(field, value);
    dispatch(addCurrentClientDetails({ [field]: value }));
  };

  return (
    <div className="py-4 px-5 overflow-scroll h-[calc(100vh-150px)]">
      {showInputFields ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">BASIC</div>
            <Input
              placeholder="Enter name"
              value={currentClientDetails.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />
            <Input
              placeholder="Email"
              value={currentClientDetails.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">
              FULL ADDRESS
            </div>
            <Input
              placeholder="Zip Code"
              value={currentClientDetails.zipcode || ""}
              onChange={(e) => handleChange("zipcode", e.target.value)}
              error={errors.zipcode}
            />
            <select
              className="p-2 border rounded"
              value={currentClientDetails.state || ""}
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
              value={currentClientDetails.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <Input
              placeholder="Address"
              value={currentClientDetails.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[#5E6C84] text-xs font-semibold">OPTIONAL</div>
            <Input
              placeholder="GSTN number"
              value={currentClientDetails.gst || ""}
              onChange={(e) => handleChange("gst", e.target.value)}
              error={errors.gst}
            />
            <Input
              placeholder="PAN number"
              value={currentClientDetails.pan || ""}
              onChange={(e) => handleChange("pan", e.target.value)}
              error={errors.pan}
            />
            <Input
              placeholder="Upload image/logo"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <button
              className="flex gap-2 items-center border border-brandPrimary py-2 px-4 w-fit rounded-full"
              onClick={() => setShowInputFields(true)}
            >
              <span className="text-sm font-semibold">Add New Sender</span>
              <Plus
                size={16}
                className="text-white bg-brandPrimary rounded-full p-0.5"
              />
            </button>
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

      <div className={cx(
        "bottom-0 py-4 fixed justify-center",
      )}
        style={isEmpty(clientDetails) ? { width: '80%' } : { width: '90%' }
        }
      >
        <NewButton
          size="large"
          variant="primary"
          disabled={disableNextButton}
          onClick={() => setCurrentStage('receiverDetails')}
        >
          Next
        </NewButton>
      </div>
    </div >
  );
};

export default SenderForm;
