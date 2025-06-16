import NewButton from "@components/atoms/Button/NewButton";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import LineWithDot from 'public/assets/LineWithDot.svg'
import cx from 'classnames'
import { useRouter } from "next/navigation";

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

const MediaKitReady = ({ instaIdInput, setInstaIdInput }: { instaIdInput: string, setInstaIdInput: (instaIdInput: string) => void }) => {
    const router = useRouter()
    const instaUserName = '_keshav_malik'

    const formattedInstaUserName = '******' + instaUserName.slice(-4)

    const handleNavigateToConsole = () => {
        router.push(`/media-kit/console`)
        console.log(instaIdInput)
    }

    return (
        <div className='pt-20 px-5 pb-24 flex h-screen w-full items-center justify-center'>
            <div className='flex flex-col gap-6 items-center'>
                <div className='flex flex-col items-center text-center gap-2'>
                    <div className='text-2xl font-bold flex flex-col gap-1'>
                        <span className='leading-none'>🎉Your media kit is </span>
                        <span className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none" >
                            Ready!
                        </span>
                    </div>


                    <div className='text-xs px-2 max-w-sm'>
                        One step away! Enter your Instagram username ending with <span className='font-semibold'>{formattedInstaUserName}</span> to view your Media Kit.
                    </div>
                </div>

                <input value={instaIdInput} onChange={(e) => setInstaIdInput(e.target.value)} type="text" placeholder="Enter your user ID here" className='w-full rounded-lg p-3 placeholder:text-sm placeholder:text-[#8994A9]' />

                <div className='flex flex-col gap-[10px]'>
                    <div className='flex items-center gap-2'>
                        <Image src={LineWithDot} alt='line-with-dot' />
                        <span className='font-semibold text-[#3D4966]'>
                            key features
                        </span>
                        <Image src={LineWithDot} alt='line-with-dot' className='rotate-180' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        {
                            keyFeatures.map((feature, index) => (
                                <div key={index} className='flex items-center gap-2 text-xs text-[#3D4966]'>
                                    <CheckCheck size={16} />
                                    {feature.title}
                                </div>
                            ))
                        }
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
    )
}

export default MediaKitReady;