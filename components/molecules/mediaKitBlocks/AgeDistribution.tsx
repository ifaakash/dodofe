import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import AgeDistributionIcon from "../../../public/assets/AgeDistImg.svg"
import DragIcon from '../../../public/icons/drag.svg'
import MediaKitAgeChart from "@components/atoms/Charts/MediaKitAgeChart"
import { useState } from "react"
import { updateMediaKit } from "api/services"
import { Loader2 } from "lucide-react"

const AgeDistribution = ({ ageDistributionData, instaId, setUpdateMediaKit, mode = 'edit' }: { ageDistributionData: any, instaId: string, setUpdateMediaKit?: (updateMediaKit: boolean) => void, mode: 'edit' | 'public' | 'preview' }) => {

    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)


    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleUploadImage called', e.target.files)
        setIsUploading(true)
        const file = e.target.files?.[0]
        if (file) {
            setUploadedImage(URL.createObjectURL(file))
        }
        setIsUploading(false)

      // backend call here
    }

    const handleToggle = async () => {
        console.log('handleToggle called', { currentState: ageDistributionData?.isActive, newState: !ageDistributionData?.isActive })
        setUpdateMediaKit(true)
        const response = await updateMediaKit({
            instaId: instaId,
            updates: {
                ageAnalytics: {
                    isActive: !ageDistributionData?.isActive,   
                }
            }
        })
        console.log('response', response)
    }

    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1 ${ageDistributionData?.isActive ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`flex justify-between items-center ${mode === 'public' ? 'hidden' : ''}`}>
                <Image className={`w-5 h-5 ${ageDistributionData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`} src={DragIcon} alt="Drag" />
                <div className="pointer-events-auto">
                    <Toggle checked={ageDistributionData?.isActive} onCheckedChange={handleToggle} />
                </div>
            </div>

            <div className={`flex flex-col gap-1 ${ageDistributionData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                    <div className="text-[#FF4794] w-full px-2 py-1 flex gap-1">
                        <div className="text-xs font-semibold"> Age </div>
                        <div className="text-[10px]"> DISTRIBUTION </div>
                    </div>
                    <Image src={AgeDistributionIcon} alt="Gender Distribution" />
                </div>

                {
                    ageDistributionData?.ageData && <MediaKitAgeChart ageDistributionData={ageDistributionData.ageData} />
                }

                <div className="p-2 flex justify-between items-center border rounded-[10px]">
                    <div className="flex flex-col gap-0.5 text-[10px]">
                        <div className="font-semibold">Upload Age Distribution</div>
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
                                            {ageDistributionData?.ageData ? 'Re-upload' : 'Upload'}
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

export default AgeDistribution