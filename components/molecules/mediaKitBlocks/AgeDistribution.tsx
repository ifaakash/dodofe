import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import AgeDistributionIcon from "../../../public/assets/AgeDistImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import MediaKitAgeChart from "@components/atoms/Charts/MediaKitAgeChart"
import { useEffect, useState } from "react"
import { addMediaKitAnalytics, updateMediaKit } from "api/services"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import HowToUpload from "../mediakit/HowToUpload"
import Step1 from 'public/images/ExportStep1.png'
import Step2 from 'public/images/ExportStep2.png'
import AgeStep3 from 'public/images/AgeStep3.png'
import { useRouter } from "next/navigation"

const AgeDistribution = ({ ageDistributionData, instaId, setUpdateMediaKit, mode = 'edit' }: { ageDistributionData: any, instaId: string, setUpdateMediaKit?: (updateMediaKit: boolean) => void, mode: 'edit' | 'public' | 'preview' }) => {

    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [ageDistData, setAgeDistData] = useState<any>(ageDistributionData || null)
    const [error, setError] = useState<string | null>(null)
    const [openHowToUpload, setOpenHowToUpload] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (ageDistributionData) {
            setAgeDistData(ageDistributionData)
        }
    }, [ageDistributionData])


    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true)
        const file = e.target.files?.[0]
        if (file) {
            setUploadedImage(URL.createObjectURL(file))

            try {
                const formData = new FormData()
                formData.append('screenshot', file)
                formData.append('instaId', instaId || '')
                formData.append('type', 'age')

                const response = await addMediaKitAnalytics(formData)
                console.log('Upload response:', response)

                if (response.success) {
                    setAgeDistData(response.data.ageAnalytics)
                } else {
                    setError(response.responseData.error)
                }
            } catch (error) {
                console.error('Upload error:', error)
                setError(error.message)
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
                ageAnalytics: {
                    ageData: ageDistData.ageData,
                    uploadedAt: ageDistData.uploadedAt,
                    isActive: !ageDistData?.isActive,
                }
            }
        })
        if (response.success) {
            toast.success('Age Distribution updated successfully')
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


            <div className={`flex flex-col gap-1 ${ageDistData?.isActive ? '' : ''}`}>
                <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                    <Image className="ml-1" src={AgeDistributionIcon} alt="Gender Distribution" />
                    <div className="text-[#FF4794] w-full px-2 py-1 flex gap-1 text-xs">
                        <div className="font-semibold"> Age </div>
                        <div className=""> DISTRIBUTION </div>
                    </div>
                    <div className={`flex justify-end items-center ${mode === 'public' ? 'hidden' : ''}`}>
                        {/* <Image className={`w-5 h-5 ${ageDistData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`} src={DragIcon} alt="Drag" /> */}
                        <div className="pointer-events-auto">
                            <Toggle checked={ageDistData?.isActive} onCheckedChange={handleToggle} />
                        </div>
                    </div>
                </div>

                {
                    ageDistData?.ageData ? <MediaKitAgeChart ageData={ageDistData.ageData} /> : (
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 text-gray-400">
                                <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24 16V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24 32H24.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700 mb-1">No Age Distribution Data</p>
                                <p className="text-xs text-gray-500">Upload your age distribution screenshot from your instagram professional dashboard</p>
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
                        </div>
                    )
                }
                {/* <div className={`p-2 flex justify-between items-center border rounded-[10px] ${mode === 'public' ? 'hidden' : ''}`}>
                    {
                        ageDistData?.ageData ? (
                            <div className="flex flex-col text-[10px]">
                                <div className="font-semibold">Uploaded on</div>
                                <div className="font-medium">{formatDate(ageDistData?.uploadedAt)}</div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-0.5 text-[10px]">
                                <div className="font-semibold">Upload Age Distribution</div>
                                <div className="font-medium text-[#8B39FF] underline" onClick={() => setOpenHowToUpload(true)}>How to upload?</div>
                            </div>
                        )
                    }


                    <label className={`border-[1px] border-[#EAE9EC] flex gap-0.5 px-[10px] py-1 rounded-full cursor-pointer`}>
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
                                            {ageDistData?.ageData ? 'Re-upload' : 'Upload'}
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
            </div>

            {/* {
                error && (
                    <div className="text-[10px] text-[#FF0000] bg-[#ffcece] p-2 mt-1 rounded-lg font-medium">
                        {error}
                    </div>
                )
            }

            {
                openHowToUpload && (
                    <HowToUpload title={'Age Range?'} step1={Step1 as any} step2={Step2 as any} step3={AgeStep3 as any} isOpen={openHowToUpload} onClose={() => setOpenHowToUpload(false)} />
                )
            } */}
        </div>
    )
}

export default AgeDistribution

const emptyStateStyles = `
.shimmer-container {
    position: relative;
    overflow: hidden;
}

.shimmer-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    animation: shimmerButton 4s infinite ease-in-out;
    transform: skewX(-15deg);
}

@keyframes shimmerButton {
    0% {
        left: -100%;
    }
    100% {
        left: 200%;
    }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = emptyStateStyles;
    document.head.appendChild(style);
}