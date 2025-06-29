import { MailIcon, Loader2 } from "lucide-react"
import SampleImage from "/public/images/defaultMediaKitImg.jpg"
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { updateMediaKit } from "api/services";
import { toast } from "react-toastify";

interface MediaKitHeaderInterface {
    data: any;
    variant: 'public' | 'edit';
}

const MediaKitHeader = ({ data, variant }: MediaKitHeaderInterface) => {
    const [userProfileImage, setUserProfileImage] = useState<string | undefined>()
    const [userInterestCategories, setUserInterestCategories] = useState([])
    const [userName, setUserName] = useState()
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // This is to be improved
    useEffect(() => {
        if (variant === 'edit') {
            setUserProfileImage(data?.mediaKit?.mediaKitProfileImage)
            setUserInterestCategories(data?.interestCategories)
            setUserName(data?.dodoPages[0]?.name)
            return
        }

        setUserProfileImage(data?.mediaKitProfileImage)
        setUserInterestCategories(data?.user?.interestCategories)
        setUserName(data?.user?.name)
    }, [data])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Check file size (10MB limit)
        const maxSize = 5 * 1024 * 1024 // 10MB in bytes
        if (file.size > maxSize) {
            toast.error("Image size should be less than 5MB")
            return
        }

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('mediaKitProfileImage', file)
            formData.append('instaId', data?.mediaKit?.instaId || '')
            console.log(formData, 'formData')

            const response = await updateMediaKit(formData)
            if (response.success) {
                setUserProfileImage(response.data.mediaKitProfileImage)
                toast.success('Profile image updated successfully')
            } else {
                toast.error('Failed to update profile image')
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Failed to update profile image')
        } finally {
            setIsUploading(false)
        }
    }

    const handleImageClick = () => {
        if (variant === 'edit') {
            fileInputRef.current?.click()
        }
    }

    return (
        <div className="flex gap-3 flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative" onClick={handleImageClick}>
                {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </div>
                )}
                {
                    userProfileImage ? (
                        <Image src={userProfileImage} width={100} height={100} className="w-full h-full object-cover" alt="Sample Image" />
                    ) : (
                        <div className="w-[100px] h-[100px] rounded-full bg-[#C7C6CB] border-[1px] border-white flex items-center justify-center cursor-pointer">
                            <Image src={SampleImage} alt="Empty Image" width={100} height={100} />
                        </div>
                    )
                }
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                    disabled={variant !== 'edit'}
                />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="font-semibold"> {userName} </div>
                <div className="flex gap-1 flex-col text-xs font-medium text-[#3D4966]">
                    <div className="text-center gap-2">
                        <div className="flex gap-1 items-center justify-center">
                            {userInterestCategories && userInterestCategories?.length > 0 &&
                                userInterestCategories?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-1" >
                                        <span>{item}</span>
                                        {index < userInterestCategories?.length - 1 && <span>•</span>}
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
    )
}

export default MediaKitHeader