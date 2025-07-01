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
            <div className={`flex justify-end items-center ${mode === 'public' ? 'hidden' : ''}`}>
                {/* <Image className={`w-5 h-5 ${locationDistData?.isActive ? '' : ''}`} src={DragIcon} alt="Drag" /> */}
                <div className="pointer-events-auto">
                    <Toggle checked={locationDistData?.isActive} onCheckedChange={handleToggle} />
                </div>
            </div>

            <div className={`flex flex-col gap-1 ${locationDistData?.isActive ? '' : ''}`}>
                <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                    <div className="text-[#1167F1] w-full px-2 py-1 flex gap-1 text-xs">
                        <div className="font-semibold"> Location </div>
                        <div className=""> DISTRIBUTION </div>
                    </div>
                    <Image src={LocationDistributionIcon} alt="Gender Distribution" />
                </div>

                {
                    locationDistData?.locationData && <LocaltionDistributionChart locationDistributionData={locationDistData.locationData.locations} />
                }

                <div className={`p-2 flex justify-between items-center border rounded-[10px] ${mode === 'public' ? 'hidden' : ''}`}>
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
                </div>

                {
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
                }
            </div>
        </div>
    )
}

export default LocationDistribution