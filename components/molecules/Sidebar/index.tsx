"use client"
import { ROUTE_CONSTANTS } from 'utils/constants';
import React from 'react';

const Sidebar = ({
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
                className="sidebar relative w-70 h-[calc(100%-40px)] bg-white m-5 shadow-lg"
                style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    margin: "8px",
                }}
            >
                <div className="flex flex-col h-full" style={{ width: '230px' }}>
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

export default Sidebar;