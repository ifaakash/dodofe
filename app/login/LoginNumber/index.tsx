import { Footer, UserInput } from "@components/atoms";
import { useState, useEffect, useRef } from "react";
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
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [showRecaptcha, setShowRecaptcha] = useState(false);
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);

    const handleMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setMobileNumber(value);

        if (value.length === 10) {
            setShowRecaptcha(true);
            // Delay recaptcha initialization to ensure container is rendered
            setTimeout(() => {
                initRecaptcha();
            }, 0);
        } else {
            setShowRecaptcha(false);
            setRecaptchaVerified(false);
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch (error) {
                    console.error("Error clearing reCAPTCHA:", error);
                }
                window.recaptchaVerifier = null;
            }
        }
    };

    const initRecaptcha = () => {
        try {
            // Clear existing instance if any
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch (error) {
                    console.error("Error clearing existing reCAPTCHA:", error);
                }
                window.recaptchaVerifier = null;
            }

            // Create new instance
            if (!window.recaptchaVerifier && recaptchaContainerRef.current) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    recaptchaContainerRef.current,
                    {
                        size: "normal",
                        callback: () => {
                            console.log("reCAPTCHA verified");
                            setRecaptchaVerified(true);
                        },
                        "expired-callback": () => {
                            console.log("reCAPTCHA expired");
                            setRecaptchaVerified(false);
                            if (window.recaptchaVerifier) {
                                try {
                                    window.recaptchaVerifier.clear();
                                } catch (error) {
                                    console.error(
                                        "Error clearing expired reCAPTCHA:",
                                        error
                                    );
                                }
                                window.recaptchaVerifier = null;
                            }
                            setShowRecaptcha(false);
                            setTimeout(() => {
                                setShowRecaptcha(true);
                                initRecaptcha();
                            }, 100);
                        },
                    }
                );

                window.recaptchaVerifier.render();
            }
        } catch (error) {
            console.error("Error initializing reCAPTCHA:", error);
            // Reset states on error
            setShowRecaptcha(false);
            setRecaptchaVerified(false);
            window.recaptchaVerifier = null;
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch (error) {
                    console.error("Error cleaning up reCAPTCHA:", error);
                }
                window.recaptchaVerifier = null;
            }
        };
    }, []);

    const gotoOtpScreen = async () => {
        if (mobileNumber.length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        if (!recaptchaVerified) {
            toast.error("Please complete the reCAPTCHA verification");
            return;
        }

        setIsLoading(true);
        try {
            console.log("Initiating phone authentication for:", mobileNumber);
            const formattedNumber = `+91${mobileNumber}`;

            console.log("Sending OTP to:", formattedNumber);
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formattedNumber,
                window.recaptchaVerifier
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
            setShowRecaptcha(false);
            setRecaptchaVerified(false);
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch (error) {
                    console.error(
                        "Error clearing reCAPTCHA after OTP error:",
                        error
                    );
                }
                window.recaptchaVerifier = null;
            }
            setTimeout(() => {
                setShowRecaptcha(true);
                initRecaptcha();
            }, 100);
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
            <div className="flex flex-col gap-4 mt-8">
                <div className="text-sm text-gray-600">
                    Enter your phone number
                </div>
                <div
                    className={cx(
                        "card px-4 flex items-center flex-col w-full",
                        styles.cardDimensions
                    )}
                >
                    <div className="w-full relative">
                        <UserInput
                            name="mobileNumber"
                            className="w-full text-xl"
                            value={mobileNumber}
                            placeholder="Enter your mobile number"
                            onChange={handleMobileNumber}
                            errorMsg={"Please enter a valid number"}
                            type="tel"
                            maxLength={10}
                        />
                        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300 pointer-events-none">
                            {!mobileNumber && "0123456789"}
                        </div>
                    </div>
                </div>
                {showRecaptcha && (
                    <div
                        ref={recaptchaContainerRef}
                        className="flex justify-center mt-4"
                    />
                )}
            </div>
            <Footer
                variant="default"
                primaryActionText={isLoading ? "Sending OTP..." : "Continue"}
                primaryAction={gotoOtpScreen}
                disablePrimaryButton={
                    isLoading ||
                    mobileNumber.length !== 10 ||
                    !recaptchaVerified
                }
            />
        </div>
    );
};
