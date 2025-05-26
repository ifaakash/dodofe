"use client";

import { Input } from "@components/atoms";
import { ArrowLeft, Instagram, X } from "lucide-react";
import NewButton from "@components/atoms/Button/NewButton";
import Link from "next/link";
import { useState } from "react";
import HelpIcon from 'public/icons/whatsapp.svg';
import contactUsIcon from 'public/icons/EnvelopeSimple.svg';
import Image from "next/image";
import Modal from "@components/molecules/Modal/Modal";
import { Header } from "@components/molecules/Header";

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        category: "",
        whatsapp: "",
        phone: "",
        email: "",
        instagram: ""
    });

    const [showVerifyModal, setShowVerifyModal] = useState(false);

    const handleChange = (field: string, value: string) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const VerifyInstagramModal = () => (
        <div className="p-4 pb-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Verify <span className="text-[#FF4D67]">Instagram</span>
                </h2>
                <button onClick={() => setShowVerifyModal(false)}>
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Copy Link Section */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2 px-4 mb-8">
                <span className="flex-1 text-sm truncate">Dodopage/rajveer1323...</span>
                <button className="text-[#00BA7C] font-semibold text-sm">
                    Copy
                </button>
            </div>


            {/* Steps Section */}
            <div>
                <h3 className="text-sm font-semibold mb-4">STEPS TO VERIFY</h3>

                <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="flex gap-4 items-start bg-[#F8F2FF] rounded-2xl p-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#E6D3FF] rounded-full text-sm font-bold">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">Copy your dodopage link</h4>
                            <p className="text-sm text-gray-600">Share ads & get paid for clicks & views</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4 items-start bg-[#F0FFE6] rounded-2xl p-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#DAFFBF] rounded-full text-sm font-bold">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">Paste it to your Instagram bio.</h4>
                            <p className="text-sm text-gray-600">Wait, our team will verify within 24 hrs.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Verify Now Button */}
            <div className="mt-8">
                <NewButton
                    variant="primary"
                    size="large"
                    className="w-full"
                    onClick={() => console.log("Verifying...")}
                >
                    Verify now
                </NewButton>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <Header title="Your profile" />

            <div className="p-4 mt-16 flex flex-col gap-6">
                {/* Basic Info Section */}
                <div className="flex flex-col gap-3">
                    <div className="text-[#5E6C84] text-xs font-semibold">BASIC INFO</div>
                    <Input
                        placeholder="Enter name"
                        value={profileData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                        placeholder="Tech, Entertainment"
                        value={profileData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    />
                </div>

                {/* Communication Section */}
                <div className="flex flex-col gap-3">
                    <div className="text-[#5E6C84] text-xs font-semibold">FOR COMMUNICATION</div>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E5E7EB] p-3">
                        <Image src={HelpIcon} alt="WhatsApp" className="w-6 h-6" />
                        <input
                            className="flex-1 outline-none bg-transparent"
                            placeholder="Whatsapp Number"
                            value={profileData.whatsapp}
                            onChange={(e) => handleChange("whatsapp", e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E5E7EB] p-3">
                        <Image src={HelpIcon} alt="Phone" className="w-6 h-6" />
                        <input
                            className="flex-1 outline-none bg-transparent"
                            placeholder="Phone Number"
                            value={profileData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E5E7EB] p-3">
                        <Image src={contactUsIcon} alt="Email" className="w-6 h-6" />
                        <input
                            className="flex-1 outline-none bg-transparent"
                            placeholder="Email"
                            value={profileData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                </div>

                {/* Social Verification Section */}
                <div className="flex flex-col gap-3">
                    <div className="text-[#5E6C84] text-xs font-semibold">SOCIAL VERIFICATION</div>
                    <div className="relative">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E5E7EB] p-3">
                            <Instagram className="w-6 h-6 text-pink-500" />
                            <input
                                className="flex-1 outline-none bg-transparent"
                                placeholder="Instagram ID"
                                value={profileData.instagram}
                                onChange={(e) => handleChange("instagram", e.target.value)}
                            />
                        </div>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-gray-100 px-2 py-1 rounded">
                            Unverified
                        </span>
                    </div>

                    {/* Note Section */}
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                        <div className="text-xs font-semibold mb-1">NOTE</div>
                        <p className="text-sm">
                            Your instagram account should be verified by dodo with minimum 10K followers{" "}
                            <button
                                onClick={() => setShowVerifyModal(true)}
                                className="text-blue-600 font-semibold"
                            >
                                VERIFY NOW
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="fixed bottom-0 w-full p-4">
                <NewButton
                    variant="primary"
                    size="large"
                    className="w-full"
                    onClick={() => console.log("Save changes")}
                >
                    Save changes
                </NewButton>
            </div>

            {/* Verify Instagram Modal */}
            <Modal
                visible={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
                showCloseIcon={false}
                showOuterCloseIcon={false}
                bottomSheet={true}
            >
                <VerifyInstagramModal />
            </Modal>
        </div>
    );
};

export default ProfilePage;
