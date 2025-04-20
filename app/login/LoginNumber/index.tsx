import { Footer, UserInput } from "@components/atoms";
import { useState, useEffect, useRef } from "react";
import cx from "classnames";
import styles from "./loginNumber.module.css";
import { loadState, saveState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import {
    signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "config/firebase";
import { toast } from "react-toastify";
import PhoneNumberInputBg from "public/assets/phoneNumberScreen.png";
import Image from "next/image";
import NewButton from "@components/atoms/Button/NewButton";
import { RecaptchaVerifier } from "firebase/auth";

export const LoginNumber = ({ setLoginState }: any) => {
    const [mobileNumber, setMobileNumber] = useState(loadState(STORAGE_CONSTANTS.MOBILE) || "");
    const [isLoading, setIsLoading] = useState(false);

    const numberRef = useRef<string>(mobileNumber);
    const recaptchaRef = useRef<any>(null);

    useEffect(() => {
        numberRef.current = mobileNumber;
    }, [mobileNumber]);

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                'recaptcha-container',
                {
                    size: "invisible",
                    callback: async () => {
                        console.log("reCAPTCHA verified");
                        await sendOtp();
                    },
                    "expired-callback": () => {
                        console.log("reCAPTCHA expired");
                        toast.error("reCAPTCHA expired, please try again.");
                    },
                }
            );
        }

        // Cleanup function to reset reCAPTCHA verifier on unmount
        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        };
    }, []); // Empty dependency array to run only on mount

    const handleMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setMobileNumber(value);
    };

    const gotoOtpScreen = async () => {
        if (mobileNumber.length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        setIsLoading(true);
        try {
            // Trigger reCAPTCHA
            await window.recaptchaVerifier.verify();

        } catch (error) {
            console.error("Error during reCAPTCHA verification:", error);
            toast.error("Failed to verify reCAPTCHA. Please try again.");
            setIsLoading(false);
        }
    };

    const sendOtp = async () => {
        const latestNumber = numberRef.current;
        try {
            console.log("Initiating phone authentication for:", latestNumber);
            const formattedNumber = `+91${latestNumber}`;

            console.log("Sending OTP to:", formattedNumber);
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formattedNumber,
                window.recaptchaVerifier
            );

            console.log("OTP sent successfully");
            window.confirmationResult = confirmationResult;
            saveState(STORAGE_CONSTANTS.MOBILE, latestNumber);
            toast.success("OTP sent successfully!");
            setLoginState(2);
        } catch (error: any) {
            console.error("Error sending OTP:", error);
            let errorMessage = "Failed to send OTP. Please try again.";

            if (error?.code === "auth/invalid-phone-number") {
                errorMessage = "Invalid phone number format";
            } else if (error?.code === "auth/too-many-requests") {
                errorMessage = "Too many attempts. Please try again later.";
            }

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle successful reCAPTCHA verification
    const onCaptchaSuccess = (token: string) => {
        // Handle the successful verification
        console.log('reCAPTCHA verified:', token);
    };

    return (
        <div>
            <Image
                src={PhoneNumberInputBg}
                alt="Phone Number Input Background"
                className="object-cover w-full h-[47vh]"
            />

            <div className="absolute bottom-0 h-[60vh] bg-white w-full rounded-[32px] py-[30px] px-6 flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="text-[#3D4966] font-bold text-[28px] leading-normal">
                            <span className={styles.shimmerBg}>Digits,</span> please!
                        </div>
                        <div className="text-[#979EAD] text-[20px] leading-normal">
                            Let's make this official 🫣
                        </div>
                    </div>

                    <div className="bg-[#EAE9EC] rounded-2xl p-4 flex flex-col gap-2">
                        <input
                            value={mobileNumber}
                            onChange={handleMobileNumber}
                            type="number"
                            className="w-full outline-none bg-transparent placeholder:text-[#3D4966] placeholder:font-normal placeholder:text-xl leading-normal font-semibold text-[#000] text-2xl"
                            placeholder="Enter phone number"
                            maxLength={10}
                        />
                        {/* <div className="bg-[#D0D0D0] w-full h-[1px]"></div> */}
                    </div>
                </div>

                <div id="recaptcha-container" className="invisible"></div>

                <NewButton
                    variant={mobileNumber.length === 10 ? "primary" : "disabled"}
                    size="large"
                    onClick={gotoOtpScreen}
                    className="w-full"
                >
                    Continue
                </NewButton>
            </div>
        </div>
    );
};
