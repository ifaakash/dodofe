import NewButton from "@components/atoms/Button/NewButton";
import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LineWithDot from 'public/assets/LineWithDot.svg'
import confetti from 'canvas-confetti'
import MediaKitOnboarding from 'public/assets/MediaKitWaiting.png'
import cx from 'classnames'
import { useEffect, useState } from "react";
import { getMediaKitByInstaId, joinMediaKitWaitlist } from "api/services";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import toast from "react-hot-toast";

const MediaKitComingSoon = () => {
    const router = useRouter();
    const [instaId, setInstaId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    const handleJoinWaitlist = async () => {
        if (!instaId.trim()) {
            setError("Please enter your Instagram ID");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // You'll need to get the actual userId from your auth context or localStorage
            const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";

            await joinMediaKitWaitlist({
                instaId: instaId.trim(),
                userId: userId
            });

            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.7
                }
            });

            router.push('/media-kit/waitlist');
        } catch (error) {
            console.error('Error joining waitlist:', error);

            toast.error(error.message || "Failed to join waitlist. Please try again.");
            setError("Failed to join waitlist. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='pt-20 px-5 pb-24 flex justify-center'>
            <div className='flex flex-col gap-20 items-center'>
                <div className='relative flex items-center justify-center flex-col'>
                    <Image src={MediaKitOnboarding} className='w-[350px]' alt='media-kit' />
                    <div className='flex flex-col items-center text-center gap-2 absolute -bottom-12'>
                        <div className='text-2xl font-bold flex flex-col gap-1'>
                            <span className='leading-none'>Dodo Media Kit is</span>
                            <span className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none" >
                                Coming Soon!
                            </span>

                        </div>


                        <div className='text-xs px-2 max-w-sm'>
                            A powerful way for creators to showcase their stats, audience insights, and brand collaborations—all in one place.
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-[10px]'>
                    <div className='flex items-center gap-2'>
                        <Image src={LineWithDot} alt='line-with-dot' />
                        <span className='font-semibold text-[#3D4966]'>
                            What's Coming?
                        </span>
                        <Image src={LineWithDot} alt='line-with-dot' className='rotate-180' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2 text-xs text-[#3D4966]'>
                            <CheckCheck size={16} />
                            Auto-Generated Media Kits
                        </div>

                        <div className='flex items-center gap-2 text-xs text-[#3D4966]'>
                            <CheckCheck size={16} />
                            Real-Time Analytics
                        </div>

                        <div className='flex items-center gap-2 text-xs text-[#3D4966]'>
                            <CheckCheck size={16} />
                            Professional & Customizable
                        </div>
                    </div>
                </div>

                {/* Instagram ID Input */}
                <div className='flex flex-col gap-3 w-full max-w-sm'>
                    <div className='text-center'>
                        <label htmlFor="instaId" className='text-sm font-medium text-[#3D4966]'>
                            Enter your Instagram ID
                        </label>
                    </div>
                    <input
                        id="instaId"
                        type="text"
                        value={instaId}
                        onChange={(e) => {
                            setInstaId(e.target.value);
                            setError(""); // Clear error when user types
                        }}
                        placeholder="e.g., your_username"
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6228D7] focus:border-transparent text-sm'
                        disabled={isLoading}
                    />

                    {error && (
                        <div className='text-red-500 text-xs text-center'>
                            {error}
                        </div>
                    )}
                </div>
            </div>

            <div className={cx("fixed bottom-0 py-4 w-[90%] bg-[#EAE9EC]")}>
                <NewButton
                    size="large"
                    variant={isLoading || !instaId ? "disabled" : "primary"}
                    className="w-full"
                    onClick={handleJoinWaitlist}
                >
                    {isLoading ? "Joining..." : "Join the Waitlist"}
                </NewButton>
            </div>
        </div>
    )
}

export default MediaKitComingSoon;