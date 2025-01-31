"use client";
import "./styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import { trackEvent } from "@utils/index";
import { ReduxProvider } from "store/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}

// export async function getServerSideProps() {

//   const mixpanelId = process.env.MIXPANEL_ID;

//   return { props: { mixpanelId } }
// }
