"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import GenderDistributionIcon from "../../../public/assets/GenderDistImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { useState } from "react"
import { Loader2 } from "lucide-react"

const mockData = {
    male: 20,
    female: 80
}

const GenderDistribution = ({ setBlocksToShow, blocksToShow }: { setBlocksToShow: (blocksToShow: any) => void, blocksToShow: any }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [genderDistributionData, setGenderDistributionData] = useState(false)

    const handleToggle = () => {
        setBlocksToShow(prev => ({
            ...prev,
            genderDistribution: !prev.genderDistribution
        }))
    }

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true)
        const file = e.target.files?.[0]
        if (file) {
            setUploadedImage(URL.createObjectURL(file))
            setGenderDistributionData(true)

            console.log({
                file,
                uploadedImage
            })
        }
        setTimeout(() => {
            setIsUploading(false)
        }, 2000)
    }



    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl ${!blocksToShow.genderDistribution ? 'opacity-50 pointer-events-none' : ''}`}>

            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center pointer-events-auto">
                    <Image className="w-5 h-5" src={DragIcon} alt="Drag" />
                    <div className="pointer-events-auto">
                        <Toggle checked={blocksToShow.genderDistribution} onCheckedChange={handleToggle} />
                    </div>
                </div>

                <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                    <div className="text-[#FB7128] w-full px-2 py-1 flex gap-1">
                        <div className="text-xs font-semibold">Gender</div>
                        <div className="text-[10px]">Distribution</div>
                    </div>
                    <Image src={GenderDistributionIcon} alt="Gender Distribution" />
                </div>
                {
                    genderDistributionData && (
                        <div className="py-3 px-0.5 flex justify-between items-center gap-2">
                            <div className="flex flex-col">
                                <div className="text-[#5E6C84] text-[10px] leading-none"> Male </div>
                                <div className="text-[#F25A99] text-sm font-bold leading-none"> {mockData.male}% </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(Math.floor(mockData.male / 3))].map((_, i) => (
                                    <div key={`male-${i}`} className="w-1 h-5 rounded-[30px]" style={{ background: '#F25A99' }}></div>
                                ))}
                                {[...Array(Math.floor(mockData.female / 3))].map((_, i) => (
                                    <div key={`female-${i}`} className="w-1 h-5 rounded-[30px]" style={{ background: '#8153DF' }}></div>
                                ))}
                            </div>
                            <div className="flex flex-col ">
                                <div className="text-[#5E6C84] text-[10px] leading-none text-end"> Female </div>
                                <div className="text-[#8153DF] text-sm font-bold leading-none text-end"> {mockData.female}% </div>
                            </div>
                        </div>
                    )
                }

                <div className="p-2 flex justify-between items-center border rounded-[10px]">
                    {
                        genderDistributionData ? (
                            <div className="flex flex-col text-[10px]">
                                <div className="font-semibold">Uploaded on</div>
                                <div className="font-medium">12 may 2025</div>
                            </div>
                        ) : (
                            <div className="flex flex-col text-[10px]">
                                <div className="font-semibold">Upload Gender Distribution</div>
                                <div className="font-medium text-[#8B39FF] underline">How to upload?</div>
                            </div>
                        )
                    }


                    <label className="border-[1px] border-[#EAE9EC] flex gap-0.5 px-[10px] py-1 rounded-full cursor-pointer">
                        <div className="text-[10px] font-medium">
                            {
                                isUploading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <div>Uploading...</div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <div>
                                            {genderDistributionData ? 'Re-upload' : 'Upload'}
                                        </div>
                                        <Image src={UploadIcon} alt="Upload" />
                                    </div>
                                )
                            }
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadImage}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

        </div>
    )
}

export default GenderDistribution