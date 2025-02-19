export { };

declare global {
    interface Window {
        otpless: any; // Adjust the type as needed (if you know the exact type, replace `any`)
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}