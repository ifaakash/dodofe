import { Footer, UserInput } from "@components/atoms";
import { useState } from "react";
import cx from "classnames";
import styles from "./loginNumber.module.css";
import { saveState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "config/firebase";
import { toast } from "react-toastify";

export const LoginNumber = ({ setLoginState }: any) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers
        const value = e.target.value.replace(/[^0-9]/g, "");
        setMobileNumber(value);
    };

    const setupRecaptcha = () => {
        try {
            if (!window.recaptchaVerifier) {
                console.log("Setting up new RecaptchaVerifier...");
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    "recaptcha-container",
                    {
                        size: "invisible",
                        callback: () => {
                            console.log("Recaptcha verified");
                        },
                        "expired-callback": () => {
                            toast.error("reCAPTCHA expired. Please try again.");
                            window.recaptchaVerifier = null;
                        },
                    }
                );
            }
        } catch (error) {
            console.error("Error setting up reCAPTCHA:", error);
            toast.error(
                "Failed to setup verification. Please refresh the page."
            );
            throw error;
        }
    };

    const validatePhoneNumber = (number: string) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };

    const gotoOtpScreen = async () => {
        if (!validatePhoneNumber(mobileNumber)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        setIsLoading(true);
        try {
            console.log("Initiating phone authentication for:", mobileNumber);
            setupRecaptcha();

            const formattedNumber = `+91${mobileNumber}`;
            const appVerifier = window.recaptchaVerifier;

            console.log("Sending OTP to:", formattedNumber);
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formattedNumber,
                appVerifier
            );

            console.log("OTP sent successfully");
            window.confirmationResult = confirmationResult;
            saveState(STORAGE_CONSTANTS.MOBILE, mobileNumber);
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

            // Reset reCAPTCHA on error
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-4 mt-16">
            <span className="text-xl clr-heading-text mb-2">Welcome!</span>
            <br />
            <span className="text-4xl font-black clr-heading-text">
                Sign in with
            </span>
            <br />
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
                    type="tel"
                    maxLength={10}
                />
            </div>
            <div id="recaptcha-container"></div>
            <Footer
                variant="default"
                primaryActionText={isLoading ? "Sending OTP..." : "Continue"}
                primaryAction={gotoOtpScreen}
                disablePrimaryButton={isLoading || mobileNumber.length !== 10}
            />
        </div>
    );
};
