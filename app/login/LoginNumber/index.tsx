import { Footer, UserInput } from "@components/atoms";
import { useState } from "react";
import cx from "classnames";

import styles from "./loginNumber.module.css";
import { sendOtp } from "api";
import { saveState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";

export const LoginNumber = ({ setLoginState }: any) => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(e?.target?.value);
  };

  const gotoOtpScreen = () => {
    sendOtp({ mobileNumber: mobileNumber }).then(() => {
      saveState(STORAGE_CONSTANTS.MOBILE, mobileNumber);

      setLoginState(2);
    }).catch(() => {
      console.log('error')
    })
  }

  return (
    <div className="mx-4 mt-16">
      <span className="text-xl clr-heading-text mb-2">Welcome!</span>
      <br></br>
      <span className="text-4xl font-black clr-heading-text">Sign in with</span>
      <br></br>
      <span className="text-xl clr-heading-text mb-2">
        to start your amazing journey
      </span>
      <div
        className={cx(
          "card mt-4 px-4 flex items-center flex-col w-full",
          styles.cardDimensions
        )}
      >
        <UserInput
          name="fullName"
          className="w-full text-xl"
          value={mobileNumber}
          placeholder="Enter your mobile number"
          onChange={handleMobileNumber}
          errorMsg={"Please enter a valid number"}
          type="text"
          maxLength={16}
        />
      </div>
      <Footer
        variant="default"
        primaryActionText="Continue"
        primaryAction={gotoOtpScreen}
      />
    </div>
  );
};
