"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import BrandCollaborationIcon from "../../../public/assets/BrandCollabImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { ArrowUpRight, Plus } from "lucide-react"
import { useState } from "react"
import AddBrandModal from "@components/templates/mediaKit/AddBrandModal"
import RajveerIcon from "../../../public/assets/rajveer.png"
import Link from "next/link"
import { updateMediaKit } from "api/services"


const BrandCollaboration = ({ brandData, setUpdateMediaKit, instaId }: { brandData: any, setUpdateMediaKit: (updateMediaKit: boolean) => void, instaId: string }) => {
    const [isAddBrandModelOpen, setIsAddBrandModelOpen] = useState(false)

    const handleToggle = async () => {
        setUpdateMediaKit(true)
        const response = await updateMediaKit({
            instaId: instaId,
            updates: {
                brandCollabs: {
                    isActive: !brandData?.isActive,
                }
            }
        })
        console.log('response', response)
    }

    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1 ${brandData?.isActive ? 'opacity-100' : 'opacity-40'}`}>
            <div className="flex justify-between items-center">
                <Image className={`w-5 h-5 ${brandData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`} src={DragIcon} alt="Drag" />
                <div className="pointer-events-auto">
                    <Toggle checked={brandData?.isActive} onCheckedChange={handleToggle} />
                </div>
            </div>

            <div className={`flex flex-col gap-2 ${brandData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                    <div className="text-[#9747FF] w-full px-2 py-1 flex gap-1">
                        <div className="text-xs font-semibold"> Brand </div>
                        <div className="text-[10px]"> COLLABORATION </div>
                    </div>
                    <Image src={BrandCollaborationIcon} alt="Gender Distribution" />
                </div>

                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {
                        Array.isArray(brandData) && brandData?.map((brand, index) => (
                            <BrandCard key={index} brand={brand} />
                        ))
                    }
                </div>

                <div className="flex justify-center">
                    <div className="px-2 py-1 flex gap-1 items-center border border-[#E2E4E9] rounded-full">
                        <div className="text-[10px] font-semibold" onClick={() => setIsAddBrandModelOpen(true)}> Add New </div>
                        <Plus size={16} className="text-brandPrimary" />
                    </div>
                </div>

            </div>
            {
                isAddBrandModelOpen && <AddBrandModal setIsAddBrandModelOpen={setIsAddBrandModelOpen} />
            }
        </div>
    )
}

export default BrandCollaboration


const BrandCard = ({ brand }: { brand: any }) => {
    return (
        <div className="bg-[#F5F4F6] rounded-xl p-2 flex flex-col gap-2 min-w-48 flex-shrink-0">
            <Link href={brand.contentUrl} target="_blank" className="flex items-center justify-between gap-2">
                <Image src={brand.brandLogo} width={40} height={40} alt="Edit" />
                <ArrowUpRight className="text-brandPrimary" />
            </Link>
            <div>
                <div className="text-sm font-semibold">{brand.brandName}</div>
            </div>
            <div className=" border-[1px] border-dashed border-[#E2E4E9]"> </div>
            <div className="text-[10px]">
                <div className="flex justify-between items-center">
                    <div className="text-[#3D4966]"> Type: </div>
                    <div className="flex gap-1">
                        {
                            brand.contentType.split(',').map((type: string, index: number) => (
                                <div key={index} className="text-[#3D4966] font-semibold">
                                    {type.trim()}{index < brand.contentType.split(',').length - 1 ? ',' : ''}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[#3D4966]"> Reach: </div>
                    <div className="text-[#3D4966] font-semibold"> {brand.reach ? brand.reach + 'K' : 'N/A'} </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[#3D4966]"> Engagement: </div>
                    <div className="text-[#3D4966] font-semibold"> {brand.engagement ? brand.engagement + '%' : 'N/A'} </div>
                </div>
            </div>
        </div>
    )
}