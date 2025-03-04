import Image from "next/image";
import { SEPARATOR } from "./constants";
import cx from "classnames";
import { ROUTE_CONSTANTS } from "@utils/constants";
import Router from "next/navigation";

import lineSeperator from "public/icons/line.svg";
import solidLineSeperator from "public/icons/solidLine.svg";
import orSeperator from "public/icons/or.svg";

export const getSeperatorOptionsUI = (seperator: string) => {
    switch (seperator) {
        case SEPARATOR.LINE:
            return (
                <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={lineSeperator}
                    alt="user profile"
                    className="my-2"
                />
            );
        case SEPARATOR.SOLID:
            return (
                <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={solidLineSeperator}
                    alt="user profile"
                    className="my-2"
                />
            );
        case SEPARATOR.OR:
            return (
                <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={orSeperator}
                    alt="user profile"
                    className="my-2"
                />
            );
    }
};

export const getSidebarUI = ({
    isSidebarOpen,
    toggleSidebar,
}: {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}) => {
    const handleLogout = () => {
        localStorage.clear();
        toggleSidebar();
        window.location.href = ROUTE_CONSTANTS.LOGIN;
    };

    const menuItems = [
        {
            text: "Home",
            action: () => {
                window.location.href = ROUTE_CONSTANTS.HOME;
                toggleSidebar();
            },
            delay: 0,
        },
        {
            text: "Profile",
            action: () => {
                window.location.href = ROUTE_CONSTANTS.LINKS;
                toggleSidebar();
            },
            delay: 50,
        },
        {
            text: "Logout",
            action: handleLogout,
            delay: 100,
            bottom: true
        },
    ];

    // Only render the sidebar content when it's open
    if (!isSidebarOpen) return null;

    const logoutItem = menuItems[menuItems.length - 1];

    return (
        <div className="fixed inset-0 z-50 flex justify-start">
            {/* Semi-transparent overlay with blur */}
            <div
                className="absolute inset-0"
                onClick={toggleSidebar}
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)", // For Safari support
                }}
            />
            {/* Sidebar with animation, border radius, and margin */}
            <div
                className="sidebar relative w-64 h-[calc(100%-40px)] bg-white m-5 shadow-lg"
                style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    margin: "8px",
                }}
            >
                <div className="flex flex-col h-full" style={{ width: '200px' }}>
                    <div className="flex justify-between items-center p-4">
                        <h2
                            className="text-2xl"
                            style={{ fontFamily: "Clash Display" }}
                        >
                            Menu
                        </h2>
                        <button
                            onClick={toggleSidebar}
                            className="text-2xl px-2"
                            style={{ fontFamily: "Clash Display" }}
                        >
                            ×
                        </button>
                    </div>
                    <div className="flex-1 pt-8 overflow-y-auto">
                        {menuItems.slice(0, -1).map((item, index) => (
                            <div
                                key={index}
                                className="py-4 px-4 cursor-pointer text-xl"
                                onClick={item.action}
                                style={{
                                    fontFamily: "Clash Display",
                                }}
                            >
                                {item.text}
                            </div>
                        ))}
                    </div>

                    {/* Logout Button at the Bottom */}
                    <div className="mt-auto">
                        <div
                            className="py-4 px-4 cursor-pointer text-xl"
                            onClick={logoutItem.action}
                            style={{
                                fontFamily: "Clash Display",
                            }}
                        >
                            {logoutItem.text}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getLinkBoxUI = (data: any, badgeColor: string) => {
    return (
        <>
            <Image
                height={44}
                width={44}
                src="https://picsum.photos/seed/picsum/200/200"
                alt="user profile"
                className="mr-3 rounded-xl"
            />
            <div>
                <span className="ml-3 clr-dark-text font-normal text-sm">
                    {data?.description}
                </span>
                {badgeColor && (
                    getBadgeUI(data?.badge?.text, badgeColor)
                )}
            </div>
        </>
    )
}

export const getBadgeUI = (badgeText: string, badgeColor: string) => {
    return (
        <div className="flex">
            <div
                className="mt-1 ml-2 inline-block clr-text px-3 py-1 rounded-xl font-semibold text-white whitespace-nowrap self-start"
                style={{ backgroundColor: badgeColor, fontSize: '10px' }}
            >
                {badgeText}
            </div>
        </div>
    )
}

export function Card({ title, description, icon, bgColor, bgColorGo }) {
    return (
        <div className={`rounded-2xl p-3 h-80 shadow-md flex flex-col justify-between`} style={{ backgroundColor: bgColor, minWidth: '162px', maxWidth: '162px' }}>
            <div>
                <h1 className="text-lg text-left font-bold mb-1 leading-[16px] mb-4">{title}</h1>

                <p className="text-xs text-left leading-[16px] mb-4">{description}</p>

            </div>
            <div className="flex justify-between items-end">
                <Image
                    height={70}
                    width={70}
                    src={icon}
                    alt="calc"
                />
                <div className="bg-white flex items-center p-2 justify-center -rotate-45" style={{ borderRadius: '50%', transform: 'rotate(-45deg)', width: '30px', height: '30px', backgroundColor: bgColorGo }}>
                    →
                </div>
            </div>
        </div>
    );
}
