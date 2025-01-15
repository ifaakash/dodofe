import Image from "next/image";
import { SEPARATOR } from "./constants";
import cx from "classnames";

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

export const sidebarUI = (isSidebarOpen: boolean, toggleSidebar: () => void) => {
    console.log(isSidebarOpen)
    return (
        <div>
            <div
                className={cx(
                    "fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-50",
                    {
                        "translate-x-0": isSidebarOpen, // Sidebar is open
                        "translate-x-full": !isSidebarOpen, // Sidebar is hidden
                    }
                )}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button
                        className="text-lg font-bold text-gray-500"
                        onClick={toggleSidebar}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="text-gray-700 hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-700 hover:underline">
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-700 hover:underline">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-700 hover:underline">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Overlay (optional, to dim the rest of the page when sidebar is open) */}
            {
                isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={toggleSidebar}
                    ></div>
                )
            }
        </div >
    )
}

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