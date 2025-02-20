"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "@utils/index";
import { LoginNumber } from "./LoginNumber";
import { LoginOtp } from "./LoginOtp";
import { Splash } from "./Splash";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import Screen from "@components/molecules/Screen";
import { registerUser } from "api";
import { saveState } from "@utils/localStorage";

export default function LoginPage() {
    const [loginState, setLoginState] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Redirect if the user is already logged in
        if (isUserLoggedIn()) {
            router.push(ROUTE_CONSTANTS.HOME);
            return;
        }
    }, []);

    return (
        <Screen>
            {loginState === 0 && <Splash setLoginState={setLoginState} />}
            {loginState === 1 && <LoginNumber setLoginState={setLoginState} />}
            {loginState === 2 && <LoginOtp setLoginState={setLoginState} />}
        </Screen>
    );
}