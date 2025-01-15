import { Footer, UserInput } from "@components/atoms";
import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";

import styles from "./loginOtp.module.css";
import Image from "next/image";
import editIcon from "public/icons/edit.svg";
import { loadState, saveState } from "@utils/localStorage";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useRouter } from "next/navigation";

const otpLength = 4;

export const LoginOtp = ({ setLoginState }: any) => {
  const [otp, setOtp] = useState<string[]>(Array.from({ length: otpLength }, () => ""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: otpLength }, () => null));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);

    // Move focus to the next input field if current field is not empty
    if (e.target.value !== "" && index < otpLength - 1) {
      setActiveOtpIndex(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      // Move focus to the previous input field on backspace if current field is empty
      setActiveOtpIndex(index - 1);
    }
  };

  useEffect(() => {
    // Focus on the current active input field
    if (inputRefs.current[activeOtpIndex]) {
      inputRefs.current[activeOtpIndex]?.focus();
    }
  }, [activeOtpIndex]);

  const loginUser = () => {
    const mobileNumber = loadState(STORAGE_CONSTANTS.MOBILE)
  }

  return (
    <div className="mx-4 mt-16">
      <span className="text-3xl clr-heading-text font-black">Enter OTP</span>
      <br />
      <span className="text-xl clr-heading-text mb-4">for verification</span>

      <span className="text-sm clr-green my-2 flex flex-row">
        Sent to {loadState(STORAGE_CONSTANTS.MOBILE) || ''}
        <Image height={16} width={16} src={editIcon} alt="user profile" className="ml-2" />
      </span>

      <div className={cx("card mt-4 px-4 flex items-center flex-row w-full", styles.cardDimensions)}>
        {otp.map((digit, index) => (
          <UserInput
            key={index}
            type="text" // Use type "text" for OTP input to handle mobile keyboards better
            className={styles.otpInputContainer}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            value={digit}
            inputRef={(el: any) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>

      <Footer
        variant="default"
        primaryActionText="Continue"
        primaryAction={loginUser}
      />
    </div>
  );
};
