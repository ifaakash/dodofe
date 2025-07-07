"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import LocationDistributionIcon from "../../../public/assets/LocationImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { useEffect, useState } from "react"
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
    const router = useRouter()

    useEffect(() => {
        if (locationDistributionData) {
            setLocationDistData(locationDistributionData)
        }
    }, [locationDistributionData])

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
                } else {
                    console.log('Upload failed', response.responseData)
                }
            } catch (error) {
                console.error('Something went wrong', error)
                setError(error.message)
            } finally {
                setIsUploading(false)
            }
        }
    }


    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1`}>


            <div className={`flex flex-col gap-1 ${locationDistData?.isActive ? '' : ''}`}>
                <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                    <Image className="ml-1" src={LocationDistributionIcon} alt="Gender Distribution" />
                    <div className="text-[#1167F1] w-full px-2 py-1 flex gap-1 text-xs">
                        <div className="font-semibold"> Location </div>
                        <div className=""> DISTRIBUTION </div>
                    </div>
                    <div className={`flex justify-end items-center ${mode === 'public' ? 'hidden' : ''}`}>
                        {/* <Image className={`w-5 h-5 ${locationDistData?.isActive ? '' : ''}`} src={DragIcon} alt="Drag" /> */}
                        <div className="pointer-events-auto">
                            <Toggle checked={locationDistData?.isActive} onCheckedChange={handleToggle} />
                        </div>
                    </div>
                </div>

                {
                    locationDistData?.locationData ? <LocaltionDistributionChart locationDistributionData={locationDistData.locationData.locations} /> :
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 text-gray-400">
                                <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24 16V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24 32H24.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700 mb-1">No Location Distribution Data</p>
                                <p className="text-xs text-gray-500">Upload your location distribution screenshot from your instagram professional dashboard</p>
                                <div className="shimmer-container relative overflow-hidden mt-4 inline-block">
                                    <button
                                        className="text-xs font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                                        onClick={() => { router.push('/media-kit/console/complete') }}
                                    >
                                        Update Age Data
                                    </button>
                                    <div className="shimmer-effect"></div>
                                </div>
                            </div>
                        </div>}

                {/* <div className={`p-2 flex justify-between items-center border rounded-[10px] ${mode === 'public' ? 'hidden' : ''}`}>
                    {
                        locationDistData?.locationData ? (
                            <div className="flex flex-col text-[10px]">
                                <div className="font-semibold">Uploaded on</div>
                                <div className="font-medium">{formatDate(locationDistData?.uploadedAt)}</div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-0.5 text-[10px]">
                                <div className="font-semibold">Upload Location Distribution</div>
                                <div className="font-medium text-[#8B39FF] underline cursor-pointer" onClick={() => setOpenHowToUpload(true)}>How to upload?</div>
                            </div>
                        )
                    }


                    <label className={`border-[1px] border-[#EAE9EC] flex gap-0.5 px-[10px] py-1 rounded-full cursor-pointer ${mode === 'public' ? 'hidden' : ''}`}>
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
                                            {locationDistData?.locationData ? 'Re-upload' : 'Upload'}
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
                </div> */}

                {/* {
                    error && (
                        <div className="text-[10px] text-[#FF0000] bg-[#ffcece] p-2 mt-1 rounded-lg font-medium">
                            {error}
                        </div>
                    )
                }

                {
                    openHowToUpload && (
                        <HowToUpload title={'Location?'} step1={Step1 as any} step2={Step2 as any} step3={LocationStep3 as any} isOpen={openHowToUpload} onClose={() => setOpenHowToUpload(false)} />
                    )
                } */}
            </div>
        </div>
    )
}

export default LocationDistribution