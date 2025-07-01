"use client"
import BlobChart from "@components/atoms/Charts/BlobChart"
import UploadIcon from "/public/icons/upload2.svg"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { addMediaKitAnalytics } from "api"
import Step1 from 'public/images/ExportStep1.png'
import Step2 from 'public/images/ExportStep2.png'
import Step3 from 'public/images/ExportStep3.png'
import HowToUpload from "../mediakit/HowToUpload"

const GeneralStats = ({ mode, instaId, contentAnalytics, avgLike, avgComments, mediaCount, engagement }: { mode: 'edit' | 'public' | 'preview', instaId: string, contentAnalytics: any, avgLike: any, avgComments: any, mediaCount: any, engagement: any }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [generalStats, setGeneralStats] = useState<any>(null)
    const [openHowToUpload, setOpenHowToUpload] = useState(false)
    const statsData = [
        {
            value: mediaCount,
            label: "Media Count",
            gradient: "from-[#EBF6F2]"
        },
        {
            value: `${engagement?.toFixed(2) || 0}%`,
            label: "Engagement",
            gradient: "from-[#FEF2EA]"
        },
        {
            value: avgLike,
            label: "Avg. Like",
            gradient: "from-[#F0ECFB]"
        },
        {
            value: avgComments,
            label: "Avg. Comments",
            gradient: "from-[#E3ECFF]"
        }
    ]

    useEffect(() => {
        if (contentAnalytics) {
            setGeneralStats(contentAnalytics)
        }
    }, [contentAnalytics])

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true)
        const file = e.target.files?.[0]
        if (file) {
            setUploadedImage(URL.createObjectURL(file))

            try {
                const formData = new FormData()
                formData.append('screenshot', file)
                formData.append('instaId', instaId || '')
                formData.append('type', 'content')

                const response = await addMediaKitAnalytics(formData)
                console.log('Upload response:', response)

                if (response.success) {
                    setGeneralStats(response.data.contentAnalytics)
                } else {
                    console.log('Upload failed', response.responseData.error)
                }
            } catch (error) {
                console.log('Something went wrong', error)
                setError(error.responseData.message)
                toast.error('Upload failed')
            } finally {
                setIsUploading(false)
            }
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };


    return (
        <div className="p-3 bg-[#FDFBFF] rounded-[14px] flex flex-col gap-3">
            {
                generalStats?.contentData && (
                    <BlobChart contentAnalytics={generalStats?.contentData} />
                )
            }
            {
                mode === 'edit' && (
                    <div className="p-2 flex justify-between items-center border rounded-[10px]">
                        {
                            generalStats?.contentData ? (
                                <div className="flex flex-col text-[10px]">
                                    <div className="font-semibold">Uploaded on</div>
                                    <div className="font-medium">{formatDate(generalStats?.uploadedAt)}</div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-0.5 text-[10px]">
                                    <div className="font-semibold">Upload Content Type</div>
                                    <div className="font-medium text-[#8B39FF] underline cursor-pointer" onClick={() => setOpenHowToUpload(true)}>How to upload?</div>
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
                        <div className="text-[#3D4966] font-black text-lg">{stat.value}</div>
                        <div className="text-[#3D4966] font-medium text-xs">{stat.label}</div>
                    </div>
                ))}
            </div>

            {
                openHowToUpload && (
                    <HowToUpload title={'Content Type?'} step1={Step1 as any} step2={Step2 as any} step3={Step3 as any} isOpen={openHowToUpload} onClose={() => setOpenHowToUpload(false)} />
                )
            }
        </div>
    )
}

export default GeneralStats