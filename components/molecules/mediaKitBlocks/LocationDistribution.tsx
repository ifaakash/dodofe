"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import LocationDistributionIcon from "../../../public/assets/LocationImg.svg"
import { useEffect, useState, useRef } from "react"
import LocaltionDistributionChart from "@components/atoms/Charts/LocaltionDistributionChart"
import { addMediaKitAnalytics, updateMediaKit } from "api/services"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { formatDate } from "@utils/helperFunctions"
import HowToUpload from "../mediakit/HowToUpload"
import Step1 from 'public/images/ExportStep1.png'
import Step2 from 'public/images/ExportStep2.png'
import LocationStep3 from 'public/images/LocationStep3.png'
import { useRouter } from "next/navigation"

const LocationDistribution = ({
    locationDistributionData,
    instaId,
    setUpdateMediaKit,
    mode = 'edit'
}: {
    locationDistributionData: any,
    instaId: string,
    setUpdateMediaKit?: (updateMediaKit: boolean) => void,
    mode: 'edit' | 'public' | 'preview'
}) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [locationDistData, setLocationDistData] = useState<any>(locationDistributionData || null)
    const [error, setError] = useState<string | null>(null)
    const [openHowToUpload, setOpenHowToUpload] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (locationDistributionData) {
            setLocationDistData(locationDistributionData)
        }
    }, [locationDistributionData])

    const handleFileSelect = () => {
        fileInputRef.current?.click()
    }

    const handleToggle = async () => {
        setUpdateMediaKit(true)
        const response = await updateMediaKit({
            instaId: instaId,
            updates: {
                locationAnalytics: {
                    isActive: !locationDistData?.isActive,
                    locationData: locationDistData.locationData,
                    uploadedAt: locationDistData.uploadedAt,
                }
            }
        })
        if (response.success) {
            setLocationDistData(response.data.locationAnalytics)
            toast.success('Location Distribution updated successfully')
        }
    }

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true)
        setError(null)
        const file = e.target.files?.[0]
        if (file) {
            setUploadedImage(URL.createObjectURL(file))

            try {
                const formData = new FormData()
                formData.append('screenshot', file)
                formData.append('instaId', instaId || '')
                formData.append('type', 'location')

                const response = await addMediaKitAnalytics(formData)

                if (response.success) {
                    setLocationDistData(response.data.locationAnalytics)
                    toast.success('Location distribution data updated successfully')
                    setUpdateMediaKit(true)
                } else {
                    setError(response.responseData.error)
                }
            } catch (error) {
                console.error('Upload error:', error)
                setError(error.message)
                toast.error('Upload failed')
            } finally {
                setIsUploading(false)
            }
        }
    }

    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1`}>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleUploadImage}
                className="hidden"
            />

            <div className={`flex flex-col gap-1 ${locationDistData?.isActive ? '' : ''}`}>
                <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                    <Image className="ml-1" src={LocationDistributionIcon} alt="Location Distribution" />
                    <div className="text-[#1167F1] w-full px-2 py-1 flex gap-1 text-xs">
                        <div className="font-semibold"> Location </div>
                        <div className=""> DISTRIBUTION </div>
                    </div>
                    <div className={`flex justify-end items-center ${mode === 'public' ? 'hidden' : ''}`}>
                        <div className="pointer-events-auto">
                            <Toggle checked={locationDistData?.isActive} onCheckedChange={handleToggle} />
                        </div>
                    </div>
                </div>

                {locationDistData?.locationData ? (
                    <>
                        <LocaltionDistributionChart locationDistributionData={locationDistData.locationData.locations} />
                        {mode !== 'public' && (
                            <div className="p-2 flex justify-between items-center border rounded-[10px]">
                                <div className="flex flex-col text-[10px]">
                                    <div className="font-semibold">Uploaded on</div>
                                    <div className="font-medium">{formatDate(locationDistData?.uploadedAt)}</div>
                                </div>
                                <button
                                    onClick={handleFileSelect}
                                    className="border-[1px] border-[#EAE9EC] flex items-center gap-2 px-[10px] py-1 rounded-full text-[10px] font-medium"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Re-upload</span>
                                            <Image src={UploadIcon} alt="Upload" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 px-4">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 text-gray-400">
                            <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24 16V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24 32H24.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 mb-1">No Location Distribution Data</p>
                            <p className="text-xs text-gray-500 mb-2">Upload your location distribution screenshot from your instagram professional dashboard</p>
                            {mode !== 'public' && (
                                <>
                                    <div className="font-medium text-[10px] text-[#8B39FF] underline mb-4 cursor-pointer" onClick={() => setOpenHowToUpload(true)}>
                                        How to upload?
                                    </div>
                                    <div className="shimmer-container relative overflow-hidden inline-block">
                                        <button
                                            className="text-xs font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
                                            onClick={handleFileSelect}
                                            disabled={isUploading}
                                        >
                                            {isUploading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Uploading...</span>
                                                </div>
                                            ) : (
                                                <span>Upload Location Data</span>
                                            )}
                                        </button>
                                        <div className="shimmer-effect"></div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="text-[10px] text-[#FF0000] bg-[#ffcece] p-2 mt-1 rounded-lg font-medium">
                    {error}
                </div>
            )}

            {openHowToUpload && (
                <HowToUpload
                    title={'Location?'}
                    step1={Step1 as any}
                    step2={Step2 as any}
                    step3={LocationStep3 as any}
                    isOpen={openHowToUpload}
                    onClose={() => setOpenHowToUpload(false)}
                />
            )}
        </div>
    )
}

export default LocationDistribution