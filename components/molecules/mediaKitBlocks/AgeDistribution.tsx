import Toggle from "@components/atoms/Toggle/Toggle"
import UploadIcon from "../../../public/icons/upload2.svg"
import Image from "next/image"
import AgeDistributionIcon from "../../../public/assets/AgeDistImg.svg"
import DragIcon from '../../../public/icons/drag.svg'


const AgeDistribution = ({ setBlocksToShow, blocksToShow }: { setBlocksToShow: (blocksToShow: any) => void, blocksToShow: any }) => {
    const isDisabled = !blocksToShow || !blocksToShow.ageDistribution;
    
    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1 ${isDisabled ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-center">
                <Image className={`w-5 h-5 ${isDisabled ? 'pointer-events-none' : ''}`} src={DragIcon} alt="Drag" />
                <div>
                    <Toggle checked={blocksToShow?.ageDistribution} onCheckedChange={() => setBlocksToShow({
                        ...blocksToShow,
                        ageDistribution: !blocksToShow?.ageDistribution
                    })} />
                </div>
            </div>

            <div className={`flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg ${isDisabled ? 'pointer-events-none' : ''}`}>
                <div className="text-[#FF4794] w-full px-2 py-1 flex gap-1">
                    <div className="text-xs font-semibold"> Age </div>
                    <div className="text-[10px]"> DISTRIBUTION </div>
                </div>
                <Image src={AgeDistributionIcon} alt="Gender Distribution" />
            </div>

            <div className={`p-2 flex justify-between items-center border rounded-[10px] ${isDisabled ? 'pointer-events-none' : ''}`}>
                <div className="flex flex-col gap-0.5 text-[10px]">
                    <div className="font-semibold">Upload Age Distribution</div>
                    <div className="font-medium text-[#8B39FF] underline">How to upload?</div>
                </div>
                <div className="border-[1px] border-[#EAE9EC] flex gap-0.5 px-[10px] py-1 rounded-full">
                    <div className="text-[10px] font-medium">Upload</div>
                    <Image src={UploadIcon} alt="Upload" />
                </div>
            </div>
        </div>
    )
}

export default AgeDistribution