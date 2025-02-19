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
            text: "Settings",
            action: () => {
                window.location.href = ROUTE_CONSTANTS.THEME_SELECT;
                toggleSidebar();
            },
            delay: 100,
        },
        {
            text: "Logout",
            action: handleLogout,
            delay: 150,
        },
    ];

    // Only render the sidebar content when it's open
    if (!isSidebarOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Sidebar */}
            <div className="w-64 h-full bg-white">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-2xl font-normal">Menu</h2>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-gray-100 rounded-full text-xl"
                        >
                            ×
                        </button>
                    </div>
                    <div className="flex-1 pt-4">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="py-4 px-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-xl font-normal"
                                onClick={item.action}
                                style={{
                                    animation: `slideIn 0.3s ease-out forwards ${item.delay}ms`,
                                }}
                            >
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Overlay */}
            <div
                className="flex-1 bg-black bg-opacity-50"
                onClick={toggleSidebar}
            />
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