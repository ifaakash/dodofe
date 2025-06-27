import { MailIcon } from "lucide-react"
import SampleImage from "/public/images/defaultMediaKitImg.jpg"
import Image from "next/image"
import { useEffect, useState } from "react";
import { cp } from "fs";

interface MediaKitHeaderInterface {
    data: any;
    variant: 'public' | 'edit';
}

const MediaKitHeader = ({ data, variant }: MediaKitHeaderInterface) => {
    const [userProfileImage, setUserProfileImage] = useState()
    const [userInterestCategories, setUserInterestCategories] = useState([])
    const [userName, setUserName] = useState()

    useEffect(() => {
        if (variant === 'edit') {
            setUserProfileImage(data?.dodoPages[0]?.profilePicture)
            setUserInterestCategories(data?.interestCategories)
            setUserName(data?.dodoPages[0]?.name)
            return
        }

        setUserProfileImage(data?.user?.profilePicture)
        setUserInterestCategories(data?.user?.intrestCategories)
        setUserName(data?.user?.name)
    }, [data])

    return (
        <div className="flex gap-3 flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                {
                    userProfileImage ? (
                        <Image src={userProfileImage} width={100} height={100} className="w-full h-full object-cover" alt="Sample Image" />
                    ) : (
                        <div className="w-[100px] h-[100px] rounded-full bg-[#C7C6CB] border-[1px] border-white flex items-center justify-center cursor-pointer">
                            <Image src={SampleImage} alt="Empty Image" width={100} height={100} />
                        </div>
                    )
                }
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