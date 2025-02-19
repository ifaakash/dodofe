import { Footer, UserInput } from "@components/atoms";
import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import styles from "./loginOtp.module.css";
import Image from "next/image";
import editIcon from "public/icons/edit.svg";
import { loadState, saveState } from "@utils/localStorage";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useRouter } from "next/navigation";
import { registerUser } from "api";
import { toast } from "react-toastify";

const otpLength = 6;

export const LoginOtp = ({ setLoginState }: any) => {
    const [otp, setOtp] = useState<string[]>(
        Array.from({ length: otpLength }, () => "")
    );
    const [activeOtpIndex, setActiveOtpIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const inputRefs = useRef<(HTMLInputElement | null)[]>(
        Array.from({ length: otpLength }, () => null)
    );

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        const updatedOtp = [...otp];
        updatedOtp[index] = value.slice(-1);
        setOtp(updatedOtp);

        if (value !== "" && index < otpLength - 1) {
            setActiveOtpIndex(index + 1);
        }

        // Check if all digits are filled
        if (
            updatedOtp.every((digit) => digit !== "") &&
            updatedOtp.join("").length === otpLength
        ) {
            verifyOTP(updatedOtp.join(""));
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                setActiveOtpIndex(index - 1);
            } else {
                const updatedOtp = [...otp];
                updatedOtp[index] = "";
                setOtp(updatedOtp);
            }
        }
    };

    useEffect(() => {
        if (inputRefs.current[activeOtpIndex]) {
            inputRefs.current[activeOtpIndex]?.focus();
        }
    }, [activeOtpIndex]);

    const verifyOTP = async (otpCode?: string) => {
        const codeToVerify = otpCode || otp.join("");
        if (codeToVerify.length !== otpLength) {
            toast.error("Please enter complete OTP");
            return;
        }

        setIsLoading(true);
        try {
            console.log("Verifying OTP...");
            const confirmationResult = window.confirmationResult;
            const result = await confirmationResult.confirm(codeToVerify);
            console.log("Firebase auth successful:", result);

            const mobileNumber = loadState(STORAGE_CONSTANTS.MOBILE);
            const userCredential = result.user;

            console.log("Registering user with backend...");
            const response = await registerUser({
                mobileNumber,
                otplessId: userCredential.uid,
                token: await userCredential.getIdToken(),
            });

            saveState(STORAGE_CONSTANTS.TOKEN_SESSION_KEY, response.token);
            saveState(STORAGE_CONSTANTS.userId, response?.userId);
            saveState(STORAGE_CONSTANTS.MOBILE, mobileNumber);

            toast.success("Login successful!");

            if (response?.isNewUser) {
                router.push(ROUTE_CONSTANTS.BASIC_DETAILS);
            } else {
                router.push(ROUTE_CONSTANTS.HOME);
            }
        } catch (error: any) {
            console.error("Error during verification:", error);
            let errorMessage = "Failed to verify OTP. Please try again.";

            if (error?.code === "auth/invalid-verification-code") {
                errorMessage = "Invalid OTP entered";
            } else if (error?.code === "auth/code-expired") {
                errorMessage = "OTP has expired. Please request a new one";
            }

            toast.error(errorMessage);
            setOtp(Array.from({ length: otpLength }, () => ""));
            setActiveOtpIndex(0);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-4 mt-16">
            <span className="text-3xl clr-heading-text font-black">
                Enter OTP
            </span>
            <br />
            <span className="text-xl clr-heading-text mb-4">
                for verification
            </span>

            <span className="text-sm clr-green my-2 flex flex-row">
                Sent to {loadState(STORAGE_CONSTANTS.MOBILE) || ""}
                <Image
                    height={16}
                    width={16}
                    src={editIcon}
                    alt="edit"
                    className="ml-2 cursor-pointer"
                    onClick={() => setLoginState(1)}
                />
            </span>

            <div
                className={cx(
                    "card mt-4 px-4 flex items-center flex-row w-full",
                    styles.cardDimensions
                )}
            >
                {otp.map((digit, index) => (
                    <UserInput
                        key={index}
                        type="text"
                        className={styles.otpInputContainer}
                        onChange={(e) => handleOnChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        value={digit}
                        inputRef={(el: any) => (inputRefs.current[index] = el)}
                        maxLength={1}
                        disabled={isLoading}
                    />
                ))}
            </div>

            <Footer
                variant="default"
                primaryActionText={isLoading ? "Verifying..." : "Verify OTP"}
                primaryAction={() => verifyOTP()}
                disablePrimaryButton={
                    isLoading || otp.join("").length !== otpLength
                }
            />
        </div>
    );
};
