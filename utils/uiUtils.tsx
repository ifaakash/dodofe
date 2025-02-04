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

export const getSidebarUI = ({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) => {
    const handleLogout = () => {
        // Clear all storage
        localStorage.clear();
        // Close sidebar
        toggleSidebar();
        // Redirect to login
        window.location.href = ROUTE_CONSTANTS.LOGIN;
    };

    console.log(isSidebarOpen);

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
        <div>
            {/* Sidebar */}
            <div
                className={cx(
                    "fixed h-full w-64 bg-white shadow-lg transition-all duration-300 z-50 top-0"
                )}
                style={{ right: isSidebarOpen ? "0" : "-100px" }}
            >
                <div className="p-4 flex justify-between items-center border-b mt-12">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button className="text-lg font-bold text-gray-500" onClick={toggleSidebar}>
                        &times;
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-4">
                        {menuItems.map((item, index) => (
                            <li
                                key={item.text}
                                className={`transform transition-all duration-300 ${isSidebarOpen
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

            {/* Overlay (click outside to close sidebar)
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={toggleSidebar}
                ></div>
            )} */}
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