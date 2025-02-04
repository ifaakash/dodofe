"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { isUserLoggedIn } from "@utils/index";

import { LoginNumber } from "./LoginNumber";
import { LoginOtp } from "./LoginOtp";
import { Splash } from "./Splash";
import { UserCategory } from "./UserCategory";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import Screen from "@components/molecules/Screen";
import { registerUser } from "api";
import { saveState } from "@utils/localStorage";

export default function loginPage() {
  const [loginState, setLoginState] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Redirect if the user is already logged in
    if (isUserLoggedIn()) {
      router.push(ROUTE_CONSTANTS.HOME);
      return;
    }

    // Ensure the script is only added once
    const existingScript = document.getElementById("otpless-sdk");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "otpless-sdk";
      script.type = "text/javascript";
      script.src = "https://otpless.com/v3/auth.js";
      script.setAttribute(
        "data-appid",
        process.env.NEXT_PUBLIC_OTPLESS_APP_ID as string
      );
      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {
        if (window.otpless) {
          console.log("OTP-less SDK loaded:", window.otpless);
        }
      };
    }

    // Cleanup (optional, depends on if you want to unload the script)
    return () => {
      // Do not remove the script if you need it across navigations
    };
  }, []);

  useEffect(() => {
    const initializeUI = () => {
      const otplessDiv = document.getElementById("otpless-login-page");

      if (otplessDiv && typeof window !== "undefined" && window.otpless) {
        console.log("Reinitializing OTP-less UI...");
        // If needed, reset the div content
        otplessDiv.innerHTML = ""; // Clear the div to force the SDK to reinitialize
      }
    };

    // Ensure the UI is initialized on mount
    initializeUI();

    // Bind the `window.otpless` callback
    if (typeof window !== "undefined") {
      window.otpless = (otplessUser: any) => {
        console.log("Otpless User Data:", otplessUser);

        registerUser({
          mobileNumber: otplessUser?.identities[0]?.identityValue,
          otplessId: otplessUser?.userId,
          token: otplessUser.token
        })
          .then((res: any) => {
            saveState(STORAGE_CONSTANTS.TOKEN_SESSION_KEY, res.token);

            // saveState(STORAGE_CONSTANTS.userId, res?.userId);
            // router.push(ROUTE_CONSTANTS.HOME, { scroll: false });
            saveState(STORAGE_CONSTANTS.userId, res?.userId);
            saveState(STORAGE_CONSTANTS.MOBILE, otplessUser?.identities[0]?.identityValue);

            if (res?.isNewUser) {
              setLoginState(1); // New user flow
              return;
            }


            router.push(ROUTE_CONSTANTS.HOME, { scroll: false });
          })
          .catch((error) => {
            console.error("Error during verification:", error);
          });
      };
    }
  }, [router]);

  return (
    <Screen>
      {loginState === 1 && <div id="otpless-login-page"></div>}
      {loginState === 0 && <UserCategory />}
    </Screen>
  );
}