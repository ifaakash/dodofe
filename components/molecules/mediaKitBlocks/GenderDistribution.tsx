"use client"
import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import GenderDistributionIcon from "../../../public/assets/GenderDistImg.svg"
import { useEffect, useState, useRef } from "react"
import { Loader2 } from "lucide-react"
import { updateMediaKit, addMediaKitAnalytics } from "api/services"
import { toast } from "react-hot-toast"
import HowToUpload from "../mediakit/HowToUpload"
import Step1 from 'public/images/ExportStep1.png'
import Step2 from 'public/images/ExportStep2.png'
import GenderStep3 from 'public/images/GenderStep3.png'
import { useRouter } from "next/navigation"

const GenderDistribution = ({ genderAnalytics, instaId, setUpdateMediaKit, mode = 'edit' }: { genderAnalytics: any, instaId?: string, setUpdateMediaKit?: (updateMediaKit: boolean) => void, mode: 'edit' | 'public' | 'preview' }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [genderDistributionData, setGenderDistributionData] = useState<any>(genderAnalytics || null)
    const [error, setError] = useState<string | null>(null)
    const [openHowToUpload, setOpenHowToUpload] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();

    useEffect(() => {
        if (genderAnalytics) {
            setGenderDistributionData(genderAnalytics)
        }
    }, [genderAnalytics])

    const handleFileSelect = () => {
        fileInputRef.current?.click()
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
                formData.append('type', 'gender')

                const response = await addMediaKitAnalytics(formData)

                if (response.success) {
                    setGenderDistributionData(response.data.genderAnalytics)
                    toast.success('Gender distribution data updated successfully')
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
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleUploadImage}
                className="hidden"
            />

            <div className="flex flex-col gap-1">
                <div className={`flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg ${genderDistributionData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                    <Image className="ml-1" src={GenderDistributionIcon} alt="Gender Distribution" />
                    <div className="text-[#FB7128] w-full px-2 py-1 flex gap-1 text-xs">
                        <div className="font-semibold">Gender</div>
                        <div className="uppercase">Distribution</div>
                    </div>
                    <div className={`flex justify-end items-center ${mode === 'public' ? 'hidden' : ''}`}>
                        <div className="pointer-events-auto">
                            <Toggle checked={genderDistributionData?.isActive} onCheckedChange={handleToggle} />
                        </div>
                    </div>
                </div>

                {genderDistributionData?.genderData ? (
                    <>
                        <div className={`py-3 px-0.5 flex justify-between items-center gap-2 ${genderDistributionData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                            <div className="flex flex-col">
                                <div className="text-[#5E6C84] text-[10px] leading-none"> Male </div>
                                <div className="text-[#F25A99] text-sm font-bold leading-none"> {genderDistributionData.genderData.malePercentage}% </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(Math.floor(genderDistributionData.genderData.malePercentage / 4))].map((_, i) => (
                                    <div key={`male-${i}`} className="w-[5px] h-5 rounded-[30px]" style={{ background: '#F25A99' }}></div>
                                ))}
                                {[...Array(Math.floor(genderDistributionData.genderData.femalePercentage / 4))].map((_, i) => (
                                    <div key={`female-${i}`} className="w-[5px] h-5 rounded-[30px]" style={{ background: '#8153DF' }}></div>
                                ))}
                            </div>
                            <div className="flex flex-col ">
                                <div className="text-[#5E6C84] text-[10px] leading-none text-end"> Female </div>
                                <div className="text-[#8153DF] text-sm font-bold leading-none text-end"> {genderDistributionData.genderData.femalePercentage}% </div>
                            </div>
                        </div>
                        {mode !== 'public' && (
                            <div className="p-2 flex justify-between items-center border rounded-[10px]">
                                <div className="flex flex-col text-[10px]">
                                    <div className="font-semibold">Uploaded on</div>
                                    <div className="font-medium">{formatDate(genderDistributionData?.uploadedAt)}</div>
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
                            <p className="text-sm font-medium text-gray-700 mb-1">No Gender Distribution Data</p>
                            <p className="text-xs text-gray-500 mb-2">Upload your gender distribution screenshot from your instagram professional dashboard</p>
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
                                                <span>Upload Gender Data</span>
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
                    title={'Gender Distribution?'}
                    step1={Step1 as any}
                    step2={Step2 as any}
                    step3={GenderStep3 as any}
                    isOpen={openHowToUpload}
                    onClose={() => setOpenHowToUpload(false)}
                />
            )}
        </div>
    )
}

export default GenderDistribution