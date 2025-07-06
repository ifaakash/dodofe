"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import Image from "next/image"
import BrandCollaborationIcon from "../../../public/assets/BrandCollabImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { ArrowUpRight, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import BrandModal from "@components/templates/mediaKit/BrandModal"
import Link from "next/link"
import { updateMediaKit } from "api/services"
import { toast } from "react-hot-toast"
import BrandCard from "./BrandCard"


const BrandCollaboration = ({ brandData, setUpdateMediaKit, instaId, mode = 'edit' }: { brandData: any, setUpdateMediaKit?: (updateMediaKit: boolean) => void, instaId: string, mode: 'edit' | 'public' | 'preview' }) => {
    const [isAddBrandModelOpen, setIsAddBrandModelOpen] = useState(false)
    const [allBrandData, setAllBrandData] = useState<any>(brandData)

    const handleToggle = async () => {
        setUpdateMediaKit(true)
        const response = await updateMediaKit({
            instaId: instaId,
            updates: {
                brandCollabs: {
                    brands: [...allBrandData.brands],
                    isActive: !brandData?.isActive,
                }
            }
        })
        if (response.success) {
            toast.success('Brand Collaboration updated successfully')
        }
    }

    useEffect(() => {
        setAllBrandData(brandData)
    }, [brandData])

    return (
        <>
            <div
                className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1`}
            >
                <div className="flex flex-col gap-2">
                    <div
                        className={`flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg`}
                    >
                        <Image
                            className="ml-1"
                            src={BrandCollaborationIcon}
                            alt="Gender Distribution"
                        />
                        <div className="text-[#9747FF] w-full px-2 py-1 flex gap-1 text-xs">
                            <div className="font-semibold"> Brand </div>
                            <div className=""> COLLABORATION </div>
                        </div>

                        <div
                            className={`flex justify-end items-center ${mode === "public" ? "hidden" : ""
                                }`}
                        >
                            {/* <Image className={`w-5 h-5 ${allBrandData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`} src={DragIcon} alt="Drag" /> */}
                            <div className="pointer-events-auto">
                                <Toggle
                                    checked={allBrandData?.isActive}
                                    onCheckedChange={handleToggle}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`flex gap-2 overflow-x-auto scrollbar-hide py-2 ${allBrandData?.isActive
                            ? "pointer-events-auto"
                            : "pointer-events-none"
                            }`}
                    >
                        {allBrandData?.brands?.map(
                            (brand: any, index: number) => (
                                <BrandCard
                                    key={index}
                                    brand={brand}
                                    mode={mode}
                                    instaId={instaId}
                                />
                            )
                        )}
                    </div>

                    <div
                        className={`flex justify-center ${mode === "public" ? "hidden" : ""
                            }`}
                    >
                        <div
                            className="px-2 py-1 flex gap-1 items-center border border-[#E2E4E9] rounded-full cursor-pointer"
                            onClick={() => setIsAddBrandModelOpen(true)}
                        >
                            <div className="text-[10px] font-semibold">
                                {" "}
                                Add New{" "}
                            </div>
                            <Plus size={16} className="text-brandPrimary" />
                        </div>
                    </div>
                </div>
            </div>
            {isAddBrandModelOpen && (
                <BrandModal
                    setIsAddBrandModelOpen={setIsAddBrandModelOpen}
                    setAllBrandData={setAllBrandData}
                    allBrandData={allBrandData}
                    variant="add"
                    instaId={instaId}
                />
            )}
        </>
    );
}

export default BrandCollaboration
