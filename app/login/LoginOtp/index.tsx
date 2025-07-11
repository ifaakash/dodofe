import { Footer, UserInput } from "@components/atoms";
import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import styles from "./loginOtp.module.css";
import Image from "next/image";
import editIcon from "public/icons/edit.svg";
import { loadState, saveState } from "@utils/localStorage";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useRouter } from "next/navigation";
import { registerUser, sendOtp } from "api";
import PhoneNumberInputBg from "public/assets/phoneNumberScreen.png";
import NewButton from "@components/atoms/Button/NewButton";
import { toast } from "react-hot-toast";
import { RotateCcw } from "lucide-react";
import { auth } from "config/firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { useSearchParams } from "next/navigation";



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
    const [isTermsChecked, setIsTermsChecked] = useState(true);
    const [timer, setTimer] = useState(20); // to be set to 60 seconds
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const searchParams = useSearchParams()
    const mediakitRef = searchParams.get('mediakitRef')

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
            updatedOtp.join("").length === otpLength &&
            isTermsChecked
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

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer]);

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
                firebaseUid: userCredential.uid,
            });
            console.log("Response from backend:", response);

            saveState(STORAGE_CONSTANTS.TOKEN_SESSION_KEY, response.token);
            saveState(STORAGE_CONSTANTS.userId, response?.userId);
            saveState(STORAGE_CONSTANTS.MOBILE, mobileNumber);

            if (response?.isNewUser && mediakitRef) {
                router.push(ROUTE_CONSTANTS.USER_CATEGORY + '?mediakitRef=' + mediakitRef)
            } else if (response?.isNewUser) {
                router.push(ROUTE_CONSTANTS.USER_CATEGORY);
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

    const handleResend = async () => {
        if (isResendDisabled) return;

        try {
            setIsLoading(true);
            const mobileNumber = loadState(STORAGE_CONSTANTS.MOBILE);
            if (!mobileNumber) {
                toast.error("Mobile number not found.");
                return;
            }

            // Recreate reCAPTCHA verifier if needed
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    'recaptcha-container',
                    {
                        size: 'invisible',
                        callback: () => {
                            console.log("reCAPTCHA verified again.");
                        },
                        'expired-callback': () => {
                            console.log("reCAPTCHA expired");
                            toast.error("reCAPTCHA expired, please try again.");
                        },
                    }
                );
            }

            const formattedNumber = `+91${mobileNumber}`;
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formattedNumber,
                window.recaptchaVerifier
            );

            window.confirmationResult = confirmationResult;
            toast.success("OTP resent successfully!");
            setOtp(Array.from({ length: otpLength }, () => ""));
            setActiveOtpIndex(0);
            setTimer(20) // to be `set to 60 seconds`
            setIsResendDisabled(true);
        } catch (error: any) {
            console.error("Error resending OTP:", error);
            toast.error("Failed to resend OTP. Try again.");
        } finally {
            setIsLoading(false);
        }
    };



    const handleNavigateToLoginNumber = () => {
        setLoginState(1);
    };

    const isButtonDisabled = !isTermsChecked || otp.some((digit) => digit === "");

    return (
        <div>
            <Image
                src={PhoneNumberInputBg}
                alt="Phone Number Input Background"
                className="object-cover w-full"
            />

            <div className="absolute bottom-0 h-[64vh] bg-white w-full rounded-[32px] py-[30px] px-6 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="text-[#3D4966] font-bold text-[28px] leading-normal">
                            We sent you a code
                        </div>
                        <div className="text-[#979EAD] text-[20px] leading-normal">
                            drop it here! 🤫
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="number"
                                className="bg-[#EAE9EC] p-2 w-12 rounded-xl text-center text-lg focus:outline-none font-bold"
                                maxLength={1}
                                onChange={(e) => handleOnChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                value={otp[index]}
                                ref={(el: any) => (inputRefs.current[index] = el)}
                                disabled={isLoading}
                                placeholder="•"
                                autoFocus={index === 0}
                                style={{
                                    border: "1px solid #D0D0D0",
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <div
                            onClick={handleNavigateToLoginNumber}
                            className="flex items-center gap-1 text-xs"
                        >
                            <span>sent to {loadState(STORAGE_CONSTANTS.MOBILE)}</span>
                            <Image src={editIcon} alt="edit" />
                        </div>
                        <div
                            className={`flex items-center gap-1 text-xs ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            onClick={handleResend}
                        >
                            <span className="text-brandPrimary font-semibold">
                                {timer > 0 ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : 'Resend'}
                            </span>
                            <RotateCcw size={12} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isTermsChecked}
                            onChange={() => setIsTermsChecked(!isTermsChecked)}
                        />
                        <span className="text-xs">I agree to the terms and conditions</span>
                    </div>
                </div>

                <div id="recaptcha-container" className="invisible"></div>

                <NewButton
                    variant={isButtonDisabled ? "disabled" : "primary"}
                    size="large"
                    onClick={() => { }}
                    className="w-full"
                >
                    Continue
                </NewButton>
            </div>
        </div>

    );
};


