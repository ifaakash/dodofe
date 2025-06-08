"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "@components/molecules/Modal/Modal";
import Input from "@components/atoms/Input/Input";
import NewButton from "@components/atoms/Button/NewButton";
import instaIcon from "public/icons/insta.svg";
import { addBrandCollaboration } from "../../../../api/services";

interface BrandCollaboration {
    brandName: string;
    brandLogo: string;
    type: string;
    reach: string;
    engagement: string;
}

interface BrandSectionProps {
    collaborations?: BrandCollaboration[];
    onCollaborationAdded?: () => void;
}

const BrandSection: React.FC<BrandSectionProps> = ({
    collaborations = [
        {
            brandName: "Brand Name",
            brandLogo: instaIcon,
            type: "Reel",
            reach: "100K",
            engagement: "10%"
        },
        {
            brandName: "Brand Name 2",
            brandLogo: instaIcon,
            type: "Reel",
            reach: "100K",
            engagement: "10%"
        }
    ],
    onCollaborationAdded
}) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newBrand, setNewBrand] = useState<BrandCollaboration>({
        brandName: "",
        brandLogo: "",
        type: "Reel",
        reach: "",
        engagement: ""
    });
    const [selectedType, setSelectedType] = useState<'Reel' | 'Story' | 'Post'>('Reel');

    const handleInputChange = (field: keyof BrandCollaboration, value: string) => {
        setNewBrand(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await addBrandCollaboration({
                ...newBrand,
                type: selectedType
            });

            setShowAddModal(false);
            setNewBrand({
                brandName: "",
                brandLogo: "",
                type: "Reel",
                reach: "",
                engagement: ""
            });

            // Notify parent to refresh data
            if (onCollaborationAdded) {
                onCollaborationAdded();
            }
        } catch (error) {
            console.error('Error adding brand collaboration:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-purple-500 font-bold text-xl">Brand</span>
                    <span className="text-gray-400 uppercase text-xl tracking-wider">COLLABORATION</span>
                </div>
                <div className="flex items-center">
                    <button className="bg-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Brand Cards - Horizontal Scroll */}
            <div className="relative">
                <div className="overflow-x-auto pb-4 hide-scrollbar">
                    <div className="flex gap-4 w-full">
                        {collaborations.map((collab, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-xl p-4 shrink-0"
                                style={{ width: '280px' }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-red-700 rounded-lg overflow-hidden">
                                            <Image
                                                src={collab.brandLogo}
                                                alt={collab.brandName}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-[#4A4E65] font-bold">{collab.brandName}</h3>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-[#4A4E65]">Type:</span>
                                        <span className="text-[#4A4E65] font-medium">{collab.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#4A4E65]">Reach:</span>
                                        <span className="text-[#4A4E65] font-medium">{collab.reach}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#4A4E65]">Engagement:</span>
                                        <span className="text-[#4A4E65] font-medium">{collab.engagement}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add New Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm hover:shadow transition-all"
                >
                    <span className="text-gray-500">Add New</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>

            {/* Add New Modal */}
            <Modal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
                modalHeader={
                    <div className="flex items-center">
                        <span className="text-black text-2xl font-bold">Add</span>
                        <span className="text-[#FF8E78] text-2xl font-bold ml-2">Brand</span>
                    </div>
                }
            >
                <div className="">
                    {/* Info Message */}
                    <div className="bg-[#F0F7FF] rounded-lg p-4 mb-6 mt-2">
                        <p className="text-[#0066CC]">
                            Your Past Brand colloboration details, helps you to stand out and get more Brands.
                        </p>
                    </div>

                    {/* Brand Name Input */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <Input
                                    className="border-0"
                                    placeholder="Brand Name"
                                    value={newBrand.brandName}
                                    onChange={(e) => handleInputChange("brandName", e.target.value)}
                                />
                            </div>
                            <button className="text-[#4CAF50]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content Type */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Content type</h3>
                        <div className="flex gap-4">
                            {(['Reel', 'Story', 'Post'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        handleInputChange("type", type);
                                    }}
                                    className={`flex-1 py-3 px-6 rounded-full border ${selectedType === type
                                        ? 'border-black bg-gray-100'
                                        : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Link Input */}
                    <div className="mb-6">
                        <Input
                            placeholder="Link"
                            value={newBrand.brandLogo}
                            onChange={(e) => handleInputChange("brandLogo", e.target.value)}
                        />
                    </div>

                    {/* Insight Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Insight <span className="text-gray-400">(OPTIONAL)</span></h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Reach"
                                value={newBrand.reach}
                                onChange={(e) => handleInputChange("reach", e.target.value)}
                            />
                            <Input
                                placeholder="Engagement"
                                value={newBrand.engagement}
                                onChange={(e) => handleInputChange("engagement", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Add Button */}
                    <div className="flex justify-end gap-2 mt-6">
                        <NewButton
                            variant="secondary"
                            size="small"
                            onClick={() => setShowAddModal(false)}
                        >
                            Cancel
                        </NewButton>
                        <NewButton
                            variant="primary"
                            size="small"
                            onClick={handleSave}
                            className={loading ? 'opacity-50 cursor-not-allowed' : ''}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </NewButton>
                    </div>
                </div>
            </Modal>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default BrandSection; 