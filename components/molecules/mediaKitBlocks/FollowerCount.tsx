import InstagramIcon from "public/icons/insta.svg"
import Image from "next/image"

const FollowerCount = ({ followerCount }: { followerCount: number }) => {
    return (
        <div className="flex gap-2 items-center bg-[#FDFBFF] w-full p-[10px] rounded-xl">
            <div className="p-2 bg-[#F5F4F6] rounded-[10px]">
                <Image className="w-5 h-5" src={InstagramIcon} alt="Instagram" />
            </div>


            <div className="flex flex-col">
                <div className="text-[#5E6C84] text-xs font-medium">Instagram followers</div>
                <div className="font-extrabold text-[#3D4966]">{followerCount}</div>
            </div>
        </div>
    )
}

export default FollowerCount