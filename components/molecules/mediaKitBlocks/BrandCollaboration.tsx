import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import BrandCollaborationIcon from "../../../public/assets/BrandCollabImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { Plus } from "lucide-react"


const BrandCollaboration = () => {
    return (
        <div className="p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <Image className="w-5 h-5" src={DragIcon} alt="Drag" />
            <Toggle checked={true} onCheckedChange={() => { }} />
        </div>

        <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
            <div className="text-[#9747FF] w-full px-2 py-1 flex gap-1">
                <div className="text-xs font-semibold"> Brand </div>
                <div className="text-[10px]"> COLLABORATION </div>
            </div>
            <Image src={BrandCollaborationIcon} alt="Gender Distribution" />
        </div>

        <div className="flex justify-center">
            <div className="px-2 py-1 flex gap-1 items-center border border-[#E2E4E9] rounded-full">
                <div className="text-[10px] font-semibold"> Add New </div>
                <Plus size={16} className="text-brandPrimary"/>
            </div>
        </div>
    </div>
    )
}

export default BrandCollaboration