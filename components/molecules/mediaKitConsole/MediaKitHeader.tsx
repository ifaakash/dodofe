import { MailIcon } from "lucide-react"
import Rajveer from "/public/assets/rajveer.png"
import Image from "next/image"


const MediaKitHeader = ({ data }: any) => {

    return (
        <div className="flex gap-3 flex-col items-center">
            <Image src={Rajveer} className="w-[100px] h-[100px] rounded-full" alt="Rajveer" />
            <div className="flex flex-col gap-2 items-center">
                <div className="font-semibold"> {data?.name} </div>
                <div className="flex gap-1 flex-col text-xs font-medium text-[#3D4966]">
                    <div className="text-center gap-2">
                        <div className="flex gap-2 items-center justify-center">
                            {data?.interestCategories
                                .map((item, index) => (
                                    <>
                                        {index > 0 && <span>•</span>}
                                        <span>{item}</span>
                                    </>
                                ))}
                        </div>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                        <MailIcon size={14} />
                        <div> dummy@gmail.com </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaKitHeader