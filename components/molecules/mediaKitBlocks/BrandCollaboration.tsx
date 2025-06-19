"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import BrandCollaborationIcon from "../../../public/assets/BrandCollabImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { Plus } from "lucide-react"
import { useState } from "react"
import AddBrandModal from "@components/templates/mediaKit/AddBrandModal"

const brandCollaborationData = false


const BrandCollaboration = ({ setBlocksToShow, blocksToShow }: { setBlocksToShow: (blocksToShow: any) => void, blocksToShow: any }) => {
    const [isAddBrandModelOpen, setIsAddBrandModelOpen] = useState(false)
    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-2 ${!blocksToShow.brandCollaboration ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center">
            <Image className="w-5 h-5" src={DragIcon} alt="Drag" />
            <div className="pointer-events-auto">
                <Toggle checked={blocksToShow.brandCollaboration} onCheckedChange={() => setBlocksToShow({
                    ...blocksToShow,
                    brandCollaboration: !blocksToShow.brandCollaboration
                })} />
            </div>
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
                <div className="text-[10px] font-semibold" onClick={() => setIsAddBrandModelOpen(true)}> Add New </div>
                <Plus size={16} className="text-brandPrimary"/>
            </div>
        </div>

        {
            isAddBrandModelOpen && <AddBrandModal setIsAddBrandModelOpen={setIsAddBrandModelOpen} />
        }
    </div>
    )
}

export default BrandCollaboration