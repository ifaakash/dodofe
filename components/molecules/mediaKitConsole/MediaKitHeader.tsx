import { MailIcon, Loader2 } from "lucide-react"
import mediaKitImage from "/public/assets/mediaKitUser.png"
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { updateMediaKit } from "api/services";
import { toast } from "react-hot-toast";
import { processImage } from "@utils/imageUtils";
import { CATEGORIES } from "@utils/index";

interface MediaKitHeaderInterface {
    data: any;
    variant: "public" | "edit";
    isLoading?: boolean;
}

const MediaKitHeaderSkeleton = () => {
    return (
        <div className="flex gap-3 flex-col items-center animate-pulse">
            <div className="w-[100px] h-[100px] rounded-full bg-white" />
            <div className="flex flex-col gap-2 items-center">
                <div className="h-5 w-32 bg-white rounded-md" />
                <div className="flex gap-1 flex-col items-center">
                    <div className="h-4 w-48 bg-white rounded-md" />
                </div>
            </div>
        </div>
    );
};

const shimmerStyles = `
.shimmer-tag {
    position: relative;
    overflow: hidden;
}

.shimmer-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    animation: shimmer 3s infinite;
    transform: skewX(-20deg);
}

@keyframes shimmer {
    0% {
        left: -100%;
    }
    100% {
        left: 200%;
    }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = shimmerStyles;
    document.head.appendChild(style);
}

const MediaKitHeader = ({ data, variant, isLoading = false }: MediaKitHeaderInterface) => {
    const [userProfileImage, setUserProfileImage] = useState<
        string | undefined
    >();
    const [userInterestCategories, setUserInterestCategories] = useState([]);
    const [userName, setUserName] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // This is to be improved
    useEffect(() => {
        if (variant === "edit") {
            setUserProfileImage(data?.mediaKit?.mediaKitProfileImage);
            setUserInterestCategories(data?.interestCategories);
            setUserName(data?.dodoPages[0]?.name);
            return;
        }

        setUserProfileImage(data?.mediaKitProfileImage);
        setUserInterestCategories(data?.user?.interestCategories);
        setUserName(data?.user?.name);
    }, [data]);

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Process image with HEIC conversion and size validation
        const result = await processImage(file, {
            maxSizeMB: 5,
            quality: 0.8,
            showToast: true,
        });

        if (!result.success) {
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("mediaKitProfileImage", result.file!);
            formData.append("instaId", data?.mediaKit?.instaId || "");
            console.log(formData, "formData");

            const response = await updateMediaKit(formData);
            if (response.success) {
                setUserProfileImage(response.data.mediaKitProfileImage);
                toast.success("Profile image updated successfully");
            } else {
                toast.error("Failed to update profile image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to update profile image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageClick = () => {
        if (variant === "edit") {
            fileInputRef.current?.click();
        }
    };

    if (isLoading) {
        return <MediaKitHeaderSkeleton />;
    }

    return (
        <div className="flex gap-3 flex-col items-center">
            <div
                className="w-[100px] h-[100px] rounded-full overflow-hidden relative"
                onClick={handleImageClick}
            >
                {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </div>
                )}
                <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer">
                    {userProfileImage ? (
                        <Image
                            src={userProfileImage}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                            alt="Sample Image"
                        />
                    ) : (
                        <div className="w-[100px] h-[100px] rounded-full bg-[#C7C6CB] border-[1px] border-white flex items-center justify-center cursor-pointer">
                            <Image
                                src={mediaKitImage}
                                alt="Empty Image"
                                width={100}
                                height={100}
                            />
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                    disabled={variant !== "edit"}
                />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="font-semibold"> {userName} </div>
                <div className="flex gap-1 flex-col text-xs font-medium text-[#3D4966]">
                    <div className="text-center gap-2">
                        <div className="flex gap-1 items-center justify-center">
                            {userInterestCategories &&
                                userInterestCategories?.length > 0 &&
                                userInterestCategories?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1"
                                    >
                                        <span className="pr-4 pl-3 py-2 bg-white text-black rounded-2xl relative overflow-hidden shimmer-tag" style={{ borderColor: `hsl(${Math.random() * 360}, 100%, 80%)`, borderWidth: '1px', borderStyle: 'solid' }}>
                                            {CATEGORIES.find((category) => category.name === item)?.emoji}&nbsp;&nbsp;
                                            {item}
                                            <div className="shimmer-effect"></div>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {/* <div className="flex gap-1 items-center justify-center">
                        <MailIcon size={14} />
                        <div> dummy@gmail.com </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default MediaKitHeader