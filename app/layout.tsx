"use client";
import "./styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";
import { trackEvent } from "@utils/index";
import { ReduxProvider } from "store/StoreProvider";
import CircleLoader from "components/atoms/Loaders/CircleLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dodo Club - The Super App for Creators",
    description:
        "Your art deserves a Pro Setup. Join the creator revolution with Dodo Club.",
    icons: {
        icon: [
            {
                url: "/images/dodofavicon.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/images/dodofavicon.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
        apple: [
            {
                url: "/images/dodofavicon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="webview-body">
        <ReduxProvider>
          <CircleLoader />
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