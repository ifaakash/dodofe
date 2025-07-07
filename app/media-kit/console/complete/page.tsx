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

const CompleteMediaKit = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null);
    const userId = loadState(STORAGE_CONSTANTS.userId);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [uploadingSection, setUploadingSection] = useState<string | null>(null);
    const [openHowToUpload, setOpenHowToUpload] = useState<string | null>(null);

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
        router.back();
        return null;
    }

    return (
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
    );
};

export default CompleteMediaKit; 