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
        },
    ];

    // Only render the sidebar content when it's open
    if (!isSidebarOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
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
            {/* Sidebar */}
            <div className="relative w-64 h-full bg-white">
                <div className="flex flex-col h-full">
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
                    <div className="flex-1 pt-8">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="py-4 px-4 cursor-pointer text-xl"
                                onClick={item.action}
                                style={{
                                    fontFamily: "Clash Display",
                                    animation: `slideIn 0.3s ease-out forwards ${item.delay}ms`,
                                }}
                            >
                                {item.text}
                            </div>
                        ))}
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