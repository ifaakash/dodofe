import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import leftArrow from "public/icons/leftArrow.svg";

interface HeaderProps {
    title?: string;
    subtitle?: string;
    onBackClick?: () => void;
}

export const Header = ({
    title,
    subtitle,
    onBackClick,
}: HeaderProps) => {
    const router = useRouter();
    const [isScrolling, setIsScrolling] = useState(true);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            setIsScrolling(false); // Hide the header when scrolling
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(true); // Show the header after scrolling stops
            }, 500); // Adjust the delay as needed
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <div
            className={`h-16 flex pt-12 pb-6 fixed top-0 left-0 flex-row items-center w-full z-50 transition-transform duration-300 ${isScrolling ? "bg-white translate-y-0" : "-translate-y-full"
                }`}
        >
            <Image
                height={20}
                width={20}
                src={leftArrow}
                alt="back arrow"
                className="ml-4 cursor-pointer"
                onClick={() => {
                    if (onBackClick) {
                        onBackClick();
                    } else {
                        router.back();
                    }
                }}
            />

            <div className="flex flex-col ml-4">
                <span className="text-lg font-bold">{title}</span>
                {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>

            <div className="flex-grow"></div>
        </div>
    );
};