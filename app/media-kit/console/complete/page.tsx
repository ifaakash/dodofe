'use client'
import { Header } from "@components/molecules/Header";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserDetails, addMediaKitAnalytics } from "api/services";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { userDetailsProps } from "types";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import UploadIcon from "public/icons/upload2.svg";
import HowToUpload from "@components/molecules/mediakit/HowToUpload";
import Step1 from 'public/images/ExportStep1.png';
import Step2 from 'public/images/ExportStep2.png';
import ContentStep3 from 'public/images/ExportStep3.png';
import GenderStep3 from 'public/images/GenderStep3.png';
import AgeStep3 from 'public/images/AgeStep3.png';
import LocationStep3 from 'public/images/LocationStep3.png';
import confetti from 'canvas-confetti';
import SuccessModal from 'public/assets/mediakit-success.png';

const CompleteMediaKit = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null);
    const userId = loadState(STORAGE_CONSTANTS.userId);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [uploadingSection, setUploadingSection] = useState<string | null>(null);
    const [openHowToUpload, setOpenHowToUpload] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (showSuccessModal) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.7 }
            });
        }
    }, [showSuccessModal]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true);
            const response = await getUserDetails(userId as string);
            setUserDetails(response.user);
            setIsLoading(false);
        };
        fetchUserDetails();
    }, [userId]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string, type: string) => {
        setUploadingSection(section);
        const file = e.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('screenshot', file);
                formData.append('instaId', userDetails?.mediaKit?.instaId || '');
                formData.append('type', type);

                const response = await addMediaKitAnalytics(formData);
                if (response.success) {
                    toast.success('Upload successful');
                    // Refresh user details to get updated data
                    const updatedUser = await getUserDetails(userId as string);
                    setUserDetails(updatedUser.user);
                } else {
                    toast.error('Upload failed');
                }
            } catch (error) {
                console.error('Upload error:', error);
                toast.error('Upload failed');
            } finally {
                setUploadingSection(null);
            }
        }
    };

    const getStep3Image = (section: string) => {
        switch (section) {
            case 'contentType':
                return ContentStep3;
            case 'genderDistribution':
                return GenderStep3;
            case 'ageDistribution':
                return AgeStep3;
            case 'locationDistribution':
                return LocationStep3;
            default:
                return ContentStep3;
        }
    };

    const getSectionTitle = (section: string) => {
        switch (section) {
            case 'contentType':
                return 'Content Type?';
            case 'genderDistribution':
                return 'Gender Distribution?';
            case 'ageDistribution':
                return 'Age Range?';
            case 'locationDistribution':
                return 'Location?';
            default:
                return '';
        }
    };

    const UploadButton = ({ section, type }: { section: string, type: string }) => (
        <label className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2 cursor-pointer">
            <span className="text-xs font-semibold">
                {uploadingSection === section ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <span>Upload</span>
                        <Image src={UploadIcon} alt="Upload" width={16} height={16} />
                    </div>
                )}
            </span>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e, section, type)}
                className="hidden"
            />
        </label>
    );

    if (isLoading || !userDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                    <span className="text-sm text-gray-500">Loading, please wait...</span>
                </div>
            </div>
        );
    }

    const showContentType = !userDetails?.mediaKit?.contentAnalytics?.contentData;
    const showGender = !userDetails?.mediaKit?.genderAnalytics?.genderData;
    const showAge = !userDetails?.mediaKit?.ageAnalytics?.ageData;
    const showLocation = !userDetails?.mediaKit?.locationAnalytics?.locationData;

    const hasAnySectionToShow = showContentType || showGender || showAge || showLocation;

    if (!hasAnySectionToShow) {
        setShowSuccessModal(true);
    }

    const mediaKitUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/media-kit/${userId}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(mediaKitUrl);
        toast.success('Link copied to clipboard!');
    };

    const handleShare = async () => {
        const messageText = "👋 Hey! You've seen my content, now see the numbers behind it. From audience insights to brand collabs, pricing to reach… It's all here in my media kit.👇";

        try {
            await navigator.share({
                title: 'My Media Kit',
                text: messageText,
                url: mediaKitUrl
            });
        } catch (err) {
            handleCopyLink();
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        router.back();
    };

    return (
        <>
            <div className="min-h-screen">
                <Header title="Complete Your mediakit" />

                <div className="p-4 mt-16">
                    {/* Content Type Section */}
                    {showContentType && (
                        <div className="bg-white rounded-xl px-4 py-2 mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold mb-1">Content Type</div>
                                    <button
                                        className="text-[#6366F1] text-sm"
                                        onClick={() => setOpenHowToUpload('contentType')}
                                    >
                                        How to upload?
                                    </button>
                                </div>
                                <UploadButton section="contentType" type="content" />
                            </div>
                        </div>
                    )}

                    {/* Gender Distribution Section */}
                    {showGender && (
                        <div className="bg-white rounded-xl px-4 py-2 mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold mb-1">Gender Distribution</div>
                                    <button
                                        className="text-[#6366F1] text-sm"
                                        onClick={() => setOpenHowToUpload('genderDistribution')}
                                    >
                                        How to upload?
                                    </button>
                                </div>
                                <UploadButton section="genderDistribution" type="gender" />
                            </div>
                        </div>
                    )}

                    {/* Age Distribution Section */}
                    {showAge && (
                        <div className="bg-white rounded-xl px-4 py-2 mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold mb-1">Age Distribution</div>
                                    <button
                                        className="text-[#6366F1] text-sm"
                                        onClick={() => setOpenHowToUpload('ageDistribution')}
                                    >
                                        How to upload?
                                    </button>
                                </div>
                                <UploadButton section="ageDistribution" type="age" />
                            </div>
                        </div>
                    )}

                    {/* Location Distribution Section */}
                    {showLocation && (
                        <div className="bg-white rounded-xl px-4 py-2 mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold mb-1">Location Distribution</div>
                                    <button
                                        className="text-[#6366F1] text-sm"
                                        onClick={() => setOpenHowToUpload('locationDistribution')}
                                    >
                                        How to upload?
                                    </button>
                                </div>
                                <UploadButton section="locationDistribution" type="location" />
                            </div>
                        </div>
                    )}
                </div>

                {/* How to Upload Modal */}
                {openHowToUpload && (
                    <HowToUpload
                        title={getSectionTitle(openHowToUpload)}
                        step1={Step1 as any}
                        step2={Step2 as any}
                        step3={getStep3Image(openHowToUpload) as any}
                        isOpen={!!openHowToUpload}
                        onClose={() => setOpenHowToUpload(null)}
                    />
                )}
            </div>
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Image src={SuccessModal} alt="Success" width={320} height={320} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Media Kit is Lit! 🔥✨</h3>
                            <p className="text-gray-600 text-sm mb-6">Share your professional media kit with brands to showcase your influence and secure exciting collaborations!</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleCopyLink}
                                className="w-full bg-black text-white py-3 px-4 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M8 12H16M8 16H16M8 8H16M4 4V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V4C20 3.44772 19.5523 3 19 3H5C4.44772 3 4 3.44772 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Copy Link
                            </button>
                            <button
                                onClick={handleShare}
                                className="w-full border-2 border-black text-black py-3 px-4 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompleteMediaKit; 