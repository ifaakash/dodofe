import NewButton from "@components/atoms/Button/NewButton";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import LineWithDot from 'public/assets/LineWithDot.svg'
import cx from 'classnames'
import { useRouter } from "next/navigation";
import axios from "axios";
import { loadState } from "@utils/localStorage";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import Screen from "../Screen";
import { linkMediaKit } from "api";
import { toast } from "react-hot-toast";
import { verifyMediaKit } from "api/services";
import { useEffect } from "react";

const keyFeatures = [
    {
        title: 'Ease to share',
    },
    {
        title: 'Automatic Social Media Integration',
    },
    {
        title: 'Dynamic Updates',
    },
    {
        title: 'Analytics and Insights',
    },
    {
        title: 'Collaboration Tools',
    }
]

const MediaKitReady = ({ instaIdInput, setInstaIdInput, mediakitRef }: { instaIdInput: string, setInstaIdInput: (instaIdInput: string) => void, mediakitRef: string }) => {
    const router = useRouter()
    const userId = loadState(STORAGE_CONSTANTS.userId)

    console.log('mediakitRef', mediakitRef)

    const formattedInstaUserName = '******' + mediakitRef.slice(-4)

    const handleNavigateToConsole = async () => {
        if (!userId) {
            router.push(ROUTE_CONSTANTS.LOGIN + '?mediakitRef=' + mediakitRef)
            return
        }

        if (!instaIdInput) {
            toast.error('Please enter your Instagram username')
            return
        }

        if(instaIdInput !== mediakitRef){
            toast.error('Invalid Instagram username')
            return
        }

        const isVerified = await verifyMediaKit(mediakitRef)
        if(!isVerified){
            toast.error('Invalid Instagram username')
            return
        }

        const response = await linkMediaKit({
            userId,
            instaId: instaIdInput
        })

        if (response.success) {
            toast.success('Media kit linked successfully')
            router.push(ROUTE_CONSTANTS.MEDIA_KIT_CONSOLE)
        } else {
            toast.error(response.message) // to be changed
        }
    }

    return (
        <div className="pt-20 px-5 pb-24 flex h-screen w-full items-center justify-center">
            <div className="flex flex-col gap-6 items-center">
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="text-2xl font-bold flex flex-col gap-1">
                        <span className="leading-none">
                            🎉Your media kit is{" "}
                        </span>
                        <span className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none">
                            Almost Ready!
                        </span>
                    </div>

                    <div className="text-xs px-2 max-w-sm">
                        One step away! Enter your Instagram username ending with{" "}
                        <span className="font-semibold">
                            {formattedInstaUserName}
                        </span>{" "}
                        to view your Media Kit.
                    </div>
                </div>

                <input
                    value={instaIdInput}
                    onChange={(e) => setInstaIdInput(e.target.value)}
                    type="text"
                    placeholder="Enter your user ID here"
                    className="w-full rounded-lg p-3 placeholder:text-sm placeholder:text-[#8994A9]"
                />

                <div className="flex flex-col gap-[10px]">
                    <div className="flex items-center gap-2">
                        <Image src={LineWithDot} alt="line-with-dot" />
                        <span className="font-semibold text-[#3D4966]">
                            key features
                        </span>
                        <Image
                            src={LineWithDot}
                            alt="line-with-dot"
                            className="rotate-180"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        {keyFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-xs text-[#3D4966]"
                            >
                                <CheckCheck size={16} />
                                {feature.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx("fixed bottom-0 py-4 w-[90%] bg-[#EAE9EC]")}>
                <NewButton
                    size="large"
                    variant="primary"
                    className="w-full"
                    onClick={handleNavigateToConsole}
                >
                    Get Now
                </NewButton>
            </div>
        </div>
    );
}

export default MediaKitReady;