"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import GenderDistributionIcon from "../../../public/assets/GenderDistImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { updateMediaKit, addMediaKitAnalytics } from "api/services"
import { toast } from "react-toastify"

const GenderDistribution = ({ genderAnalytics, instaId, setUpdateMediaKit, mode = 'edit' }: { genderAnalytics: any, instaId?: string, setUpdateMediaKit?: (updateMediaKit: boolean) => void, mode: 'edit' | 'public' | 'preview' }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [genderDistributionData, setGenderDistributionData] = useState<any>(genderAnalytics || null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (genderAnalytics) {
            setGenderDistributionData(genderAnalytics)
        }
    }, [genderAnalytics])

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true)
        const file = e.target.files?.[0]
        if (file) {
            setUploadedImage(URL.createObjectURL(file))

            try {
                const formData = new FormData()
                formData.append('screenshot', file)
                formData.append('instaId', instaId || '')
                formData.append('type', 'gender')

                const response = await addMediaKitAnalytics(formData)
                console.log('Upload response:', response)

                if (response.success) {
                    setGenderDistributionData(response.data.genderAnalytics)
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

    const handleToggle = async () => {
        setUpdateMediaKit(true)
        const response = await updateMediaKit({
            instaId: instaId,
            updates: {
                genderAnalytics: {
                    genderData: genderDistributionData.genderData,
                    isActive: !genderDistributionData?.isActive,
                    uploadedAt: genderDistributionData.uploadedAt,
                }
            }
        })
        if (response.success) {
            toast.success('Gender Distribution updated successfully')
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
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1`}>
            <div className={`flex justify-between items-center ${mode === 'public' ? 'hidden' : ''}`}>
                <Image className={`w-5 h-5 ${genderAnalytics?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`} src={DragIcon} alt="Drag" />
                <div className="pointer-events-auto">
                    <Toggle checked={genderDistributionData?.isActive} onCheckedChange={handleToggle} />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <div className={`flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg ${genderDistributionData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                    <div className="text-[#FB7128] w-full px-2 py-1 flex gap-1">
                        <div className="text-xs font-semibold">Gender</div>
                        <div className="text-[10px]">Distribution</div>
                    </div>
                    <Image src={GenderDistributionIcon} alt="Gender Distribution" />
                </div>
                {
                    genderDistributionData?.genderData && (
                        <div className={`py-3 px-0.5 flex justify-between items-center gap-2 ${genderDistributionData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                            <div className="flex flex-col">
                                <div className="text-[#5E6C84] text-[10px] leading-none"> Male </div>
                                <div className="text-[#F25A99] text-sm font-bold leading-none"> {genderDistributionData.genderData.malePercentage}% </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(Math.floor(genderDistributionData.genderData.malePercentage / 3))].map((_, i) => (
                                    <div key={`male-${i}`} className="w-1 h-5 rounded-[30px]" style={{ background: '#F25A99' }}></div>
                                ))}
                                {[...Array(Math.floor(genderDistributionData.genderData.femalePercentage / 3))].map((_, i) => (
                                    <div key={`female-${i}`} className="w-1 h-5 rounded-[30px]" style={{ background: '#8153DF' }}></div>
                                ))}
                            </div>
                            <div className="flex flex-col ">
                                <div className="text-[#5E6C84] text-[10px] leading-none text-end"> Female </div>
                                <div className="text-[#8153DF] text-sm font-bold leading-none text-end"> {genderDistributionData.genderData.femalePercentage}% </div>
                            </div>
                        </div>
                    )
                }

                <div className={`p-2 flex justify-between items-center border rounded-[10px] ${mode === 'public' ? 'hidden' : ''}`}>
                    {
                        genderDistributionData?.genderData ? (
                            <div className="flex flex-col text-[10px]">
                                <div className="font-semibold">Uploaded on</div>
                                <div className="font-medium">{formatDate(genderDistributionData?.uploadedAt)}</div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-0.5 text-[10px]">
                                <div className="font-semibold">Upload Gender Distribution</div>
                                <div className="font-medium text-[#8B39FF] underline">How to upload?</div>
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
                                            {genderDistributionData?.genderData ? 'Re-upload' : 'Upload'}
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
            </div>
        </div>
    )
}

export default GenderDistribution