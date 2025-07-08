import InstagramIcon from "public/icons/insta.svg"
import Image from "next/image"

const FollowerCount = ({ followerCount }: { followerCount: number }) => {
    return (
        <div className="flex gap-3 md:gap-4 items-center bg-[#FDFBFF] w-full p-4 md:p-5 rounded-xl h-full">
            <div className="p-2 md:p-3 bg-[#F5F4F6] rounded-[10px] transition-all duration-300 hover:bg-[#EEEDEF]">
                <Image className="w-5 h-5 md:w-6 md:h-6" src={InstagramIcon} alt="Instagram" />
            </div>

            <div className="flex flex-col">
                <div className="text-[#5E6C84] text-xs md:text-sm font-medium">Instagram followers</div>
                <div className="font-black text-lg md:text-2xl text-[#3D4966]">{followerCount}</div>
            </div>
        </div>
    )
}

export default FollowerCount