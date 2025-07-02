"use client"
import { ROUTE_CONSTANTS } from 'utils/constants';
import React, { useState } from 'react';
import Image from 'next/image';
import packageJson from 'package.json';

// Import icons
import DodoPageIcon from 'public/assets/file.svg';
import digiInvoiceIcon from 'public/assets/file-text-edit.svg';
import feedbackIcon from 'public/assets/note-list-check.svg';
import starIcon from 'public/icons/star.svg';
import contactUsIcon from 'public/icons/EnvelopeSimple.svg';
import HelpIcon from 'public/icons/whatsapp.svg';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { hideLogoutModalState, showLogoutModalState } from 'store/slice/commonSlice';

const Sidebar = ({
    isSidebarOpen,
    toggleSidebar,
    url
}: {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    url?: string;
}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        toggleSidebar();

        dispatch(showLogoutModalState());
    };

    const menuItems = [
        {
            text: "Your profile",
            icon: digiInvoiceIcon,
            action: () => {
                router.push(
                    ROUTE_CONSTANTS.PROFILE
                );

                toggleSidebar();
            },
            delay: 50,
        },
        {
            text: "DodoPage",
            icon: DodoPageIcon,
            action: () => {
                router.push(
                    ROUTE_CONSTANTS.DODOPAGE + ROUTE_CONSTANTS.SLASH + `${url}`
                );

                toggleSidebar();
            },
            delay: 0,
        },
        {
            text: "Digi-Invoice",
            icon: digiInvoiceIcon,
            action: () => {
                router.push(
                    ROUTE_CONSTANTS.INVOICE
                );

                toggleSidebar();
            },
            delay: 50,
        },
        {
            text: "Your Feedback",
            icon: feedbackIcon,
            action: () => {
                router.push('https://forms.gle/sRBijk9SuNvMZC6N9')
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
            text: "Contact us",
            icon: contactUsIcon,
            action: () => {
                window.location.href = "mailto:contact@dodoclub.in";
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
                                className="py-6 mx-2 px-4 cursor-pointer text-xl flex items-center"
                                onClick={item.action}
                                style={{
                                    fontFamily: "Clash Display",
                                }}
                            >
                                {item.icon && (
                                    <span className="mr-3">
                                        <Image src={item.icon} alt={item.text} width={16} height={20} />
                                    </span>
                                )}
                                <span className="text-base">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <span className="text-center text-sm text-gray-500 mb-2">Version: {packageJson.version}</span>
                    {/* Logout Button at the Bottom */}
                    <div className="mt-auto border-t border-gray-200">
                        <div
                            className="py-4 px-4 cursor-pointer text-xl flex items-center justify-center"
                            onClick={logoutItem.action}
                        >
                            <span className="mr-2">👋</span>
                            <span className="text-base clr-red" style={{ color: "var(--red)" }}>{logoutItem.text}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Sidebar);