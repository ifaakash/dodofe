"use client"
import { ROUTE_CONSTANTS } from 'utils/constants';
import React from 'react';
import Image from 'next/image';

// Import icons
import DodoPageIcon from 'public/assets/file.svg';
import digiInvoiceIcon from 'public/assets/file-text-edit.svg';
import feedbackIcon from 'public/assets/note-list-check.svg';
import starIcon from 'public/icons/star.svg';
import contactUsIcon from 'public/icons/EnvelopeSimple.svg';
import HelpIcon from 'public/icons/whatsapp.svg';

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
            text: "DodoPage",
            icon: DodoPageIcon,
            action: () => {
                window.location.href = ROUTE_CONSTANTS.DODOPAGE;
                toggleSidebar();
            },
            delay: 0,
        },
        {
            text: "Digi-Invoice",
            icon: digiInvoiceIcon,
            action: () => {
                window.location.href = ROUTE_CONSTANTS.LINKS;
                toggleSidebar();
            },
            delay: 50,
        },
        {
            text: "Your Feedback",
            icon: feedbackIcon,
            action: () => {
                console.log("Navigate to Settings");
                toggleSidebar();
            },
            delay: 100,
        },
        {
            text: "Motivate us",
            icon: starIcon,
            action: () => {
                console.log("Navigate to Notifications");
                toggleSidebar();
            },
            delay: 150,
        },
        {
            text: "Constact us",
            icon: contactUsIcon,
            action: () => {
                console.log("Navigate to Help");
                toggleSidebar();
            },
            delay: 200,
        },
        {
            text: "Help",
            icon: HelpIcon,
            action: () => {
                console.log("Navigate to Help");
                toggleSidebar();
            },
            delay: 200,
        },
        {
            text: "Logout",
            action: handleLogout,
            delay: 250,
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
                className="sidebar relative w-70 h-[calc(100%-20px)] bg-white m-5 shadow-lg"
                style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    margin: "8px",
                }}
            >
                <div className="flex flex-col h-full" style={{ width: '230px' }}>
                    <div className="flex justify-between items-center p-4 pb-0">
                        <h2
                            className="text-2xl"
                            style={{ fontFamily: "Clash Display" }}
                        >

                        </h2>
                        <button
                            onClick={toggleSidebar}
                            className="text-4xl px-2"
                            style={{ fontFamily: "Clash Display" }}
                        >
                            ×
                        </button>
                    </div>
                    <div className="flex-1 pt-2 overflow-y-auto">
                        {menuItems.slice(0, -1).map((item, index) => (
                            <div
                                key={index}
                                className="py-4 px-4 cursor-pointer text-xl flex items-center"
                                onClick={item.action}
                                style={{
                                    fontFamily: "Clash Display",
                                }}
                            >
                                {item.icon && (
                                    <span className="mr-2">
                                        <Image src={item.icon} alt={item.text} width={24} height={24} />
                                    </span>
                                )}
                                <span className="text-base">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Logout Button at the Bottom */}
                    <div className="mt-auto">
                        <div
                            className="py-4 px-4 cursor-pointer text-xl flex items-center"
                            onClick={logoutItem.action}
                            style={{
                                fontFamily: "Clash Display",
                                color: "var(--red)"
                            }}
                        >
                            {/* <span className="mr-2">
                                <Image src={logoutItem.icon} alt={logoutItem.text} width={24} height={24} />
                            </span> */}
                            <span className="mr-2">👋</span>
                            {logoutItem.text}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;