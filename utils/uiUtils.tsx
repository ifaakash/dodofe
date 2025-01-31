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

export const sidebarUI = (
    isSidebarOpen: boolean,
    toggleSidebar: () => void
) => {
    const handleLogout = () => {
        // Clear all storage
        localStorage.clear();
        // Close sidebar
        toggleSidebar();
        // Redirect to login
        window.location.href = ROUTE_CONSTANTS.LOGIN;
    };

    const menuItems = [
        {
            text: "Home",
            action: () => (window.location.href = ROUTE_CONSTANTS.HOME),
            delay: 0,
        },
        {
            text: "Profile",
            action: () => (window.location.href = ROUTE_CONSTANTS.LINKS),
            delay: 50,
        },
        {
            text: "Settings",
            action: () => (window.location.href = ROUTE_CONSTANTS.THEME_SELECT),
            delay: 100,
        },
        { text: "Logout", action: handleLogout, delay: 150 },
    ];

    return (
        <>
            {/* Overlay with fade animation */}
            {/* <div
                className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                        ? "bg-opacity-50"
                        : "bg-opacity-0 pointer-events-none"
                }`}
                onClick={toggleSidebar}
                style={{
                    zIndex: 40,
                    backdropFilter: isSidebarOpen ? "blur(4px)" : "none",
                }}
            /> */}

            {/* Sidebar with slide and fade animation */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                }`}
                style={{
                    zIndex: 50,
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button
                        className="text-2xl font-bold text-gray-500 hover:text-gray-700 transform transition-transform duration-200 hover:scale-110"
                        onClick={toggleSidebar}
                    >
                        ×
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-4">
                        {menuItems.map((item, index) => (
                            <li
                                key={item.text}
                                className={`transform transition-all duration-300 ${
                                    isSidebarOpen
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-8 opacity-0"
                                }`}
                                style={{
                                    transitionDelay: isSidebarOpen
                                        ? `${item.delay}ms`
                                        : "0ms",
                                }}
                            >
                                <button
                                    onClick={item.action}
                                    className="w-full text-left text-gray-700 hover:text-gray-900 block py-2 transition-all duration-200 hover:pl-2"
                                >
                                    {item.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
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