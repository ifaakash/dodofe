import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import leftArrow from "public/icons/leftArrow.svg";
import { handleNativeBackButton } from "@utils/index";

interface HeaderProps {
    title?: string;
    subtitle?: string;
    onBackClick?: () => void;
    initialBackgroundColor?: string;
}

export const Header = ({
    title,
    subtitle,
    onBackClick,
    initialBackgroundColor = "transparent",
}: HeaderProps) => {
    const router = useRouter();
    const [isScrolling, setIsScrolling] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            setScrollY(window.scrollY);
            setIsScrolling(false);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(true);
            }, 500);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("message", (event: MessageEvent) => handleNativeBackButton(event, () => router.back(), onBackClick));

        return () => {
            window.removeEventListener("message", (event: MessageEvent) => handleNativeBackButton(event, () => router.back(), onBackClick));
        };
    }, [router]);

    return (
        <div
            className={`h-16 flex pt-10 pb-6 fixed top-0 left-0 flex-row items-center w-full z-50 transition-transform duration-300 ${isScrolling ? "translate-y-0" : "-translate-y-full"
                }`}
            style={{
                backgroundColor: scrollY === 0 ? initialBackgroundColor : "white",
            }}
        >
            <div
                className="flex flex-row items-center cursor-pointer py-2"
                onClick={() => {
                    if (onBackClick) {
                        onBackClick();
                    } else {
                        router.back();
                    }
                }}>
                <Image
                    height={20}
                    width={20}
                    src={leftArrow}
                    alt="back arrow"
                    className="ml-4 cursor-pointer"
                />
            </div>

            <div className="flex flex-col ml-4">
                <span className="text-lg font-bold">{title}</span>
                {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>

            <div className="flex-grow"></div>
        </div>
    );
};