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
