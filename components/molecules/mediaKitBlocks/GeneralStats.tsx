"use client"
import BlobChart from "@components/atoms/Charts/BlobChart"
import UploadIcon from "/public/icons/upload2.svg"
import Image from "next/image"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const statsData = [
    {
        value: "120",
        label: "Media Count",
        gradient: "from-[#EBF6F2]"
    },
    {
        value: "24%",
        label: "Engagement",
        gradient: "from-[#FEF2EA]"
    },
    {
        value: "20M",
        label: "Avg. Like",
        gradient: "from-[#F0ECFB]"
    },
    {
        value: "150K",
        label: "Avg. Comments",
        gradient: "from-[#E3ECFF]"
    }
]

const data2 = {
    "reels": 45,
    "posts": 45,
    "stories": 10
}

const GeneralStats = ({ mode }: { mode: 'edit' | 'public' | 'preview' }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('ss', e.target.files)
        setIsUploading(true)
        const file = e.target.files?.[0]
        if (file) {
            setUploadedImage(URL.createObjectURL(file))
        }

        // backend call here
        setTimeout(() => {
            setIsUploading(false)
        }, 2000)
    }

    return (
        <div className="p-3 bg-[#FDFBFF] rounded-[14px] flex flex-col gap-3">
            {/* <BlobChart data={data2}/> */}
            {
                mode === 'edit' && (
                    <div className="p-2 flex justify-between items-center border rounded-[10px]">
                        <div className="flex flex-col gap-0.5 text-[10px]">
                            <div className="font-semibold">Upload Content Type</div>
                            <div className="font-medium text-[#8B39FF] underline">How to upload?</div>
                        </div>
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
                                                {uploadedImage ? 'Re-upload' : 'Upload'}
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
                )
            }

            <div className="grid grid-cols-2 gap-1">
                {statsData.map((stat, index) => (
                    <div key={index} className={`w-full px-4 py-2 bg-gradient-to-r ${stat.gradient} to-[#FDFBFF] rounded-[10px]`}>
                        <div className="text-[#3D4966] font-bold">{stat.value}</div>
                        <div className="text-[#3D4966] font-medium text-[10px]">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GeneralStats