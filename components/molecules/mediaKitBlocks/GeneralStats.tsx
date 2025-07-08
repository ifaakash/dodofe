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
        <div className="p-3 md:p-5 bg-[#FDFBFF] rounded-[14px] flex flex-col gap-3 md:gap-5 h-full">
            {
                generalStats?.contentData && (
                    <div className="w-full md:max-w-[80%] mx-auto">
                        <BlobChart contentAnalytics={generalStats?.contentData} />
                    </div>
                )
            }

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {statsData.map((stat, index) => (
                    <div key={index} className={`w-full px-4 py-3 md:py-4 bg-gradient-to-r ${stat.gradient} to-[#FDFBFF] rounded-[10px] transition-all duration-300 hover:shadow-sm`}>
                        <div className="text-[#3D4966] font-black text-lg md:text-xl">{stat.value}</div>
                        <div className="text-[#3D4966] font-medium text-xs md:text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>
            {/* 
            {
                openHowToUpload && (
                    <HowToUpload title={'Content Type?'} step1={Step1 as any} step2={Step2 as any} step3={Step3 as any} isOpen={openHowToUpload} onClose={() => setOpenHowToUpload(false)} />
                )
            } */}
        </div>
    )
}

export default GeneralStats